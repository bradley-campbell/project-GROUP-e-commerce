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
        // if found, send back with 200 and product
        res.status(200).json({ status: 200, product: convertItem(p) });
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
          if (cur.companyId === cId) {
            acc.push(convertItem(cur));
          }
          return acc;
        }, []);

        // responde with list of items
        res.status(200).json({ status: 200, products: cList });
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
          acc.push(convertItem(cur));
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
          acc.push(convertItem(cur));
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
          convertItem(dataItems[Math.floor(Math.random() * dataItems.length)])
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
    const cs = dataCompanies.map((ele, ind) => {
      return (dataCompanies[ind] = convertId(ele));
    });
    res.status(200).json({ status: 200, companies: cs });
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

const getCompanyIds = () => {
  // return a list of company ids
  return dataCompanies.reduce((acc, cur) => {
    acc.push(cur._id);
    return acc;
  }, []);
};

// convert array of items
function convertedItems(items) {
  return items.map(
    (ele, ind) =>
      (items[ind] = {
        ...ele,
        price: convertPrice(ele["price"]),
      })
  );
}

// convert the single item
function convertItem(item) {
  const it = convertId(item);
  return { ...it, price: convertPrice(item["price"]) };
}
function convertId(item) {
  const n_id = item._id;
  delete item._id;
  return { ...item, id: n_id };
}
function convertPrice(input) {
  // fixed format: $33.33
  const str_sub = input.substring(1);
  if (isNaN(parseFloat(str_sub))) {
    console.log(input);
  }
  return parseFloat(str_sub);
}

/*const getAllOf = (property) => {
  // return a list of required property from the items
  // without duplicates
  // considering add them to static variables
  const s = dataItems.reduce((acc, cur) => {
    if (property !== "imageSrc") {
      // want to keep the imageSrc untouched
      return acc.add(cur[property].toLowerCase());
    } else {
      return acc.add(cur[property]);
    }
  }, new Set());
  return [...s];
};*/

//console.log(getAllOf("category"));
