const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength: [3,'First name must be at least 3 characters long']
        },
        lastname:{
            type:String,
            minLength: [3,'Last name must be at least 3 characters long']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength: [,'Enter valid email']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength: [3,'Color must be at least 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            minLength: [3,'Plate must be at least 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            minLength: [1,'capacity must be at least 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['motorcycle','car','auto']
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePasswords = async function(password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

const Captain = mongoose.model('Captain',captainSchema);

module.exports = Captain;