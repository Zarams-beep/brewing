import mongoose from "mongoose";


const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    // id:{
    //     type:Number,
    //     required:true,
    // },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    altImage: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: [
        "Hot Coffee",
        "Iced Coffee",
        "Signature",
        "Seasonal",
        "Non-Caffeine",
        "All",
      ],
      required: true,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    special: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);


