const categories=require('../../services/categoriesService');const {error,id,asyncHandler,validateCategory}=require('./helpers');
const get=raw=>{const item=categories.findById(id(raw));if(!item)throw error(404,'Categoría no encontrada');return item};
module.exports={
 all:asyncHandler((req,res)=>res.json(categories.all())),
 detail:asyncHandler((req,res)=>res.json(get(req.params.id))),
 create:asyncHandler((req,res)=>{const item=categories.create(validateCategory(req.body));res.status(201).location('/api/categories/'+item.id).json(item)}),
 update:asyncHandler((req,res)=>{const item=get(req.params.id);res.json(categories.update(item.id,validateCategory(req.body)))}),
 remove:asyncHandler((req,res)=>{const item=get(req.params.id);categories.remove(item.id);res.json({message:'Categoría eliminada',id:item.id})})
};
