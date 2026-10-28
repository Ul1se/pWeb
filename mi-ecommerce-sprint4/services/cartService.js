const products = require('./productsService');
function cart(req){if(!Array.isArray(req.session.cart))req.session.cart=[];return req.session.cart;}
function add(req,id){const p=products.findById(id);if(p.stock<=0)return false;const list=cart(req),item=list.find(x=>x.productId===p.id);if(item){if(item.quantity>=p.stock)return false;item.quantity++;}else list.push({productId:p.id,quantity:1});return true;}
function change(req,id,delta){const p=products.findById(id),list=cart(req),item=list.find(x=>x.productId===p.id);if(!item)return false;item.quantity=Math.min(p.stock,item.quantity+delta);if(item.quantity<=0)req.session.cart=list.filter(x=>x.productId!==p.id);return true;}
function clear(req){req.session.cart=[];}
function items(req){return cart(req).map(x=>{let p;try{p=products.findById(x.productId);}catch(e){if(e.status===404)return null;throw e;}const quantity=Math.min(x.quantity,p.stock);return quantity>0?{...p,quantity,subtotal:p.price*quantity}:null;}).filter(Boolean);}
function total(req){return items(req).reduce((sum,p)=>sum+p.subtotal,0);}
function count(req){return items(req).reduce((sum,p)=>sum+p.quantity,0);}
module.exports={add,change,clear,items,total,count};
