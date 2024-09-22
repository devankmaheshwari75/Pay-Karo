// backend/db.js
const mongoose = require('mongoose');

const db  = async()=>{
    try{
        await mongoose.connect('mongodb+srv://maheshwaridevank01:LGc5xFzR4iZR8Ywh@cluster0.vl2mb.mongodb.net/paytm-clone');
        console.log("mongodb is connected");

    }
    catch(error){
        console.log(error);
    }

}

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);
const accountSchema  = new mongoose.Schema({
    userId : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true 
    },
    balance : {
        type : Number,
        required : true 
    }
})

const Account  = mongoose.model("Accounts" , accountSchema);



module.exports = {
	User , Account ,db
};