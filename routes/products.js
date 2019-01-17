const express = require('express');
const router = express.Router();

// const sample_products = {
//     "data": [
//         {
//             "id": 1,
//             "title": "test",
//             "description": "test",
//             "inventory_count": 500,
//             "price": 4.50
//         },
//         {
//             "id": 2,
//             "title": "test1",
//             "description": "test2",
//             "inventory_count": 100,
//             "price": 8.50
//         }
//     ]
// };

const QUERY_ALL = "SELECT * FROM products WHERE inventory > 0";
const QUERY_ID = "SELECT * FROM products WHERE id = ";

/* GET home page. */
router.get('/', function(req, res, next) {
    db.query(QUERY_ALL, function (err, result, fields) {
        if (err) {
            console.error(err.message)
        }
        let json = Object.values(JSON.parse(JSON.stringify(result)));
        for(let i = 0; i < json.length; i++){
            json[i].url = "/products/"+json[i].id;
        }

        console.log(json);
        res.send(json);
    });

});

router.get('/:id', function(req, res, next) {
    db.query(QUERY_ID + dbEscape(req.params.id), function (err, result, fields) {
        if (err) {
            console.error(err.message)
        }
        res.send(result);
    });
});



module.exports = router;
