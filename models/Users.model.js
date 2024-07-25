const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
      lowercase: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Pages is required.'],
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required.'],
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, 'Phone is required']
    },
    role: {
      type: String,
      enum: ['guest', 'customer', 'admin'],
      require: true,
      lowercase: true,
      trim: true,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const User = model('User', userSchema)

module.exports = User
