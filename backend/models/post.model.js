const mongoose =require('mongoose')

const PostSchema =new mongoose.Schema(

    {

        posterId :
            [{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
             }]
        ,
        name:{
            type:String,
            required:true

        },
        message:{
            type:String,
            trim:true,
            maxlength:2000,
        },
        location:{
            type:String,
            required:true
        },
        picture:{
            type:[String]
            ,
            required:true,
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
        rating:{
            type:String
        },
        Category:{
            type:String
        }

    },
    {
        timestamps:true,

    }
)

module.exports = mongoose.model('Post',PostSchema)
