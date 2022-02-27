import { Schema, model, Model } from 'mongoose';
import { IPost } from '../interfaces/post.interface';

// Define Blog Post Schema
const PostSchema = new Schema<IPost>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        //the slug will be a unique identifier
        type: String,
        required: true,
        unique: true,
    },
    cover_img: String,
    author_username: {
        type: String,
        required: true,
    },
    author_name: String,
    body: {
        type: String,
        required: true,
    },
    tags: Array,
    is_published: {
        type: Boolean,
        default: false,
    },
    is_pinned: {
        type: Boolean,
        default: false,
    },
    is_comment_disabled: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: Date,
    comments: [
        {
            commentID: mongoose.ObjectId,
            comment_author: String,
            comment_body: String,
            isAdmin: {
                type: Boolean,
                default: false,
            },
            isPostAuthor: {
                type: Boolean,
                default: false,
            },
            date: {
                type: Date,
                default: Date.now,
            },
            replies: [
                {
                    replyID: mongoose.ObjectId,
                    reply_author: String,
                    reply_body: String,
                    isAdmin: {
                        type: Boolean,
                        default: false,
                    },
                    isPostAuthor: {
                        type: Boolean,
                        default: false,
                    },
                    date: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
        },
    ],
    claps: {
        type: Number,
        default: 0,
    },
    keywords: [String],
    description: String,
});

//create Post model
const Post: Model<IPost> = model('blogpost', PostSchema);

//export the model
export default Post;
