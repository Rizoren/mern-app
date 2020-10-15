const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    complexity: {
        type: Number,
    },
    stages: [{
        num: {
            type: Number,
            unique: true,
        },
        description: {
            type: String,
        }
    }],
    ingredients: [{
        product: {
            type: Types.ObjectId,
            ref: 'Product',
        },
        value: {
            type: String,
        }
    }]
})

module.exports = model('Recipe', schema)