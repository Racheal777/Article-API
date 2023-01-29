import { User } from '../Models/users'


export class userService {

    //create a post
    async createUser(data: any) {
        try {
            const newUser = await User.create(data)
            return newUser

        } catch (error) {
            console.log(error)
        }
    }

    //get all posts
    async login(email:string) {
        try {
            const user = await User.findOne({ email });
            return user

        } catch (error) {
            console.log(error)
        }

    }

    
    
}


export const userServices = new userService()