const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: false }));
const products = [
 {id:1,name:'Auriculares inalámbricos',category:'Electrónica',points:1850,emoji:'🎧',description:'Sonido envolvente y batería de larga duración.'},
 {id:2,name:'Cafetera de filtro',category:'Hogar',points:3200,emoji:'☕',description:'Prepará tu café favorito cada mañana.'},
 {id:3,name:'Zapatillas urbanas',category:'Indumentaria',points:4500,emoji:'👟',description:'Comodidad para todos los días.'},
 {id:4,name:'Joystick inalámbrico',category:'Juegos',points:2600,emoji:'🎮',description:'Control ergonómico y conexión inalámbrica.'},
 {id:5,name:'Parlante portátil',category:'Electrónica',points:2100,emoji:'🔊',description:'Música en cualquier lugar.'},
 {id:6,name:'Mochila de viaje',category:'Otros',points:1900,emoji:'🎒',description:'Espaciosa, liviana y resistente.'},
 {id:7,name:'Kit de limpieza auto',category:'Automotor',points:950,emoji:'🚗',description:'Todo para cuidar tu vehículo.'},
 {id:8,name:'Caja de chocolates',category:'Alimentos',points:750,emoji:'🍫',description:'Selección de chocolates deliciosos.'},
 {id:9,name:'Botella de jugo',category:'Bebidas',points:350,emoji:'🧃',description:'Refrescante y natural.'}
];
const categories=['Electrónica','Alimentos','Bebidas','Indumentaria','Juegos','Automotor','Hogar','Otros'];
app.use((req,res,next)=>{res.locals.categories=categories;res.locals.page=req.path;next()});
app.get('/',(req,res)=>res.render('pages/index',{title:'Inicio',products,query:req.query.q||'',category:req.query.category||''}));
app.get(['/products','/product'],(req,res)=>res.redirect('/product/1'));
app.get(['/products/:id','/product/:id'],(req,res)=>{
 const product=products.find(p=>p.id===Number(req.params.id));
 if(!product)return res.status(404).render('pages/not-found',{title:'Producto no encontrado',products:products.slice(0,4)});
 res.render('pages/product',{title:product.name,product,related:products.filter(p=>p.category===product.category&&p.id!==product.id)});
});
app.get('/cart',(req,res)=>res.render('pages/cart',{title:'Mi carrito'}));
app.get('/checkout',(req,res)=>res.render('pages/checkout',{title:'Finalizar compra'}));
app.get('/login',(req,res)=>res.render('pages/login',{title:'Iniciar sesión'}));
app.get('/register',(req,res)=>res.render('pages/register',{title:'Crear cuenta'}));
app.use((req,res)=>res.status(404).render('pages/not-found',{title:'Página no encontrada',products:products.slice(0,4)}));
app.listen(process.env.PORT||3000,()=>console.log('Mi Ecommerce: http://localhost:'+(process.env.PORT||3000)));
