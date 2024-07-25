const { Schema, model } = require('mongoose')

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId, // toDo: test with Types.ObjectId, if it works
            ref: "User",
            required: [true, "userId must be provided."]
        },
        orderDate: {
            type: Date,
            required: [true, 'orderDate is required.'],
        },
        status: {
            type: String,
            required: [true, 'status is required.'],
            enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] // toDO: also add user route for oder cancelleation, rest by admin
        },
        orderItems: [
            {
                "productId": {
                    type: Schema.Types.ObjectId,
                    ref: "Products", //toDo: rename Products to Product in model export
                    required: [true, 'productId is required.']
                },
                "quantity": {
                    type: Number,
                    required: [true, 'quantity is required.'],
                    min: [1, "quantity must be at least 1"]
                },
                "price": {
                    type: Number,
                    required: [true, 'price is required.']
                }
            },
        ],
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