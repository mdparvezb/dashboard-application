const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    purchase_date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    purchase_price: {
      type: Number,
      required: true,
    },
    payment_mode: {
      type: String,
      required: true,
    },
    business_type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    sold_payment_mode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const productsModel =
  mongoose.models.products || mongoose.model("products", productSchema);

export default productsModel;
