const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const mongoose = require('mongoose');
const db = 'mongodb://hanguser:hang123@ds237660.mlab.com:37660/hangman';
const Category = require('../models/category');
const SubCategory = require('../models/subcategory');


mongoose.connect(db, { useNewUrlParser: true }, err => {
    if(err) {
        console.log(err);
    } else {
        console.log('Connected to Mongo Server');
    }
});

router.get('/', (req, res) => {
    res.send('From Api Route');
});

router.post('/category/add', (req, res) => {
    let catData = req.body;

    // res.send(catData);
    let newcat = new Category(catData);
    Category.collection.insert(catData, (err, cat) => {
        if (err){ 
            return console.error(err);
        } else {
          res.status(200).send(cat);
        }
    });
});

router.get('/category', (req, res) => {
    Category.find({},[], {
            sort:{
                '_id': 1
            }
        }, (err, category) => {
            if(err) {
                console.log(err);
            } else {
                res.json(category);
            }
        }
    );
});

router.post('/subcategory/add', (req, res) => {
    let subcatData = req.body;
    let subcatnew = new SubCategory(subcatData);
    SubCategory.collection.insert(subcatData, (err, newsubcat) => {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send(newsubcat);
        }
    })
});

router.get('/subcategory/:id', (req, res) => {
    let catid = req.params;
    SubCategory.countDocuments({cat_id:catid.id}).exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)
        
        // Again query all users but only fetch one offset by our random #
        SubCategory.findOne({cat_id:catid.id}).skip(random).exec(
            function (err, result) {
                if(err) {
                    console.log(err);
                } else {
                    // Tada! random user
                    res.json(result);
                }
            }
        )
    });
});

module.exports = router;