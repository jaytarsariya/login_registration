const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const userschema = new mongoose.Schema({
  uname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
   
  },
  phone:{
    type:Number
  },
 
  password:{
    type:String,
    required:true
    }
})

userschema.pre("save",async function(){  // pre means pehlaa 
  if(this.isModified("password")){
    this.password= await bcrypt.hash(this.password,10)
  }
    
})


module.exports= mongoose.model("user",userschema)