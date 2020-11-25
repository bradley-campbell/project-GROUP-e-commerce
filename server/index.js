"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const natural = require("natural"); // package for natural language processing
natural.PorterStemmer.attach(); // Porter steemer is less aggressive

const { v4: uuidv4 } = require("uuid"); // to generate unique ids

const PORT = 4000;
const {
  dataItems,
  dataCompanies,
  dataOrders,
} = require("./data/data_preprocess.js");
//const dataItems = require("./data/items.json");
//const dataCompanies = require("./data/companies.json");
//const dataOrders = require("./data/orders.json");
//const fs = require("fs"); // static file-writing, allows files to be accessed after closing server

// replacing SQL
// hard-coded body locations and categories
const allBodyLocations = [
  "wrist",
  "arms",
  "head",
  "waist",
  "chest",
  "hands",
  "neck",
  "feet",
  "torso",
];
const allCategories = [
  "fitness",
  "medical",
  "lifestyle",
  "entertainment",
  "industrial",
  "pets and animals",
  "gaming",
];

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints

  .get("/product/all", (req, res) => {
    // get all products
    res.status(200).json({ status: 200, products: dataItems });
  })

  .get("/product/by-product/:productId", (req, res) => {
    // Get info for ProductDetails page
    // parse id to integer
    const id = parseInt(req.params.productId, 10);
    // check validity of id (if NaN then it's not integer)
    if (!isNaN(id)) {
      const p = dataItems.find((ele) => ele.id === id);
      // check if it's found
      if (p) {
        //send back with 200 and product
        res.status(200).json({ status: 200, product: p });
      } else {
        // if not found, send back with 404 not found
        res.status(404).json({
          status: 404,
          error: `Can't find the product with product id ${id}`,
        });
      }
    } else {
      // if not integer, send back with 400 bad request
      res
        .status(400)
        .json({ status: 400, error: "The productId should be an integer." });
    }
  })

  .get("/product/by-company/:companyId", (req, res) => {
    // Get products sold by Company X
    const cId = parseInt(req.params.companyId);
    const comIds = getCompanyIds();
    // check is is integer or not
    if (!isNaN(cId)) {
      // check if the cId is included in our databse
      if (comIds.includes(cId)) {
        // get the reduced list of demanded item
        const cList = dataItems.reduce((acc, cur) => {
          const c_cur = { ...cur };
          if (cur.companyId === cId) {
            acc.push(c_cur);
          }
          return acc;
        }, []);
        // get the company
        const c = getCompById(cId); // in case if we found nothing of the company
        // responde with list of items
        res.status(200).json({ status: 200, products: cList, company: c });
        return;
      } else {
        res.status(404).json({
          status: 404,
          error: `The company with id ${cId} doesn't exist in our database!`,
        });
        return;
      }
    } else {
      // respond with 400 bad request
      res
        .status(400)
        .json({ status: 400, error: "The companyId should be an integer." });
    }
  })

  .get("/product/by-bodyLocation/:bodyLocation", (req, res) => {
    // Get products for Body Location X
    const bId = req.params.bodyLocation;
    // const bodyParts = getAllOf("body_location");
    // reduce the list to demanded item
    if (allBodyLocations.includes(bId.toLowerCase())) {
      const bList = dataItems.reduce((acc, cur) => {
        if (cur.body_location.toLowerCase() === bId.toLowerCase()) {
          acc.push(cur);
        }
        return acc;
      }, []);
      // responde with list of items  // may add 404 with not included companies
      res.status(200).json({ status: 200, products: bList });
      return;
    } else {
      res.status(404).json({
        status: 200,
        error: `The body location '${bId}' is not in our database!`,
      });
    }
  })

  .get("/product/by-category/:category", (req, res) => {
    // Get products in category X
    const catId = req.params.category;
    //const cats = getAllOf("category");
    // reduce the list to demanded item
    if (allCategories.includes(catId.toLowerCase())) {
      const catList = dataItems.reduce((acc, cur) => {
        if (cur.category.toLowerCase() === catId.toLowerCase()) {
          acc.push(cur);
        }
        return acc;
      }, []);

      res.status(200).json({ status: 200, products: catList });
      return;
    } else {
      res.status(404).json({
        status: 200,
        error: `The category '${catId}' is not in our database!`,
      });
      return;
    }
  })
  .get("/product/random/:num", (req, res) => {
    // Get array of X amount of random products
    // assumption: body contains a number
    const n = parseInt(req.params.num);
    //console.log(n);
    if (isNaN(n)) {
      // "n==null" will check both n===null and number is not given (n===undefined)
      // "undefined" is when given {n:undefined} in front-end
      res.status(400).json({
        status: 400,
        error: `Number is of value '${req.params.num}', Please give me the number of products you want!`,
      });
      return;
    } else {
      // check if number is larger than entire data
      if (n > dataItems.length) {
        res.status(400).json({
          status: 400,
          error: `Number is of value '${n}', it's larger than the number of data we have.`,
        });
        return;
      }
      // create a list of un-repeating integers
      const ind = [];
      while (ind.length <= n) {
        const k = Math.floor(Math.random() * dataItems.length);
        if (!ind.includes(k)) {
          // if index array doesn't include k, push k
          ind.push(k);
        }
        // else go to next round
      }
      // get all the items and push to frontend
      const arr = [];
      let k;
      for (k of ind) {
        // get list of random products
        arr.push(dataItems[k]);
      }
      res.status(200).json({ status: 200, products: arr });
    }
  })

  .get("/product/search", (req, res) => {
    // Get the search results by key words
    // 1. do cleaning on search word, get an array of target words
    // 2.1 go through the item, clean the item name on-the-fly, create an arr of search words
    // 2.2 add the item category, company name, and body location to the list
    //      Some items don't have company name in their name so need to add even it it duplicates
    // 3. go through the target to see if there is any words included in the search sords

    // get the search string
    const { search } = req.query;
    // check if search field is empty or not
    if (search == undefined || search === "") {
      // note: search == undefined check for both null and undefined
      // if undefined (empty search) or null (some other error), return with all data
      res.status(200).json({
        status: 200,
        numProducts: 0,
        products: dataItems,
      });
      return;
    }

    // process the search word
    const targetWords = search.toLowerCase().tokenizeAndStem();
    // check if we have target words left
    if (targetWords.length < 0) {
      // when there is no word left in the search word after stemming
      res.status(200).json({
        status: 200,
        numProducts: 0,
        products: dataItems,
      });
      return;
    }

    // go through items
    const result = dataItems.reduce((acc, cur) => {
      const cur_p = { ...cur };
      // process name
      const cur_tokenList = cur_p.name.tokenizeAndStem();
      // add category
      cur_tokenList.push(cur_p.category.toLowerCase());
      // add company name
      cur_tokenList.push(cur_p.company.name.toLowerCase());

      // check if tokenList includes the targets
      // a checker to see if arr contains all items in tar
      //    note: will return true if tar is empty
      const checkAll = (arr, tar) => tar.every((ele) => arr.includes(ele));
      // kinda greedy to include all targets, but better to be accurate in this workshop I guess
      if (checkAll(cur_tokenList, targetWords)) {
        return [...acc, cur_p];
      } else {
        return acc;
      }
    }, []);

    // check if the result is empty. If empty, return all the products
    if (result.length === 0) {
      res.status(200).json({
        status: 200,
        numProducts: 0,
        products: dataItems,
      });
      return;
    } else {
      res
        .status(200)
        .json({ status: 200, numProducts: result.length, products: result });
      return;
    }
  })

  .get("/company/all", (req, res) => {
    // Get list of all companies
    const cs = dataCompanies;
    res.status(200).json({ status: 200, companies: cs });
  })

  .get("/company/:companyId", (req, res) => {
    // Get individual company by id
    const cId = parseInt(req.params.companyId);
    const cIds = getCompanyIds();
    if (!isNaN(cId)) {
      if (cIds.includes(cId)) {
        const c = dataCompanies.find((ele) => {
          return ele.id === cId;
        });
        res.status(200).json({ status: 200, company: c });
        return;
      } else {
        res.status(404).json({
          status: 404,
          error: `The company with id ${cId} is not in our database.`,
        });
        return;
      }
    } else {
      res.status(400).json({
        status: 400,
        error: `The company id is ${cId}, which is not an integer.`,
      });
    }
  })
  /*
    duplicated path.
  .get("/company/:companyId", (req, res) => {
    // Get list of products sold by Company X (by id)
  })*/

  .patch("/product", (req, res) => {
    /* cart: {
        5555: {
        id: 5555,
        quantity: 2
        },
        5556: {
        id: 5556,
        quantity: 2
        },
        }
    */
    // get cart and items
    const cart = req.body.cart;
    const items = Object.values(cart);
    // check if cart is empty
    if (items.length === 0) {
      res.status(400).json({
        status: 400,
        error: `There is nothing in the cart!`,
      });
      return; // terminate
    }
    const list_to_patch = []; // list of object
    //{index: index in itemsData, decreQuan: quantity to decrement}

    // (don't update the quantities yet)
    // check first if all items are in our database
    let item;
    for (item of items) {
      // findIndex return -1 if not found
      const state = dataItems.findIndex((ele) => {
        return ele.id === item.id;
      });
      // if not found
      if (state < 0) {
        res.status(404).json({
          status: 404,
          error: `The product id ${item.id} was not found in our database!`,
        });
        return; // terminate when there is an error
      } else {
        // check if the quantity required is < in stock
        const stock = dataItems[state]["numInStock"];
        if (stock < item.quantity) {
          // check if the quantity is smaller than the request
          //   this shouldn't happen given front-end is limiting the quantity but just in case
          res.status(409).json({
            status: 409,
            error: `The quantity required for the product ${dataItems[state].id}, the "${dataItems[state].name}" is larger than the quantity of stock!`,
          });
          return; // terminate if anything goes wrong
        } else {
          // safely push the index and the quantity to decrement
          list_to_patch.push({ index: state, decreQuan: item.quantity }); // save the index for later usage
        }
      }
    }
    // go through the list to reduce the quantity as it's safely passed after all checks
    let cur;
    for (cur of list_to_patch) {
      dataItems[cur.index]["numInStock"] -= cur.decreQuan;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully updated the stocks for ${list_to_patch.length} product/products.`,
    });
    return;
  })

  .put("/order", (req, res) => {
    // with:
    // 1. order id
    // 2. date
    // 3. formData and cart info
    if (Object.values(req.body.cart).length === 0) {
      res.status(400).json({
        status: 400,
        formData: { ...req.body.formData },
        error: `There is nothing in the cart!`,
      });
      return; // terminate
    }

    const orderId = uuidv4(); // generate a unique id
    // write to the orders.json file
    addOrder("./data/orders.json", orderId, {
      orderId: orderId,
      formData: { ...req.body.formData },
      cart: { ...req.body.cart },
      subtotal: req.body.subtotal,
    });
    // successful fordata
    res.status(200).json({
      status: 200,
      orderId: orderId,
      formData: { ...req.body.formData },
    });
    return;
  })

  .put("/product", (req, res) => {
    res.status(200).json("🥓");
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

// ========================= functions =========================
// function to read json file, return the data
const readJsonFile = (path) => {
  const fs = require("fs");
  const rawData = fs.readFileSync(path);
  return JSON.parse(rawData);
};

// function to write json file, accept thing to write
const addOrder = (path, id, order) => {
  const fs = require("fs");
  const original = readJsonFile(path); // an object
  // adding to original data
  original[id] = { ...order, timestamp: +new Date() };
  // adding timestamp by miliseconds
  const tstamp = new Date().getTime();
  original[id]["timestamp"] = tstamp;
  // convert to json data
  const new_data = JSON.stringify(original);
  // write
  fs.writeFile(path, new_data, (err) => {
    if (err) console.log("Error writing file:", err);
  });
  return 1;
};
// function to remove an order from the json file
const removeOrder = (path, id) => {};

// function to get all company ids
const getCompanyIds = () => {
  // return a list of company ids
  const cL = dataCompanies.reduce((acc, cur) => {
    acc.push(cur.id);
    return acc;
  }, []);
  return cL;
};
// function to return a company given an id
const getCompById = (id) => {
  // id is an integer
  const c = dataCompanies.find((ele) => {
    return ele.id === id;
  });
  return { ...c };
};
