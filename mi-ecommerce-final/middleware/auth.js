const jwt=require('jsonwebtoken');const auth=require('../services/authService');
function verifyToken(req,res,next){const header=req.get('Authorization')||'';if(!/^Bearer\s+\S+$/.test(header))return res.status(401).json({error:'Se requiere Authorization: Bearer <token>'});
 try{const decoded=jwt.verify(header.slice(7),process.env.JWT_SECRET);const user=auth.find(decoded.sub);if(!user)return res.status(401).json({error:'Usuario inexistente'});req.user=user;next();}catch(e){return res.status(401).json({error:'Token inválido o expirado'});}}
function requireAdmin(req,res,next){if(req.user?.role!=='admin')return res.status(403).json({error:'Acceso exclusivo para administradores'});next();}
function requireSession(req,res,next){if(!req.session?.user)return res.redirect('/login');next();}
function requireAdminPage(req,res,next){if(req.session?.user?.role!=='admin')return res.status(403).send('Acceso denegado');next();}
module.exports={verifyToken,requireAdmin,requireSession,requireAdminPage};
