const service=require('../services/cartService');
exports.show=(req,res)=>res.render('pages/cart',{title:'Mi carrito',items:service.items(req),total:service.total(req)});
exports.add=(req,res,next)=>{try{if(!service.add(req,req.params.id))return res.status(409).render('errors/400',{title:'No se pudo agregar',message:'Producto agotado o sin stock disponible.'});res.redirect('/cart');}catch(e){next(e)}};
exports.change=(delta)=>(req,res,next)=>{try{service.change(req,req.params.id,delta);res.redirect('/cart');}catch(e){next(e)}};
exports.clear=(req,res)=>{service.clear(req);res.redirect('/cart')};
