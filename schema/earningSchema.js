const mongoose=require('mongoose')

const earningSchema=mongoose.Schema({
    earningText:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    previousBalance:{
        type:Number,
        require:true
    },
    newBalance:{
        type:Number,
        require:true,
    },
    time:{
        type:String,
        require:true
    }
});
const Earning=mongoose.model('EarningHistory',earningSchema)
module.exports=Earning

