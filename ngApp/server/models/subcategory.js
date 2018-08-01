const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subcatSchema = new Schema({
    cat_id: String,
    subcat_name: String,
    hint: String
});

module.exports = mongoose.model('subcategory', subcatSchema, 'subcategory');
