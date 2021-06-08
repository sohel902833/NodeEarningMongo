
const Payment=require('../schema/paymentSchema')

const setPayment=async(req,res,next)=>{
    let{bkash,paypal,gcash,paytm,jazz,payoner,playstore,amazon}=req.body

        if(!bkash || !paypal || !gcash || !paytm || !jazz || !payoner || !playstore || !amazon){
            res.status(402).json({
                message:"All Value Is Required"
            })
        }else{
            try{
               bkash=parseInt(bkash)
               paypal=parseInt(paypal)
               gcash=parseInt(gcash)
               paytm=parseInt(paytm)
               jazz=parseInt(jazz)
               payoner=parseInt(payoner)
               playstore=parseInt(playstore)
               amazon=parseInt(amazon)

                let payment={
                   bkash,paypal,gcash,paytm,jazz,payoner,playstore,amazon
                }

                let newPayment=new Payment({
                    bkash,paypal,gcash,paytm,jazz,payoner,playstore,amazon
                })
                let prevPayment=await Payment.find();
                if(prevPayment.length>0){
                    let result= await  Payment.updateOne({_id:prevPayment[0]._id},{$set:payment},{new:true})
                        res.status(202).json({
                                message:"Setting Saved Successful"
                            })  
                }else{
                    let result=await newPayment.save();
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

const updatePayment=async(req,res,next)=>{

    let{bkash,paypal,gcash,paytm,jazz,payoner,playstore,amazon}=req.body

     

    if(!(bkash || paypal || gcash || paytm || jazz || payoner || playstore || amazon)){
        res.status(402).json({
            message:"One Value Is Required"
        })
    }else{
        try{

            let prevPayment=await Payment.find();
           
             bkash=bkash?parseInt(bkash):prevPayment[0].bkash;
             paypal=paypal?parseInt(paypal):prevPayment[0].paypal;
             gcash=gcash?parseInt(gcash):prevPayment[0].gcash;
             paytm=paytm?parseInt(paytm):prevPayment[0].paytm;
             jazz=jazz?parseInt(jazz):prevPayment[0].jazz;
             payoner=payoner?parseInt(payoner):prevPayment[0].payoner;
             playstore=playstore?parseInt(playstore):prevPayment[0].playstore;
             amazon=amazon?parseInt(amazon):prevPayment[0].amazon;



            let newPayment={
                bkash,paypal,gcash,paytm,jazz,payoner,playstore,amazon 
            }

            let id=prevPayment[0]._id;
           let result= await  Payment.updateOne({_id:id},{$set:newPayment},{new:true})

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

const getPayment=async(req,res,next)=>{
    try{
        let payment=await Payment.find();
        res.status(202).json({
            payment
        })


    }catch(err){
        res.json({
            message:"Error"+err
         })
    }
}


module.exports={

    setPayment,
    updatePayment,
    getPayment

}