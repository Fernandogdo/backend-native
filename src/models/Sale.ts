import { Schema, model, Document } from "mongoose";

const SaleSchema = new Schema({
    title: { type:String, required: true},
    description: { type:String, required: true},
    date: { type:Date, required: true},
    month: {type:String, default: 'Enero'},
    total: {type:Number, default: 0},
    total_spends: {type:Number, default: 0},
    year: {type: Number, default: 2022},
    products: [
        { 
            title: { type:String, required: true},
            price: { type:Number, required: true},
            purchase_price: {type:Number, required: true, default: 0},
            quantity: {type: Number, required: true},
        }
    ]
    // imagePath: String
});


SaleSchema.method('toJSON', function(){
    const { __v,  ...object} = this.toObject();
    // object.uid = _id;
    return object;
})

export default model("Sale", SaleSchema)
// export default model<ISale>("Sale", SaleSchema)