const d = require("./items.json");
const fs = require("fs");

// only used once
// 1. convert convert prices to double values
// nvm talked to TC and said to parse it as it goes

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
