const User=require('../schema/userSchema')
const Earning=require('../schema/earningSchema')
const Settings=require('../schema/SettingSchema')
const jwt=require('jsonwebtoken')


const loginAdmin=async(req,res,next)=>{
    let{email,password}=req.body

    if(!email || !password){
        res.status(404).json({
            message:"Authentication Failed"
        })  
    }
    if(email==process.env.ADMIN_EMAIL){
       
        if(password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign({
                name:"Md Tanvir Haydar",
                email:"tanvir@gmail.com"
            },process.env.JWT_SECRET,{
                expiresIn:"7d"
            })
     
            res.status(200).json({
                "access_token":token,
                "message":"Login successful"
            })
        }else{
            res.status(404).json({
                message:"Authentication Failed"
            })  
        }
    }else{
        res.status(404).json({
            message:"Authentication Failed"
        })
    }


}
const setAppSettings=async(req,res,next)=>{
        let{bkash,paytm,offer,cap4,regCoin,refer,minW,cap1,cap2,cap3,coinValue,fourthCaptchaDelayTime,firstCaptchaDelayTime,secondCaptchaDelayTime,thirdCaptchaDelayTime,watchDelayTime}=req.body

        if(!bkash || !paytm || !offer || !fourthCaptchaDelayTime || !cap4 || !regCoin || !refer || !minW || !coinValue || !firstCaptchaDelayTime || !secondCaptchaDelayTime || !thirdCaptchaDelayTime || !watchDelayTime || !cap1 || !cap2 || !cap3){
            res.status(402).json({
                message:"All Value Is Required"
            })
        }else{
            try{
                coinValue=parseInt(coinValue);
                firstCaptchaDelayTime=parseInt(firstCaptchaDelayTime);
                secondCaptchaDelayTime=parseInt(secondCaptchaDelayTime);
                thirdCaptchaDelayTime=parseInt(thirdCaptchaDelayTime);
                fourthCaptchaDelayTime=parseInt(fourthCaptchaDelayTime);
                cap1=parseInt(cap1);
                cap2=parseInt(cap2);
                cap3=parseInt(cap3);
                cap4=parseInt(cap4);
                offer=parseInt(offer);
                bkash=parseInt(bkash);
                paytm=parseInt(paytm);
                minW=parseInt(minW);
                refer=parseInt(refer);
                regCoin=parseInt(regCoin);
    

                let setting={
                    coinValue,
                    firstCaptchaDelayTime,
                    secondCaptchaDelayTime,
                    thirdCaptchaDelayTime,
                    fourthCaptchaDelayTime,
                    watchDelayTime,
                    cap1,
                    cap2,
                    bkash,
                    paytm,
                    cap3,offer,minW,refer,regCoin,cap4
                }

                let newSetting=new Settings({
                    coinValue,
                    firstCaptchaDelayTime,
                    secondCaptchaDelayTime,
                    fourthCaptchaDelayTime,
                    thirdCaptchaDelayTime,
                    watchDelayTime,bkash,paytm,
                    cap1,cap2,cap3,offer,minW,refer,regCoin,cap4
                })
                let prevSettings=await Settings.find();
                if(prevSettings.length>0){
                    let result= await  Settings.updateOne({_id:prevSettings[0]._id},{$set:setting},{new:true})
                        res.status(202).json({
                                message:"Setting Saved Successful"
                            })  
                }else{
                    let result=await newSetting.save();
                    res.status(202).json({
                        message:"Setting Added Successful"
                    })
                }


              


            }catch(err){
                res.json({
                   message:"Error"+err
                })
            }
        }

}
const getAppSettings=async(req,res,next)=>{
    try{
        let setting=await Settings.find();
        res.status(202).json({
            setting
        })


    }catch(err){
        res.json({
            message:"Error"+err
         })
    }
}
const updateAppSettings=async(req,res,next)=>{
    let{bkash,paytm,offer,cap4,regCoin,refer,minW,cap1,cap2,cap3,coinValue,fourthCaptchaDelayTime,firstCaptchaDelayTime,secondCaptchaDelayTime,thirdCaptchaDelayTime,watchDelayTime}=req.body

    if(!(bkash || paytm || offer || fourthCaptchaDelayTime || cap4 || regCoin || refer|| minW || cap1 || cap2 || cap3 || coinValue || firstCaptchaDelayTime || secondCaptchaDelayTime || thirdCaptchaDelayTime || watchDelayTime)){
        res.status(402).json({
            message:"One Value Is Required"
        })
    }else{
        try{


            let prevSettings=await Settings.find();
            coinValue=coinValue?parseInt(coinValue):prevSettings[0].coinValue;
            firstCaptchaDelayTime=firstCaptchaDelayTime?parseInt(firstCaptchaDelayTime):prevSettings[0].firstCaptchaDelayTime;
            secondCaptchaDelayTime=secondCaptchaDelayTime?parseInt(secondCaptchaDelayTime):prevSettings[0].secondCaptchaDelayTime;
            thirdCaptchaDelayTime=thirdCaptchaDelayTime?parseInt(thirdCaptchaDelayTime):prevSettings[0].thirdCaptchaDelayTime;
            watchDelayTime=watchDelayTime?parseInt(watchDelayTime):prevSettings[0].watchDelayTime;
            fourthCaptchaDelayTime=fourthCaptchaDelayTime?parseInt(fourthCaptchaDelayTime):prevSettings[0].fourthCaptchaDelayTime;
            cap1=cap1?parseInt(cap1):prevSettings[0].cap1;
            cap2=cap2?parseInt(cap2):prevSettings[0].cap2;
            cap4=cap4?parseInt(cap4):prevSettings[0].cap4;
            cap3=cap3?parseInt(cap3):prevSettings[0].cap3;
            bkash=bkash?parseInt(bkash):prevSettings[0].bkash;
            paytm=paytm?parseInt(paytm):prevSettings[0].paytm;
            offer=offer?parseInt(offer):prevSettings[0].offer;
            minW=minW?parseInt(minW):prevSettings[0].minW;
            refer=refer?parseInt(refer):prevSettings[0].refer;
            regCoin=regCoin?parseInt(regCoin):prevSettings[0].regCoin;


            let newSetting={
                coinValue,
                firstCaptchaDelayTime,
                secondCaptchaDelayTime,
                thirdCaptchaDelayTime,
                fourthCaptchaDelayTime,
                watchDelayTime,bkash,paytm,
                cap1,cap2,cap3,cap4,offer,minW,refer,regCoin
            }

            let id=prevSettings[0]._id;

           let result= await  Settings.updateOne({_id:id},{$set:newSetting},{new:true})

           res.status(202).json({
                message:"Setting Updated Successful"
            })


        }catch(err){
            res.json({
               message:"Error"+err
            })
        }
    }

}
const getEarningHistory=async(req,res,next)=>{
    let earning=await Earning.find();
    res.status(200).json({
        earningHistory:earning
    })
}
const getUserEarningHistory=async(req,res,next)=>{
    let {userId}=req.params

    let earning=await Earning.find({userId});
    res.status(200).json({
        earningHistory:earning
    })
}

module.exports={
    loginAdmin,
    setAppSettings,
    getAppSettings,
    updateAppSettings,
    getEarningHistory,
    getUserEarningHistory
}