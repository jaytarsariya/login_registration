const express=require("express")
const bcrypt=require("bcryptjs")
const router =express.Router()
const User=require("../models/schema")//models file path

router.get("/",(req,resp)=>{
  resp.render("index")
})
router.get("/login",(req,resp)=>{
  resp.render("login")
})
router.get("/register",(req,resp)=>{
  resp.render("register")
})

router.get("/about",(req,resp)=>{
  resp.render("about")
})

// data add to compass

router.post("/adduser",async (req,resp)=>{
  try {
    const user= await User(req.body)
   await user.save()
    resp.render("register",{msg:"User register sucess"})
  } catch (error) {
    console.log(error);
  }
})

//login check bcypt...
router.post("/userlogin",async(req,resp)=>{
      const email=req.body.email;
      const pass=req.body.password;

  try {
      const userdata= await User.findOne({email:email})
        const data=  await bcrypt.compare(pass,userdata.password)
       if(data==true){
          resp.render("index")
       }
       else{
        resp.render("login",{msg:"Invalide user or password"})
       }
  } catch (error) {
     console.log(error)
  }

})

module.exports=router