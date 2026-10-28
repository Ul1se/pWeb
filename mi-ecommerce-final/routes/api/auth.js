const r=require('express').Router();const auth=require('../../services/authService');const {verifyToken}=require('../../middleware/auth');
const handler=fn=>(req,res,next)=>Promise.resolve().then(()=>fn(req,res)).catch(next);
r.post('/register',handler(async(req,res)=>res.status(201).json({user:await auth.register(req.body)})));
r.post('/login',handler(async(req,res)=>{const user=await auth.authenticate(req.body.email,req.body.password);res.json({token:auth.sign(user),tokenType:'Bearer',user});}));
r.get('/me',verifyToken,(req,res)=>res.json({user:req.user}));module.exports=r;
