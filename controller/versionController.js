const Version=require('../schema/versionSchema')


const saveNewVersion=async(req,res,next)=>{

    let {versionNo,priority}=req.body

    if(versionNo && priority){
        try{
            priority=parseInt(priority)

            let prevVersion=await Version.find();
            let version={
                versionNo,priority
            }
            console.log(prevVersion.length)
            if(prevVersion.length!=0){
                let updatedVersion=await Version.findOneAndUpdate({_id:prevVersion[0]._id},{$set:version})
                res.status(200).json({
                    message:"Version Saved Success"
                }) 
            }else{
                console.log("here")
                let newVersion=new Version(version)
                let version1=await newVersion.save()
        
                res.status(200).json({
                    message:"Version Saved Success"
                }) 
            }

    }catch(err){
        res.status(404).json({
            message:"Server Error",
            err
        }) 
    }

    }else{
        res.status(402).json({
            message:"All The Filed Is Required"
        })
    }



}

const updateNewVersion=async(req,res,next)=>{
    let {versionNo,priority}=req.body

    if(versionNo || priority){
        try{
            let prevVersion=await Version.find();
            versionNo=versionNo?parseInt(versionNo):prevVersion[0].versionNo;
            priority=priority?parseInt(priority):prevVersion[0].priority;

            let newVersion={
               priority,versionNo
            }

            let id=prevVersion[0]._id;

           let result= await  Version.updateOne({_id:id},{$set:newVersion},{new:true})

           res.status(202).json({
                message:"Version Updated Successful"
            })



        }catch(err){
            res.status(404).json({
                message:"Server Error"
            }) 
        }
    }else{
        res.status(402).json({
            message:"One Filed Is Required"
        })
    }




}
const getVersion=async(req,res,next)=>{
    let version=await Version.find();
    res.status(200).json({
        version
    })
}

module.exports={
    saveNewVersion,updateNewVersion,getVersion
}