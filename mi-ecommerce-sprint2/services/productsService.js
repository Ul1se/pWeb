const products = require('../models/productModel');
const all = () => products.map(p => ({...p, price:p.points, stock:p.id===9?0:12, image:null, featured:[1,3,4,5].includes(p.id)}));
const normalizeId = raw => { if(!/^[1-9]\d*$/.test(String(raw)) || !Number.isSafeInteger(Number(raw))) { const err=new Error('ID inválido');err.status=400;throw err; } return Number(raw); };
const findById = id => all().find(p=>p.id===normalizeId(id));
const related = product => !product.category?[]:all().filter(p=>p.id!==product.id && p.category===product.category).sort(()=>Math.random()-.5).slice(0,4);
const category = name => all().filter(p=>p.category.toLowerCase()===String(name).toLowerCase());
const search = q => all().filter(p=>p.name.toLocaleLowerCase('es').includes(String(q||'').trim().toLocaleLowerCase('es')));
const sorted = (list, sort) => ['asc','desc'].includes(sort)?[...list].sort((a,b)=>sort==='asc'?a.price-b.price:b.price-a.price):list;
module.exports={all,normalizeId,findById,related,category,search,sorted};
