import { postServices } from '../Services/post.service'
import { Request, Response } from 'express'
import { Post } from '../Models/posts'
import { User } from '../Models/users'
import {PostSchema} from '../Models/Schema'




class postController {

    //add post controller
    addpost = async (req: Request, res: Response) => {

        const data = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            published: req.body.published,
            user_id: req.params.id

        }
        const { error, value } = PostSchema.validate(req.body);
        if(error){
            res.send(error)
        }else{

            const post = await postServices.createPost(data)
            
            //fetching the user
            const fetchUser = await User.findById(req.params.id)
            // console.log("fetch", fetchUser);
    
            //pushing the posts to the user
            fetchUser?.posts.push(post)
    
            //saving the fetch user
            await fetchUser?.save()
    
            res.send({
                post,
                user: fetchUser
            }.post)
        }

        
        
    }



    //get all posts
    //limit to display only 4 articles
    //desc for descending order
    getPosts = async (req: Request, res: Response) => {

        const { page = 1, limit = 4 }: any = req.query

        const posts = await Post.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort('desc')
            .exec()

        const count = await Post.countDocuments()
        res.status(200).json({
            posts,
            totalPages: Math.ceil(count),
            currentPage: page
        }.posts)
        
    }


    //get filtred post
    //get a single post
    getFilteredPost = async (req: Request, res: Response) => {
        const published = req.query.published
        const post = await Post.find({published: published})
        
        
        res.send(post)
    }

    //get a single post
    getAPost = async (req: Request, res: Response) => {
        const id = req.params.id
        const post = await postServices.getPost(id)
        console.log('bbh', id)
        res.json({post}.post)
    }

    //users posts
    oneUserPosts = async (req:Request, res:Response) => {
        try {
          const id = req.params.id;
          const user = await User.findById(id).populate("posts");
          res.json({ user }.user);
          console.log(user);
        } catch (error) {
          console.log(error);
        }
      };

    //update post
    updatePost = async (req: Request, res: Response) => {
        const id = req.params.id
        const post = await postServices.updatePost(id, req.body)
        res.json({post}.post)
    }


    //delete a post
    deletePost = async (req: Request, res: Response) => {
        const id = req.params.id
        await postServices.deletePost(id)
        res.send('post deleted')
    }

}

export const PostController = new postController()