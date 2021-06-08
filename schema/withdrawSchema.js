const mongoose=require('mongoose')

const withdrawSchema=mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    coins:{
        type:Number,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    payment:{
        type:String,
        require:true
    },
    accountNo:{
        type:Number,
        require:true
    }
});
const WithDraw=mongoose.model('WithdrawRequests',withdrawSchema)
module.exports=WithDraw

