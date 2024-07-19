const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Pages is required.'],
    },
    address: {
      type: String,
      required: [true, 'Adress is required.']
    },
    phone: {
      type: Number,
      required: [true, 'Phone is required']
    },
    role: {
      type: String,
      enum: ['guest', 'customer', 'admin'],
      require: true
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const User = model('User', userSchema)

module.exports = User
