const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const productsSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Category is required.'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required.'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required.'],
        },
        price: {
            type: String,
            required: [true, 'Price is required.']
        },
        discount: {
            type: Number,
            required: [true, 'Discount is required']
        },
        stock: {
            type: String,
            require: ['Stock', true]
        },
        images: {
            type: [String],
            default: ['']
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const Products = model('Products', productsSchema)

module.exports = Products
