const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyParser=require('body-parser')

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
const app=express();


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))




dotenv.config();
app.use(express.json())
//database connection
const localConnection="mongodb://localhost/EarningApps";
const connectUrl="mongodb+srv://sohelrana902833:01744431962@cluster0.kbxpx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(localConnection,{
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(res=>{
    console.log("Database Connected")
}).catch(err=>{
    console.log("Database Connection Failed")
})

app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/withdraw',require('./routes/withdrawRoutes'))
app.use('/api/admin',require('./routes/adminRoutes'))
app.use('/api/instant',require('./routes/instanceWithdrawRoutes'))
app.use('/api/version',require('./routes/versionRoutes'))



function errorHandler(err,req,res,next){
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({error:err})
}

const port=process.env.PORT


app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
