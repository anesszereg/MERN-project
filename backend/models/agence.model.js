const mongoose = reauire('mongoose')

const AgenceSchema = new mongoose.Schema(
    {
        pseudo:{
            type:String,
            required:true,
            maxLength:36,
            minlength:3,
            unique:true,
            trim:true

        },
        Email:{
            type:String,
            required:true,
            validate:[isEmail],
            lowercase:true,
            trim:true
            
        },
        Password:{
            type:String ,
            required:true,
            max:50,
            minlength:8,

        },
        picture:{
            type:String,
            default:"./uploads/profile/random-user.png"
        },
        bio:{
            type:String,
            max:2000
        } ,
        followers:{
            type:[String],
        },
    

        
    }
)