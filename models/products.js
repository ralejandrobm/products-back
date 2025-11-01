import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    description:{
        type: String,
        require: true,
        trim: true
    },
    quantity:{
        type: Number,
        require: true,
        trim: true
    },
    image:{
        type: String,      
        trim: true,
        default: "https://drive.google.com/file/d/1v4WUelzZXWVJQ3T_x7cjJoAkUugv3vsv/view?usp=sharing"
    },


}, {timestamp: true});


const Product = mongoose.model("Product", productSchema);

export default Product;