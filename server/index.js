"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = 4000;
const dataItems = require("./data/items.json");
const dataCompanies = require("./data/companies.json");
//console.log(dataItems);

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
  .get("/bacon", (req, res) => res.status(200).json("🥓"))

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
    // check is is integer or not
    if (!isNaN(cId)) {
      // reduce the list to demanded item
      const cList = dataItems.reduce((acc, cur) => {
        //console.log(acc);
        if (cur.companyId === cId) {
          acc.push(cur);
        }
        return acc;
      }, []);
      // responde with list of items  // may add 404 with not included companies
      res.status(200).json({ status: 200, products: cList });
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
    // reduce the list to demanded item
    const bList = dataItems.reduce((acc, cur) => {
      if (cur.body_location.toLowerCase() === bId.toLowerCase()) {
        acc.push(cur);
      }
      return acc;
    }, []);
    // responde with list of items  // may add 404 with not included companies
    res.status(200).json({ status: 200, products: bList });
  })

  .get("/product/by-category/:category", (req, res) => {
    // Get products in category X
    const catId = req.params.category;
    // reduce the list to demanded item
    const catList = dataItems.reduce((acc, cur) => {
      if (cur.category.toLowerCase() === catId.toLowerCase()) {
        acc.push(cur);
      }
      return acc;
    }, []);
    res.status(200).json({ status: 200, products: catList });
  })
  .get("/product/random", (req, res) => {
    // Get array of X amount of random products
    // assumption: body contains a number
    const n = req.body.number;
    //console.log(n);
    if (n == null || n === "undefined") {
      // "=="" will check both undefined and null
      res.status(400).json({
        status: 400,
        error: `Number is of value '${n}', Please give me the number of products you want!`,
      });
      return;
    } else if (typeof n !== "number") {
      res.status(400).json({
        status: 400,
        error: `Number is of value '${n}', it is not type of number!`,
      });
      return;
    }
    const arr = [];
    for (let k = 0; k < n; k++) {
      // get list of random products
      arr.push(dataItems[Math.floor(Math.random() * dataItems.length)]);
    }
    res.status(200).json({ status: 200, products: arr });
  })

  .get(`/product/search`, (req, res) => {
    //=> will complete leter
    // Get products containing search term in title
    // the search keywords:
    // e.g. word1=winter&word2=summer
    // input cleaning may needed
  })
  .get("/company/all", (req, res) => {
    // Get list of all companies
    res.status(200).json({ status: 200, companies: dataCompanies });
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
