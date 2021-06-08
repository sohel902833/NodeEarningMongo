const router=require('express').Router()
const authentication =require('../auth/authentication')
const {loginAdmin,getEarningHistory,getUserEarningHistory}=require("../controller/adminController")

const {setAppSettings,getAppSettings,updateAppSettings}=require('../controller/adminController')
const {setPayment,getPayment,updatePayment}=require('../controller/paymentSettingController')

router.post('/login',loginAdmin)
router.get('/history',authentication,getEarningHistory)
router.get('/history/:userId',authentication,getUserEarningHistory)

router.get('/setting',authentication,getAppSettings)
router.post('/setting',authentication,setAppSettings)
router.put('/setting',authentication,updateAppSettings)

router.post('/payment',authentication,setPayment)
router.put('/payment',authentication,updatePayment)
router.get('/payment',authentication,getPayment)



module.exports=router;