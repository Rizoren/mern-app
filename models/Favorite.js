const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    product: {
        type: Types.ObjectId,
        ref: 'Product',
    },
    relationship: {
        type: Number,
        required: true,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
})

module.exports = model('Favorite', schema)