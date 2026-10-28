const service=require('../services/cartService');const realtime=require('../services/realtimeService');
const snapshot=req=>({items:service.count(req),total:service.total(req),products:service.items(req)});
function notify(req,wasEmpty){const payload=snapshot(req);realtime.toSession(req.sessionID,'cartUpdated',payload);if(!wasEmpty&&payload.items===0)realtime.toSession(req.sessionID,'cartEmptied',{message:'Tu carrito quedó vacío'});return payload;}
function reply(req,res){if(req.get('X-Requested-With')==='XMLHttpRequest')return res.json({ok:true,...snapshot(req)});res.redirect('/cart');}
exports.show=(req,res)=>res.render('pages/cart',{title:'Mi carrito',items:service.items(req),total:service.total(req)});
exports.snapshot=(req,res)=>res.json(snapshot(req));
exports.add=(req,res,next)=>{try{const before=service.count(req);if(!service.add(req,req.params.id))return res.status(409).json({error:'Sin stock disponible'});req.session.save(err=>{if(err)return next(err);notify(req,before===0);reply(req,res);});}catch(e){next(e)}};
exports.change=delta=>(req,res,next)=>{try{const before=service.count(req);service.change(req,req.params.id,delta);req.session.save(err=>{if(err)return next(err);notify(req,before===0);reply(req,res);});}catch(e){next(e)}};
exports.clear=(req,res,next)=>{const before=service.count(req);service.clear(req);req.session.save(err=>{if(err)return next(err);notify(req,before===0);reply(req,res);});};
