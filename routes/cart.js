var express = require('express');
var router = express.Router();

var query_all = "SELECT * FROM products";

router.get('/', function(req, res, next) {
    // res.send(req.session.cart_items);
    getCart(req, res)
});

function getCart(req, res){
    db.query(query_all, function (err, result, fields) {
        var ids = req.session.cart_items;
        var items = [];
        for (var i = 0; i < result.length; i++){
            var item = result[i];
            if (ids.includes(item.id)){
                items.push(item);
            }
        }
        var total = 0;
        for (var i = 0; i < items.length; i++){
            total += items[i].price;
        }
        res.send({
            "cart_items": items,
            "total": total
        });
    });
}

module.exports = router;
