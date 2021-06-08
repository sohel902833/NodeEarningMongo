const mongoose=require('mongoose')

const instanceWithdraw=mongoose.Schema({
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
const InstanceWithDraw=mongoose.model('InstantWithdraws',instanceWithdraw)
module.exports=InstanceWithDraw

