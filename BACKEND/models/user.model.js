const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userSchema = new Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'First name must have 3 letters']
        },
        lastname:{
            type:String,
            minLength:[3,'Last name must have 3 letters']
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        minLength:[5,'Email must have 5 letters']
    },
    password:{
        type:String,
        required:true
    },
    socketId:{
        type:String,
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

userSchema.methods.comparePasswords = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

const User = mongoose.model("User",userSchema);

module.exports=User;