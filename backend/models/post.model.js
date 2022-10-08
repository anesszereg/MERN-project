const mongoose =require('mongoose')

const PostSchema =new mongoose.Schema(

    {

        // posterId :{
        //     type:String,
        //     required:true
        // },
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
            type:[String],
            required:true
        },
        picture:{
            type:[
                {
                    image1:String,
                },{

                    image2:String,
                },{

                    image3:String
                }
            ]
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

    },
    {
        timestamps:true,

    }
)

module.exports = mongoose.model('Post',PostSchema)
