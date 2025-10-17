const { default: mongoose } = require("mongoose");
const {
  TurborepoAccessTraceResult,
} = require("next/dist/build/turborepo-access-trace");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;
