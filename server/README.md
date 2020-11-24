# Backend

# Endpoints documentation

---

## data info

|               | Product        |                                                   |
| ------------- | -------------- | ------------------------------------------------- |
| key           | type           | value example                                     |
|               |                |                                                   |
| name          | String         | `"GB12166 Fitness Watch with Heart Rate Monitor"` |
| price         | Float          | `49.99`                                           |
| body_location | String         | `"Wrist"`                                         |
| category      | String         | `"Fitness"`                                       |
| id            | Integer        | `6543`                                            |
| imageSrc      | String(base64) | too long to display                               |
| numInStock    | Integer        | `9`                                               |
| companyId     | Integer        | `19962`                                           |
| companyName   | String         | `"Barska"`                                        |
| company       | Object         | `{COMPANY OBJECT}` (see below)                    |
|               |                |                                                   |

|         | company |                            |
| ------- | ------- | -------------------------- |
| key     | type    | value example              |
|         |         |                            |
| name    | String  | `"Barska"`                 |
| url     | String  | `"http://www.barska.com/"` |
| country | String  | `"United States"`          |
| id      | Integer | `19962`                    |

## Renaming

- The products are renamed by removing the company name.

  - If there is no name found then won't touch it.

- Also removed any `"-"` or `" "` at the beginning, even if it's sequencial
  - the ones not included at the beginning won't be influenced.
- Special cases may occur and this isn't always effective.
  - e.g. when the company name is in the middle, the name will be removed, which may not be desired.
  - e.g. `"smart health"` is not the same as `'smartHealth'` therefore if encountered `"smart health"` won't be removed.

## orders.json

- Local file which saves the order information (considering add "pending"/"success" states)
- An object with order id as key, and order details as value.
- Also added a timestamp in miliseconds

---

## endpoints info

- GET `/product/by-product/:productId`

  - Get specific product information
  - On success: `{ status:200, product: { PRODUCT INFO, company: { a company object } } `
  - On failure: `{status: HTTPCODE, error:"ERROR MESSAGE"}`
    - `400` : productId is not integer
    - `404`: product is not found

- GET `/product/by-company/:companyId`

  - Get products of a specific company, indicated by id
  - On success: `{ status:200, products:[List of product objects], company: { a company object } }`
  - On failure: `{status: HTTPCODE, error:"ERROR MESSAGE"}`
    - `400`: companyId is not integer
    - `404`: comapny is not found in our database

- GET `/product/by-bodyLocation/:bodyLocation`

  - Get products for Body Location X
  - On success: `{ status:200, products:[ List of Product Object with a nested company:{ company object } ] }`
  - On failure: `{status: HTTPCODE, error:"ERROR MESSAGE"}`
    - `404`: The body part is not in our system

- GET `/product/by-category/:category`

  - Get products in category X
  - On success: `{ status: 200, products:[ List of Product Object each with a nested 'company:{ company object }' ] }`
  - On failure: `{status: HTTPCODE, error:"ERROR MESSAGE"}`
    - `404`: The category is not in our system

- GET `/product/random/:num`

  - Get array of X amount of random products
  - body requirement
    - `:num` is an integer of the data you want to retrieve.
    - e.g. with `/product/random/34` will return 34 random products
  - On success: `{ status: 200, products:[ List of Product Object each with a nested 'company:{ company object }' ] }`
  - On failure:`{status: HTTPCODE, error:"ERROR MESSAGE"}`
    - `400`: The number is not integer/is null/not provided:

- GET `/company/all`

  - Get list of all companies
  - On success: `{ status: 200, companies: [array of companies] }`

- GET `/company/:companyId`

  - Get a specific company by id
  - On success : `{ status: 200, company: { company object } }`
  - On failure : `{status: HTTPCODE, error:"ERROR MESSAGE"}`
    - `400`: Not integer
    - `404`: Not in the database

- GET `/product/search`

  - return products by serach key words
  - on-going
  - On success
  - On failure

- PATCH `/product`

  - update the product quantities when customers put orders
  - body requirement:

    - cart: An object of purchased items with item ids as keys
    - Example:
      ```javascript
          body: {
            cart: {
              "5555": {
                id: 5555,
                quantity: 2
              },
              "5556": {
                id: 5556,
                quantity: 2
              },
            }
          }
      ```

  - On success: `{ status: 200, message:"MESSAGE" }`
  - On failure: `{status: HTTPCODE, error:"ERROR MESSAGE"}`
    - _In all faiure cases, the number of any product in the order will not be decremented from the database._
    - `400`: nothing in the cart
    - `404`: product id not found
    - `409`: stock < quantity

- PUT `/order`

  - Add order to our order.json file
  - body requirement:
    - formData
    - cart
    - subtotal
  - Example:
    - ```javascript
      body: {
        "formData": {
          "givenName":"GIVENNAME",
          "lastName":"LASTNAME",
          "email":"AAA@AAA.com",
          "address":"kkk avenue kkk",
          "province":"QC",
          "country":"Canada",
          "postalCode":"H3H 4K9"
        },
        "cart": {
          "5555": {
            "id": 5555,
            "quantity": 2
          },
          "5556": {
            "id": 5556,
            "quantity": 2
          }
        },
        "subtotal":555
        }
      ```
  - On success : `{ status: 200, orderId: orderId, formData: { ORIGINAL FORM DATA } }`
    - A unique order id will be generated and sent back to the frontend

- PUT `/product`
  - on-going
  - On success
  - On failure
