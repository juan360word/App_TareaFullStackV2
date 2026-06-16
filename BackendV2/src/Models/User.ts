
import mongoose from "mongoose";
import { Document,Schema } from "mongoose";


export interface TypeUser extends Document {
    email:string,
    pws:string,
    name:string,
    confirmed:boolean
}


const UserSchema : Schema = new Schema ({

    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,   
        index: true,
    },
    pws:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    confirmed:{
        type:Boolean,
        required:true,
        default:false
    }

})

const User = mongoose.model<TypeUser>('user',UserSchema)
export default User




