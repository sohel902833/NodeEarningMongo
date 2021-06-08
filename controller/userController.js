const User=require('../schema/userSchema')
const Earning=require('../schema/earningSchema')
const Settings =require('../schema/SettingSchema')
const jwt=require('jsonwebtoken')

 const signUpUser=async(req,res,next)=>{
    console.log("Signup")
    let{myRefer,refer,name,phone,email,password,deviceId}=req.body
    try{
         if(!name){
       res.json({
           message:"Name is Required"
       })
    }
    else if(!phone){
        res.json({
            message:"Phone is Required"
        })
    }

    else if(phone.length>11){
        res.json({
            message:"Invalid Phone Number"
        })  
    }

    else if(!email){
        res.json({
            message:"Email is Required"
        })
    }
   else  if(!password){
        res.json({
            message:"Password is Required"
        })
    }
    else if(!deviceId){
        res.json({
            message:"Send All The Filed"
        })
    }else if(!myRefer){
        res.json({
            message:"Send All The Filed"
        })
    }else{
        let setting=await Settings.findOne();
        
         if(refer){
          
           let referUser=await User.findOne({myRefer:refer});
           if(referUser){
                let bons=setting&&setting.length!=0?setting.refer:0
                
                let refNewCoin=parseInt(bons)+parseInt(referUser.coins);

                let uRUser={
                    coins:refNewCoin
                }
               let coin=setting&&setting.length!=0?setting.regCoin:0;
              
                let nuser={name,phone,email,password,coins:coin,deviceId,myRefer,profileImage:"none"}
                const newUser=new User(nuser)

                let user=await newUser.save();
                let updateUser=await User.updateOne({_id:referUser._id},{$set:uRUser});
               
                    res.status(200).json({
                        message:"Signup Success"
                    })
            }else{
                try{
                let setting=await Settings.findOne();
                console.log("from here"+setting)
            
               let coin=setting&&setting.length!=0?setting.regCoin:0;
            
                let nuser={name,phone,email,profileImage:"none",password,coins:coin,deviceId,myRefer}

                const newUser=new User(nuser)

                let user=await newUser.save();
                    res.status(200).json({
                        message:"Signup Success"
                    })}catch(err){
                        res.status(404).json({
                            message:"Error",
                            err
                        })
                    }
            }
        }else{
            try{
            let coin=setting&&setting.length!=0?setting.regCoin:0;
           let nuser={name,profileImage:"none",phone,email,password,coins:coin,deviceId,myRefer}


            const newUser=new User(nuser)

            let user=await newUser.save();
                res.status(200).json({
                    message:"Signup Success"
                })
            }catch(err){
                res.status(404).json({
                    message:"Error"
                })
            }
        }
    }
}catch(err){
    if(err.keyValue.email){
        res.status(404).json({
            message:"Email Already Used"
        })
    }
    if(err.keyValue.phone){
        res.status(404).json({
            message:"Phone Already Used"
        })
    }
    if(err.keyValue.deviceId){
        res.status(404).json({
            message:"This Device Already Have An Account"
        })
    }

    res.status(404).json({
        message:"Error",
        err
    })
}





}
const loginUser=async(req,res,next)=>{

    const {email,password}=req.body
    console.log(req.body)
    if(!email){
        res.json({
            message:"Email is Required"
        })
    }
    if(!password){
        res.json({
            message:"Password is Required"
        })
    }
    try{
        const databaseUser=await User.findOne({email});
       
       if(databaseUser.email===email){
           if(databaseUser.password===password){

                const token=jwt.sign({
                    name:databaseUser.name,
                    userId:databaseUser._id,
                    phone:databaseUser.phone
                },process.env.JWT_SECRET,{
                    expiresIn:"7d"
                })
         
                console.log("Match")
                res.status(200).json({
                    "access_token":token,
                    "message":"Login successful"
                })
            }else{
                res.status(402).json({
                    message:"Authentication Failed"
                })
            }
       }else{
            res.status(402).json({
                message:"Authentication Failed"
            })
       }
    
    }catch(err){
        res.status(404).json({
            err
        })
    }






}
const setCoins=async(req,res,next)=>{
    
    let {coin,text,time}=req.body;

    if(!coin || !text || !time){
        res.json({
            message:"All is Required"
        })
    }

    coin=parseInt(coin);

    try{
        let user=await User.findOne({_id:req.userId});
        const newCoin=coin+user.coins;

        let result=await User.findOneAndUpdate({_id:req.userId},{$set:{coins:newCoin}},{new:true})
      
        let newEarning=new Earning({
            earningText:text,
            userId:user._id,
            previousBalance:user.coins,
            newBalance:newCoin,
            time
        })
       
       let earningHistory= await newEarning.save();
        res.status(200).json({
            message:"Coin Added Successful",
        })
        
    }catch(err){
        res.status(404).json({
            message:"error Occurred",
            err
        })
    }
}
const deleteCoin=async(req,res,next)=>{
    let {coin}=req.body;
    if(!coin){
        res.json({
            message:"Coin is Required"
        })
    }

    coin=parseInt(coin);

    try{
        let user=await User.findOne({_id:req.userId});
        let result=await User.findOneAndUpdate({_id:req.userId},{$set:{coins:user.coins-coin}},{new:true})
        res.status(200).json({
            message:"Coin Remove Successful",
            result
        })
    }catch(err){
        res.status(404).json({
            message:"error Occurred",
            err
        })
    }
}
const getUsers=async(req,res,next)=>{
   
   try{
        let users=await User.find({},{password:0});
        res.status(200).json({
            users
        })
   }catch(err){
       res.status(400).json({
           message:"Error"
       })
   }
   
}
const getSingleUser=async(req,res,next)=>{

   try{
        let users=await User.find({_id:req.userId},{password:0});
        res.status(200).json({
            users
        })
   }catch(err){
       res.status(400).json({
           message:"Error"
       })
   }
   
}
const getSingleUser2=async(req,res,next)=>{
   try{
        let users=await User.findOne({_id:req.params.userId},{password:0});
        res.status(200).json({
            users
        })
   }catch(err){
       res.status(400).json({
           message:"Error"
       })
   }
   
}
const updateUserProfile=async(req,res,next)=>{
   try{
    let uUser=User.findOneAndUpdate({_id:req.userId},{$set:{profileImage:req.body.profileImage}})
    res.status(200).json({
        message:"Profile Image Updated Successful"
    })
    }catch(err){
        res.status(400).json({
            message:"Error"
        })
    }
}

