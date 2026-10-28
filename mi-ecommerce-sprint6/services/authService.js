const db=require('../db/database');
const bcrypt=require('bcrypt');const jwt=require('jsonwebtoken');
const publicUser=u=>({id:u.id,name:u.name,email:u.email,role:u.role});
const emailOk=e=>typeof e==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
async function register({name,email,password}){
 if(typeof name!=='string'||!name.trim()||!emailOk(email)||typeof password!=='string'||password.length<8) {const e=new Error('Nombre, correo válido y contraseña de 8 caracteres son obligatorios');e.status=400;throw e;}
 const normalized=email.trim().toLowerCase();if(db.prepare('SELECT id FROM users WHERE email=?').get(normalized)){const e=new Error('El correo ya está registrado');e.status=409;throw e;}
 const hash=await bcrypt.hash(password,12);
 try {const result=db.prepare("INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,'consumer')").run(name.trim(),normalized,hash);return publicUser(db.prepare('SELECT * FROM users WHERE id=?').get(result.lastInsertRowid));}
 catch(e){if(e.code?.startsWith('SQLITE_CONSTRAINT'))e.status=409;throw e;}
}
async function authenticate(email,password){const u=typeof email==='string'?db.prepare('SELECT * FROM users WHERE email=?').get(email.trim().toLowerCase()):null;
 if(!u||typeof password!=='string'||!await bcrypt.compare(password,u.password_hash)){const e=new Error('Credenciales incorrectas');e.status=401;throw e;}return publicUser(u);}
function sign(user){if(!process.env.JWT_SECRET)throw new Error('Falta JWT_SECRET');return jwt.sign({sub:String(user.id)},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'2h'});}
function find(id){const u=db.prepare('SELECT * FROM users WHERE id=?').get(id);return u?publicUser(u):null;}
module.exports={register,authenticate,sign,find};
