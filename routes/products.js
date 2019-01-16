var express = require('express');
var router = express.Router();


var sample_products = {
    "data": [
        {
            "id": 1,
            "title": "test",
            "description": "test",
            "inventory_count": 500,
            "price": 4.50
        },
        {
            "id": 2,
            "title": "test1",
            "description": "test2",
            "inventory_count": 100,
            "price": 8.50
        }
    ]
};

var query_all = "SELECT * FROM products";
var query_id = "SELECT * FROM products WHERE id = ";

/* GET home page. */
router.get('/', function(req, res, next) {
    db.query(query_all, function (err, result, fields) {
        if (err) {
            console.error(err.message)
        }
        var json = Object.values(JSON.parse(JSON.stringify(result)));
        for(var i = 0; i < json.length; i++){
            json[i].url = "/products/"+json[i].id;
        }

        console.log(json);
        res.send(json);
    });

});

router.get('/:id', function(req, res, next) {
    db.query(query_id + dbEscape(req.params.id), function (err, result, fields) {
        if (err) {
            console.error(err.message)
        }
        res.send(result);
    });
});



module.exports = router;
