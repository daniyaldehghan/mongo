import types from "next/types";

const { Schema, model, models } = require("mongoose");

const newSchima = new Schema({
  name: {
    type: String,
    minLength: 3,
    require,
  },
  phone: {
    type: Number,
    require,
  },
  email: {
    type: String,
    min: 10,
    max: 25,
    require,
  },
  createdAt:{
    type:Date,
    default:()=> Date.now()
  }
});
const User = models.User || model("User", newSchima);

export default User;
