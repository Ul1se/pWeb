const products=require('../../services/productsService');const categories=require('../../services/categoriesService');const {error,id,asyncHandler,validateProduct}=require('./helpers');
const get=(raw)=>{const product=products.findById(id(raw));if(!product)throw error(404,'Producto no encontrado');return product};
const payload=(body,previous)=>{const data=validateProduct(body,previous);if(!categories.findById(data.category_id))throw error(400,'Categoría inexistente');return data};
module.exports={
 all:asyncHandler((req,res)=>res.json(products.all())),
 detail:asyncHandler((req,res)=>res.json(get(req.params.id))),
 create:asyncHandler((req,res)=>{const product=products.create(payload(req.body));res.status(201).location('/api/products/'+product.id).json(product)}),
 update:asyncHandler((req,res)=>{const previous=get(req.params.id);const category=categories.all().find(c=>c.name===previous.category);res.json(products.update(previous.id,payload(req.body,{...previous,category_id:category.id})))}),
 remove:asyncHandler((req,res)=>{const product=get(req.params.id);products.remove(product.id);res.json({message:'Producto eliminado',id:product.id})})
};
