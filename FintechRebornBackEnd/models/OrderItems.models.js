const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const orderItemSchema = new Schema(
    {
        orderId: {
            type: String,
            required: [true, 'orderId is required.'],
            trim: true,
        },
        productId: {
            type: String,
            required: [true, 'productId is required.'],
            trim: true,
        },
        quantity: {
            type: String,
            required: [true, 'Quantity is required.'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required.']
        },

    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const OrderItem = model('OrderItem', orderItemSchema)

module.exports = OrderItem
