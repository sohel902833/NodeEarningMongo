const mongoose=require('mongoose')

const versionSchema=mongoose.Schema({
   versionNo:{
       type:String,
       default:"1.0.0",
   },
   priority:{
       type:Number
   }
});
const Version=mongoose.model('ApplicationVersion',versionSchema)
module.exports=Version

