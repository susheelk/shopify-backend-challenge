const express = require('express');
const router = express.Router();

const QUERY_ALL = "SELECT * FROM products WHERE inventory > 0";
const PURCHASE = "UPDATE products SET inventory = inventory -1 WHERE id IN ";

router.get('/', function(req, res, next) {
    // res.send(req.session.cart_items);
    getCart(req, res, function(items, total) {
        res.send({
            "cart_items": items,
            "total": total
        });
    })
});

router.post('/', function(req, res, next) {
    let toAdd = req.body.toAdd;
    if (toAdd){
        req.session.cart_items = req.session.cart_items.concat(toAdd);
        getCart(req, res, function(items, total) {
            res.send({
                "cart_items": items,
                "total": total
            });
        });
    }
});

router.post("/checkout", function (req, res, next) {
    getCart(req, res, function(items, total) {
        let ids = [];
        for (let item of items) {
            ids.push(item.id);
        }
        console.log(ids);
        let strIds = JSON.stringify(ids);
        strIds = strIds.replace("[", "(");
        strIds = strIds.replace("]", ")");
        console.log(PURCHASE + strIds);

        db.query(PURCHASE + strIds, function (err, result, fields) {
            getCart(req, res, function(items, total) {
                if (!err){
                    req.session.destroy();
                    res.send({
                        "status": "success",
                        "your_items": items,
                        "total": total
                    });
                }
            });
        });
    });
});

function getCart(req, res, next){
    db.query(QUERY_ALL, function (err, result, fields) {
        let ids = req.session.cart_items;
        let items = [];
        for (let i = 0; i < result.length; i++){
            let item = result[i];
            if (ids.includes(item.id)){
                items.push(item);
            }
        }
        let total = 0;
        for (let i = 0; i < items.length; i++){
            total += items[i].price;
        }

        next(items, total);
    });
}

module.exports = router;
