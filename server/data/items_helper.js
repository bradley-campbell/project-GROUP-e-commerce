const d = require("./items.json");
const fs = require("fs");

// helper file to convert prices to double values
// only used once

const new_d = JSON.stringify(
  d.map(
    (ele, ind) =>
      (d[ind] = {
        ...ele,
        price: convertPrice(ele["price"]),
      })
  )
);

try {
  fs.writeFile("./server/data/items_modified.json", new_d, () => {
    console.log("success");
  });
} catch {
  (err) => console.log("sth went wrong when writing file.");
}

function convertPrice(input) {
  // fixed format: $33.33
  str_sub = input.substring(1);
  if (isNaN(parseFloat(str_sub))) {
    console.log(input);
  }
  return parseFloat(str_sub);
}