const updateUserCoinFromAdmin=async(req,res,next)=>{
    let userId=req.params.userId;
    try{
    let {coins}=req.body
    let update={
       coins
    }
    let uUser=await User.findOneAndUpdate({_id:userId},{$set:update})

    res.status(200).json({
        message:"Updated Success"
    })
}catch(err){
    res.status(400).json({
        message:"Error"
    })
}



}
const updateUserData=async(req,res,next)=>{
    let userId=req.userId;
    try{
    let {cap1LastPlay,cap2LastPlay,cap3LastPlay,cap4LastPlay,watchLastPlay,videoState}=req.body

    let user=await User.findOne({_id:userId})

    cap1LastPlay=cap1LastPlay?parseInt(cap1LastPlay):user.cap1LastPlay;
    cap2LastPlay=cap2LastPlay?parseInt(cap2LastPlay):user.cap2LastPlay;
    cap3LastPlay=cap3LastPlay?parseInt(cap3LastPlay):user.cap3LastPlay;
    cap4LastPlay=cap4LastPlay?parseInt(cap4LastPlay):user.cap4LastPlay;
    watchLastPlay=watchLastPlay?parseInt(watchLastPlay):user.watchLastPlay;
    videoState=videoState?parseInt(videoState):user.videoState;


    let update={
        cap1LastPlay,cap2LastPlay,cap3LastPlay,cap4LastPlay,watchLastPlay,videoState
    }
    let uUser=await User.findOneAndUpdate({_id:userId},{$set:update})

    res.status(200).json({
        message:"Updated Success"
    })
}catch(err){
    res.status(400).json({
        message:"Error"
    })
}



}



module.exports={
    loginUser,
    signUpUser,
    setCoins,
    deleteCoin,
    getUsers,
    getSingleUser,
    getSingleUser2,
    updateUserProfile,
    updateUserData,
    updateUserCoinFromAdmin
}