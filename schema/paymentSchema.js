const mongoose=require('mongoose')

const paymentSchema=mongoose.Schema({
   paypal:Number,
   bkash:Number,
   gcash:Number,
   paytm:Number,
   jazz:Number,
   payoner:Number,
   playstore:Number,
   amazon:Number
});
const Payment=mongoose.model('PaymentSetting',paymentSchema)
module.exports=Payment

