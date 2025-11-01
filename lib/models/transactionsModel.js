const { default: mongoose } = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    business_type: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    sales_date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit_purchase_price: {
      type: Number,
      required: true,
    },
    unit_selling_price: {
      type: Number,
      required: true,
    },
    total_purchase_price: {
      type: Number,
      required: true,
    },
    total_selling_price: {
      type: Number,
      required: true,
    },
    total_profit: {
      type: Number,
      required: true,
    },
    payment_mode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const transactionModel =
  mongoose.models.transactions ||
  mongoose.model("transactions", transactionSchema);

export default transactionModel;
