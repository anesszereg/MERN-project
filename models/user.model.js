const mongoose = require('mongoose')
const {isEmail} =require('validator')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema( 
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
        following:{
            type:[String],
        } ,
        likes:{
            type:[String],
        } , 



    },
    {
        timestamps:true,
    }
)
 

// play function before save into database

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.Password = await bcrypt.hash(this.Password,salt)
    next()
})


//Login function

userSchema.statics.login = async function(Email,Password){
    const user = await this.findOne({Email})
    if(user){ 
        const auth = await bcrypt.compare(Password,user.Password)
        if (auth){
            return user
        }
        throw  Error('Invalid Password')

    }
    throw Error('Invalid Email')
}


const UserModel = mongoose.model("User",userSchema)
module.exports = UserModel