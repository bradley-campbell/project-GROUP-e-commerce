// Process data here and export for later use

// ======================================== Products ========================================
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
// function to convert a list of companies
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
  const i_name = item.name.toLowerCase();
  const c_name = getCompById(item.companyId).name.toLowerCase();
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
  // append companyName as a key, capitalize the company name for convenience
  copy["companyName"] = c_name.charAt(0).toUpperCase() + c_name.slice(1);
  return copy;
};
// function to get the starting index of a target string in another string
const getIndexOf = (inputStr, target) => {
  const i = inputStr.indexOf(target);
  return i;
};
// function to add company name to a single product
const addCompanyById = (item) => {
  const new_item = { ...item };
  new_item["company"] = getCompById(new_item.companyId);
  return new_item;
};
// ======================================== Companies ========================================
// function to return a company given an id
const getCompById = (id) => {
  // id is an integer
  const c = dataCompanies.find((ele) => {
    return ele.id === id;
  });
  return { ...c };
};
// convert the single product : id and price
const convertItem = (item) => {
  // return a new object
  const it = convertId(item);
  const pri = convertPrice(item.price);
  return { ...it, price: pri };
};
const convertId = (item) => {
  // return a new object
  const item_new = { ...item };
  const n_id = item._id;
  delete item_new["_id"];
  return { ...item_new, id: n_id };
};
const convertPrice = (input) => {
  // fixed format: $33.33
  const str_sub = input.substring(1);
  if (isNaN(parseFloat(str_sub))) {
    console.log(input);
    throw new Error("Not a float, check database!");
    return;
  }
  return parseFloat(str_sub);
};
// ======================================== Orders ========================================

// since we didn't write the itemdata in local we need to update the quantity of items when the server starts
/*const updateItemsByOrder = (items) => {
  const orders = Object.values(dataOrders);
  let o;
  for (o of orders) {
    const c = Object.values(o.cart);
    c.map((ele) => {
      const pInd = items.findIndex((eleI) => eleI.id === ele.id);
      items[pInd].numInStock -= ele.quantity;
    });
  }
  return [...items];
};*/

// module export

const dataOrders = require("./orders.json");
const dataCompanies = convertCompanies(require("./companies.json"));
const dataItems = convertProducts(require("./items.json"));

module.exports = { dataItems, dataCompanies, dataOrders };
