const express=require('express');
const dotenv=require("dotenv");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const morgan=require("morgan");
const userRoute=require('./routes/users')
const eventRoute=require('./routes/events')
const app=express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// const swaggerJsdoc = require("swagger-jsdoc");
mongoose.connect(process.env.MONGO_URI);

app.use('/',userRoute);
app.use('/',eventRoute);
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req,res,next)=>{
    const error=new Error('Page not found.');
    error.status=404;
    next(error);
})
//CORS
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    if(req.method==='OPTIONS'){
        res.header("Access-Control-Allow-Methods",'PUT,POST,DELETE,GET,PATCH');
        return res.status(200).json({});
    }
    next();
})
app.listen(process.env.PORT,()=>{console.log(`Listening on port ${process.env.PORT}`);});
