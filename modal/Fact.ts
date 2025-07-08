import mongoose from "mongoose";

const {Schema} = mongoose;

const factSchema = new Schema(
    {
    img: {
      type: String,
      required: true,
    },
    fact: {
      type: String,
      required: true,
    },
    Type: {
    type: String,
    required: true,
    },
    },
  { timestamps: true }
)

export default mongoose.models.Fact || mongoose.model("Fact", factSchema);