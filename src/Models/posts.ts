//importing modules
import { timeStamp } from 'console'
import mongoose, {Schema, model,} from 'mongoose'
import {paginate } from 'mongoose-paginate-v2'

//creating an interface creating a document in mongoDB
interface IPosts {
    title: string,
    description: string,
    author: string,
    published: boolean,
    user: any

}




//schema
const postSchema = new Schema<IPosts>({
    title: {
        type: String,
        //required: true
    },

    description: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    

    
},{timestamps: true})

//postSchema.plugin(paginate)

//creating a model
 export const Post = model<IPosts>('Post', postSchema )
