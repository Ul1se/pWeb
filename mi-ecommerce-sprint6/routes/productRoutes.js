const router=require('express').Router(),c=require('../controllers/productController');
router.get('/',c.home);router.get('/products',c.list);router.get('/products/:id',c.detail);router.get('/product/:id',c.detail);router.get('/categories/:category',c.category);router.get('/search',c.search);module.exports=router;
