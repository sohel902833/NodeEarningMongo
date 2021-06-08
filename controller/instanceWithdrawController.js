const WithDraw =require("../schema/instanceWithdrawSchema")
const User=require('../schema/userSchema');
const Settings = require("../schema/SettingSchema");

const addNewWithDraw=async(req,res,next)=>{
    let {state,coin,time,payment,accountNo} =req.body

    try{
    coin=parseInt(coin);
    if(!coin || !time || !payment || !accountNo || !state){
        res.status(402).json({
            message:"Please Provide All The fields"
        })
    }else{

        let setting=await Settings.findOne();
        if(setting && setting.minW>coin){
            res.status(402).json({
                message:"You Haven't Enough Coin"
            }) 
        }else{
            let user=await User.findOne({_id:req.userId})
            if(user.coins<coin){
                res.status(402).json({
                    message:"You Haven't Enough Coin"
                }) 
            }else{
                let result=await User.findOneAndUpdate({_id:req.userId},{$set:{coins:parseInt(user.coins)-parseInt(coin)}})
                let withdraw={
                    userId:req.userId,
                    time,payment,coins:coin,accountNo,state
                }
                let newWithDraw=new WithDraw(withdraw)
                let result1=await newWithDraw.save()
                res.status(200).json({
                    message:"Withdraw Request Sent"
                }) 
            }
        }
    }

    }catch(err){
        res.status(400).json({
            message:err
        })
    }

}
const getWithDraw=async(req,res,next)=>{

    try{
       let withdrawRequests=await WithDraw.find();
       res.status(200).json({
           withdrawRequests
       }) 


    }catch(err){
        res.status(400).json({
            message:"Error"
        })
    }

}
const singleUserWithDraw=async(req,res,next)=>{
    try{

        let userId=req.params.id


        let withdrawRequests=await WithDraw.find({userId:userId});
        res.status(200).json({
            withdrawRequests
        }) 
 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}
const userWithDraw=async(req,res,next)=>{
    try{
        console.log(req.userId)
        let userId=req.userId;
        let withdrawRequests=await WithDraw.find({userId:userId});
        res.status(200).json({
            withdrawRequests
        }) 
 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}
const deleteWithDraw=async(req,res,next)=>{
    try{
        let withdrawId=req.params.withdrawId


        let result=await WithDraw.findByIdAndDelete({_id:withdrawId});
        res.status(200).json({
           message:"Successfully Deleted"
        }) 
 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}
const getActiveOrder=async(req,res,next)=>{
    try{
        let withdrawRequests=await WithDraw.find({state:"pending"});
        res.status(200).json({
            withdrawRequests
        }) 
 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}
const getPaidOrder=async(req,res,next)=>{
    try{
        let withdrawRequests=await WithDraw.find({state:"paid"});
        res.status(200).json({
            withdrawRequests
        }) 
 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}
const paidWithdraw=async(req,res,next)=>{
    try{
        console.log("asdf")
        let withdrawRequests=await WithDraw.findOneAndUpdate({_id:req.params.wId},{$set:{state:"paid"}});
        res.status(200).json({
            message:"Paid Successful"
        }) 
 
 
     }catch(err){
         res.status(400).json({
             message:"Error"
         })
     }
}



module.exports={
    addNewWithDraw,
    getWithDraw,
    singleUserWithDraw,
    deleteWithDraw,
    getActiveOrder,
    getPaidOrder,
    paidWithdraw,
    userWithDraw
}

