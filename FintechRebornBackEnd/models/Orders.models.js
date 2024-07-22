const { Schema, model } = require('mongoose')

const orderSchema = new Schema(
    {
        orderId: {
            type: Number,
            required: [true, 'orderId is required.'],
            trim: true,
        },
        orderDate: {
            type: Date,
            required: [true, 'orderDate is required.'],
            trim: true,
        },
        status: {
            type: String,
            required: [true, 'Status is required.'],
            enum: ['Pending', 'Shipped', 'Delivered']
        },
        totalAmount: {
            type: Number,
            required: [true, 'totalAmount is required']
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const Order = model('Order', orderSchema)

module.exports = Order
