const { Schema, model, mongoose, Types } = require('mongoose')

const orderSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        orderDate: {
            type: Date,
            required: [true, 'orderDate is required.'],
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
        orderItems: [
            {"productId": {type: mongoose.Schema.Types.ObjectId, required: [true, 'productId is required.']},
              "quantity": {type: Number, required: [true, 'Quantity is required.']},
               "price": {type: Number, required: [true, 'Price is required.']}
            },
        ]
    },
    
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }

)

const Order = model('Order', orderSchema)

module.exports = Order
