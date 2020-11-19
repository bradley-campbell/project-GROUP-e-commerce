"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const PORT = 4000;

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

  .get("/product/:productId", (req, res) => {

    // Get info for ProductDetails page


  })
  .get("/product/:companyId", (req, res) => {
    
    // Get products sold by Company X

  })
  .get("/product/:bodyLocation", (req, res) => {
   
    // Get products for Body Location X

  })
  .get("/product/:category", (req, res) => {
    

    // Get products in category X

  })
  .get("/product/random", (req, res) => {
    
    // Get array of X amount of random products

  })
  .get(`/product/search/${query}`, (req, res) => {
    
    // Get products containing search term in title

  })
  .get("/company/all", (req, res) => {
    
    // Get list of all companies

  })
  .get("/company/:companyId", (req, res) => {
    
    // Get list of products sold by Company X (by id)

  })
  .patch("/product", (req, res) => {
    
  

  })
  .put("/order/:orderId", (req, res) => {
    res.status(200).json("🥓");
  })
  .put("/product", (req, res) => {
    res.status(200).json("🥓");
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
