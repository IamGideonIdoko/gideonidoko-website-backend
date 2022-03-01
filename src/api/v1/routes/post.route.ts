import {
    getAuthorPosts,
    createPost,
    deletePost,
    updatePost,
    updatePostComments,
    getPostsComments,
    getSearchedPosts,
} from './../controllers/post.controller';
import { Router } from 'express';
import validateDto from '../middlewares/validateDto.middleware';
import { getPosts, getPost, getPostsByTag } from '../controllers/post.controller';
import { newPostAjvValidate } from '../schemas/post.schema';
import auth from '../middlewares/auth.middleware';

const postRoute = Router();

/*
@route 			GET /api/v1/posts
@description 	Get all available blog posts
@access 		Public
*/
postRoute.get('/posts', getPosts);

/*
@route 			GET /api/v1/posts/search?q=term
@description 	Search through blog posts
@access 		Public
*/
postRoute.get('/posts/search', getSearchedPosts);

/*
@route 			GET /api/v1/posts/comments
@description 	Get all available blog posts comments
@access 		Public
*/
postRoute.get('/posts/comments', getPostsComments);

/*
@route 			GET api/v1/post/:slug
@description 	Get a single blog post with given slug
@access 		Public
*/
postRoute.get('/post/:slug', getPost);

/*
@route 			GET api/v1/posts/:tag
@description 	Get a blog posts with a certain tag
@access 		Public
*/
postRoute.get('/posts/:tag', getPostsByTag);

/*
@route 			GET api/post/:author_username
@description 	Get posts by an author
@access 		Public
*/
postRoute.get('/post/:author_username', getAuthorPosts);

/*
@route 			POST api/v1/post
@description 	Create a new blog post
@access 		Private (auth needed)
*/
postRoute.post('/post', [auth, validateDto(newPostAjvValidate)], createPost);

/*
@route 			DELETE api/v1/post/:id
@description 	Delete a single blog post with given id
@access 		Private (auth needed)
*/
postRoute.delete('/post/:id', auth, deletePost);

/*
@route 			PUT api/v1/post/:id
@description 	update a single blog post with given id
@access 		Private (auth needed)
*/
postRoute.put('/post/:id', auth, updatePost);

/*
@route 			PUT api/v1/post/:id/comments
@description 	update a single blog post (just the comments) with given id
@access 		Public (any one can comment)
*/
postRoute.put('/post/:id/comments', updatePostComments);

export default postRoute;