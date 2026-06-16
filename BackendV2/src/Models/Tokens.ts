import mongoose, { Types } from "mongoose";
import { Document,Schema } from "mongoose";


export interface TypeToken extends Document {
    token:string,
    user:Types.ObjectId,
    creado: Date
    
}

const TokensData : Schema = new Schema ({
    token:{
        type:String,
        required:true
    },
    user:{
        type: Types.ObjectId,
        ref:'user'
    },
    expiresAt: {
        type:Date,
        required: true,
        default: Date.now,
        expires:'10m'
    }
})

const Token = mongoose.model<TypeToken>('token',TokensData)
export default Token

