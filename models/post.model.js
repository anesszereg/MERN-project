const mongoose =require('mongoose')

const PostSchema =new mongoose.Schema(

    {
        posterId :{
            type:String,
            required:true
        },
        message:{
            type:String,
            trim:true,
            maxlength:2000,
        },
        picture:{
            type:String,
        },
        video:{
            type:String,
        },
        likes:{
            type:[String],
            required:true,
        },
        comments:{
            type:[
               { 
                commenterId:String,
                commenterPseudo:String,
                text:String,
                timestamp:Number
                }
            ],
            required:true,
        },

    },
    {
        timestamps:true,

    }
)

module.exports = mongoose.model('Post',PostSchema)
