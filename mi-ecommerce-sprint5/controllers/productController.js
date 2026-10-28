const products=require('../services/productsService');
exports.home=(req,res)=>res.render('pages/index',{title:'Inicio',products:products.all(),suggested:products.suggested(5),popular:products.all().filter(p=>p.featured).slice(0,10),query:'',category:''});
exports.list=(req,res)=>res.render('pages/list',{title:'Productos',products:products.sorted(products.all(),req.query.sort),sort:req.query.sort||''});
exports.detail=(req,res,next)=>{try{const product=products.findById(req.params.id);res.render('pages/product',{title:product.name,product,related:products.related(product)});}catch(e){next(e)}};
exports.category=(req,res)=>res.render('pages/list',{title:'Categoría',heading:'Categoría: '+req.params.category,products:products.category(req.params.category),sort:''});
exports.search=(req,res)=>res.render('pages/list',{title:'Buscar',heading:'Resultados para: '+String(req.query.query||''),products:products.search(req.query.query),sort:''});
