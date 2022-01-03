const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      { productId: { type: String } },

      {
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },

  { timestamps: true } // to have the CreatedAt and UpdatedAt values
);

module.exports = mongoose.model("Cart", CartSchema);
