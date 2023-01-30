//importing modules
import express from "express";
import { PostController } from '../Controllers/post.controller'
import { userControllers } from '../Controllers/user.controller'
import { authenticate, checkDuplicateUsernameOrEmail } from '../Middlewares/auth'

//initiating the router
export const router = express.Router()

//add post route
router.post('/post/:id',authenticate, PostController.addpost)

//get posts
router.get('/post', PostController.getPosts)

//get a users post
router.get('/post/:id', PostController.oneUserPosts)

//filtered post
router.get('/posts', PostController.getFilteredPost)

//get single post
router.get('/posts/:id', PostController.getAPost)

//update a post
router.put('/postt/:id', authenticate, PostController.updatePost)

//delete a post
router.delete('/postz/:id',authenticate,  PostController.deletePost)


//user routes

//add post route
router.post('/signup', checkDuplicateUsernameOrEmail, userControllers.Signup)

//get posts
router.post('/login', userControllers.Login)

//get single post
router.get('/logout', userControllers.logout)
