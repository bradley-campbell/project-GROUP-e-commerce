"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = 4000;
const dataItems = require("./data/items.json");
const dataCompanies = require("./data/companies.json");
const dataOrders = require("./data/orders.json");

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

  // REST endpoints?
  //.get("/bacon", (req, res) => res.status(200).json("🥓"))

  .get("/product/by-product/:productId", (req, res) => {
    // Get info for ProductDetails page
    // parse id to integer
    const id = parseInt(req.params.productId, 10);
    // check validity of id (if NaN then it's not integer)
    if (!isNaN(id)) {
      const p = dataItems.find((ele) => ele._id === id);
      // check if it's found
      if (p) {
        // if found, find the company info
        const new_p = convertProduct(p);
        //send back with 200 and product
        res.status(200).json({ status: 200, product: new_p });
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
      //console.log(comIds);
      if (comIds.includes(cId)) {
        // get the reduced list of demanded item
        const cList = dataItems.reduce((acc, cur) => {
          const c_cur = { ...cur };
          if (cur.companyId === cId) {
            acc.push(convertProduct(c_cur));
          }
          return acc;
        }, []);
        const c = convertCompany(getCompById(cId));

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
          acc.push(convertProduct(cur));
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
    //console.log(cats);
    // reduce the list to demanded item
    if (allCategories.includes(catId.toLowerCase())) {
      const catList = dataItems.reduce((acc, cur) => {
        if (cur.category.toLowerCase() === catId.toLowerCase()) {
          acc.push(convertProduct(cur));
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
      const arr = [];
      for (let k = 0; k < n; k++) {
        // get list of random products
        arr.push(
          convertProduct(
            dataItems[Math.floor(Math.random() * dataItems.length)]
          )
        );
      }
      res.status(200).json({ status: 200, products: arr });
    }
  })

  .get("/product/search", (req, res) => {
    //=> will complete leter
    // Get products containing search term in title
    // the search keywords:
    // e.g. word1=winter&word2=summer
    // input cleaning may needed
    res.status(200).json("🥓");
  })

  .get("/company/all", (req, res) => {
    // Get list of all companies
    // convert _id to id
    const cs = convertCompanies(dataCompanies);
    res.status(200).json({ status: 200, companies: cs });
  })

  .get("/company/:companyId", (req, res) => {
    // Get individual company by id
    const cId = parseInt(req.params.companyId);
    const cIds = getCompanyIds();
    if (!isNaN(cId)) {
      if (cIds.includes(cId)) {
        const c = convertCompany(
          dataCompanies.find((ele) => {
            return ele._id === cId;
          })
        );
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

  .patch("/product", (req, res) => {})

  .put("/order/:orderId", (req, res) => {
    res.status(200).json("🥓");
  })
  .put("/product", (req, res) => {
    res.status(200).json("🥓");
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

// ========================= functions =========================

// function to convert one product
//    1. convert _id to id
//    2. convert price to double
//    3. remove companyName in name if first word is company name, and add companyName as a key
//    4. add company as a key
const convertProduct = (item) => {
  const new_item = addCompanyById(editNaming(convertItem(item))); // convertItem will take care of both id and price
  return new_item;
};
// function to convert a list of product
const convertProducts = (items) => {
  const new_items = [];
  let ele;
  for (ele of items) {
    new_items.push(convertProduct(ele));
  }
  return new_items;
};
// function to convert company
//    1. convert _id to id
const convertCompany = (company) => {
  return convertId(company);
};
const convertCompanies = (companies) => {
  const new_companies = [];
  let ele;
  for (ele of companies) {
    new_companies.push(convertCompany(ele));
  }
  return new_companies;
};

/// function to add companyName as key in object
//  And remove it from the name of product if the first word is companyName
const editNaming = (item) => {
  // get the company info
  const copy = { ...item };
  const i_name = item.name;
  const c_name = getCompById(item.companyId).name;
  const c_name_index = getIndexOf(i_name, c_name);
  // check if found any
  if (c_name_index >= 0) {
    // get the first word
    // check if the return value equals original string or not
    // if it is then the first word is not company name, don't touch it

    if (c_name_index + 1 < i_name.length) {
      // check if exceeds boundary
      copy["name"] = i_name.substr(c_name_index + c_name.length + 1);
      // check if the first letter is " " or " - "
      // Not sure if it covers all cases, can add if found other consistencies
      while (copy["name"][0] === " " || copy["name"][0] === "-") {
        copy["name"] = copy["name"].substr(1);
      }
    }
  }
  // append companyName as a key
  copy["companyName"] = c_name;
  return copy;
};
// function to get the first word in a string
const getIndexOf = (inputStr, target) => {
  const i = inputStr.indexOf(target);
  return i;
};
// function to add company name to a single product
const addCompanyById = (item) => {
  const new_item = { ...item };
  new_item["company"] = convertCompany(getCompById(new_item.companyId));
  return new_item;
};
// function to return a company given an id
const getCompById = (id) => {
  // id is an integer
  const c = dataCompanies.find((ele) => {
    return ele._id === id;
  });
  return { ...c };
};
// function to get all company ids
const getCompanyIds = () => {
  // return a list of company ids
  const cL = dataCompanies.reduce((acc, cur) => {
    //console.log(cur);
    acc.push(cur._id);
    return acc;
  }, []);
  return cL;
};
// convert the single product : id and price
function convertItem(item) {
  // return a new object
  const it = convertId(item);
  const pri = convertPrice(item.price);
  return { ...it, price: pri };
}
function convertId(item) {
  // return a new object
  const item_new = { ...item };
  const n_id = item._id;
  delete item_new["_id"];
  return { ...item_new, id: n_id };
}
function convertPrice(input) {
  // fixed format: $33.33
  const str_sub = input.substring(1);
  if (isNaN(parseFloat(str_sub))) {
    console.log(input);
  }
  return parseFloat(str_sub);
}
