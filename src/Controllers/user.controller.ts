import { Request, Response } from 'express'

import { userServices } from '../Services/user.service'
import { generateToken } from '../Middlewares/auth'
import {UserSchema } from '../Models/Schema'
import { compare,hash } from 'bcrypt'




class UserController {


  Signup = async (req: Request, res: Response) => {
    try {
      const { error, value } = UserSchema.validate(req.body);
        if(error){
            res.send(error)
        }else{
          const { username, password, email } = req.body;
          const data = {
            username,
            email,
            password: await hash(password, 10),

          }
    
          const user = await userServices.createUser(data)
          res.status(201).json({ user });
    
        }
        } catch (error) {
          console.log(error)
        }
    
        }
      
  
    



  //login
  Login = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      //check to see if email matches with any email in the database
      const user = await userServices.login(email)
      console.log(user)

      //compare password if email is found
      if (user) {

        const comparePassword = await compare(password, user.password);
        console.log(comparePassword);

        //if password matches generate token and set cookie
        if (comparePassword) {

          const token = generateToken(user._id);
          const cookies = res.cookie("jwt", token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });

          res.status(201).json({
            user,
            // 'cookies':cookies,
            'token': token
          });
          console.log(user);
        } else {
          res.status(401).json({ errors: "Authentication failed" });
        }
      }

    } catch (error) {
      console.log(error);
    }
  };


  



  //logout
  logout = async (req: Request, res: Response) => {
    try {
      res.cookie("jwt", "", {
        maxAge: -1,
      });
      res.status(200).json("successfully");
      console.log("working");
      // console.log(token)
    } catch (error) {
      console.log(error);
    }
  };
}

export const userControllers = new UserController()