# Backend

# Endpoints documentation

---

## data info

|               | Product        |                                                          |
| ------------- | -------------- | -------------------------------------------------------- |
| key           | type           | value example                                            |
|               |                |                                                          |
| name          | string         | `"Barska GB12166 Fitness Watch with Heart Rate Monitor"` |
| price         | float          | `49.99`                                                  |
| body_location | string         | `"Wrist"`                                                |
| category      | string         | `"Fitness"`                                              |
| id            | integer        | `6543`                                                   |
| imageSrc      | string(base64) | too long to display                                      |
| numInStock    | integer        | `9`                                                      |
| companyId     | integer        | `19962`                                                  |
|               |                |                                                          |

|         | company |                            |
| ------- | ------- | -------------------------- |
| key     | type    | value example              |
|         |         |                            |
| name    | string  | `"Barska"`                 |
| url     | string  | `"http://www.barska.com/"` |
| country | string  | `"United States"`          |
| id      | integer | `19962`                    |

---

## endpoints info

- GET `/product/by-product/:productId`

  - Get specific product information
  - On success:
    - `{ status:200, product:{Object of single product info} }`
  - On failure:
    - productId is not integer: `{ status:400, error:"ERROR_MESSAGE" }`
    - product is not found: `{ status:404, error:"ERROR_MESSAGE" }`

- GET `/product/by-company/:companyId`

  - Get products of a specific company, indicated by id
  - On success:
    - `{ status:200, products:[List of product objects] }`
  - On failure:

    - companyId is not integer: `{ status:400, error:"ERROR_MESSAGE" }`
    - comapny is not found in our database: `{ status:404, error:"ERROR_MESSAGE" }`

- GET `/product/by-bodyLocation/:bodyLocation`

  - Get products for Body Location X
  - On success
    - `{ status:200, products:[List of objects] }`
  - On failure
    - The body part is not in our system: `{ status:404, error:"ERROR_MESSAGE" }`

- GET `/product/by-category/:category`

  - Get products in category X
  - On success
    - `{ status:200, products:[array of objects] }`
  - On failure
    - The category is not in our system: `{ status:404, error:"ERROR_MESSAGE" }`

- GET `/product/random`

  - Get array of X amount of random products
  - body requirement
    - `{ number:INTEGER_VALUE }`
    - e.g. with `body: JSON.stringify({number:34})` will return 34 random products
  - On success
    - `{ status: 200, products: [array of objects] }`
  - On failure
    - The number is not integer/is null/not provided: `{ status:400, error"ERROR_MESSAGE" }`

- GET `/company/all`

  - Get list of all companies
  - On success
    - `{ status: 200, companies: [array of companies] }`

- GET `/product/search`

  - return products by serach key words
  - on-going
  - On success
  - On failure

- PATCH `/product`

  - return products by serach key words
  - on-going
  - On success
  - On failure

- PUT `/order/:orderId`

  - on-going
  - On success
  - On failure

- PUT `/product`
  - on-going
  - On success
  - On failure
