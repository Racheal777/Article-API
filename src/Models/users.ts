//requiring modules
import  {Schema, model,} from 'mongoose'



interface IUsers {
    username: string,
    email: string,
    password: string,
    posts: any
   

}
//user schema
const userSchema = new Schema<IUsers>({
    username : {
        type: String
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Please enter your email"],
        unique: true
    },

    password : {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Please password length should be at least 8"]
    },

    //relationship
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    
    
}, {timestamps: true}, )




//creating a model
export const User = model<IUsers>('User', userSchema )


