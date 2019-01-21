# Shopify Backend Challenge Question
This is my submission to the Shopify Backend Challenge question. 

__NOTE__: REST controllers are contained withing the `routes` folder, main application logic is located in `app.js`

## Setup and Start
Clone this repository, install MySQL and run `init.sql` This should initialize the database.
Enter the database credentials into the `app.js` file

Run `npm start` on the root directory and the server should start listening on port `3000` by default

## Usage
* To get all items available send a `GET` request to `localhost:3000/products/`
A list of products will be returned in the format: 
```json 
[
    {
        "id": 1,
        "title": "Blue T-Shirt",
        "inventory": 492,
        "price": 10.99,
        "url": "/products/1"
    },
    {
        "id": 2,
        "title": "Red T-Shirt",
        "inventory": 396,
        "price": 9.99,
        "url": "/products/2"
    },
    {
        "id": 3,
        "title": "Black blazer",
        "inventory": 6,
        "price": 49.99,
        "url": "/products/3"
    },
    {
        "id": 4,
        "title": "Pixel 2",
        "inventory": 6,
        "price": 1000,
        "url": "/products/4"
    }
]
```

* Similarity to get individual items, send a `GET` request to  `localhost:3000/products/:id/` and replace `:id` with the product's `id`

* To add an item to your shopping cart, send a `POST` request to `localhost:3000/cart/` with the following body:
```json
{ "toAdd": [1, 2, 3, 4]}
```
where items with ids 1, 2, 3, 4 are being added to the cart

* To view items in your shopping cart, send a `GET` request to `localhost:3000/cart/`
* To checkout your cart, send a `POST` request to `localhost:3000/cart/checkout/`. Your items will then be checked out if inventory is available, and your cart will be cleared

