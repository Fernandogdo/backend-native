import { Schema, model, Document, Types } from "mongoose";

// type ID = Types.ObjectId

const ProductSchema = new Schema({
    title: String,
    category: {type: Schema.Types.ObjectId, ref:'Category', required: true},
    description: String,
    price: Number,
    purchase_price: {type:String, default: 5}, 
    stock: Number,
    imagePath: String
});


ProductSchema.method('toJSON', function(){
    const { __v,  ...object} = this.toObject();
    // object.uid = _id;
    return object;
})


export default model("Product", ProductSchema)