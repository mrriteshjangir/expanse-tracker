const mongoose=require('mongoose');

const SignupSchema =new mongoose.Schema(
    {
        photo:{
            type:String,
        },
        name:{
            type:String,
        },
        email:{
            type:String,
        },
        password:{
            type:String,
        },
        created_date:{
            type:Date,
            default:Date.now
        }

    },
    {
        collection:'auth',
    }
);

module.exports=Signup=mongoose.model('auth',SignupSchema);