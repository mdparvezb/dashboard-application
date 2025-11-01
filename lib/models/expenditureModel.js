const { default: mongoose } = require("mongoose");

const expneditureSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    expense_category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expense_date: {
      type: Date,
      required: true,
    },
    payment_mode: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const expenditureModel =
  mongoose.models.expenditures ||
  mongoose.model("expenditures", expneditureSchema);

export default expenditureModel;
