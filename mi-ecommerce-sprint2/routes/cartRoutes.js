const router=require('express').Router(),c=require('../controllers/cartController');
router.get('/cart',c.show);router.post('/cart/add/:id',c.add);router.post('/cart/increase/:id',c.change(1));router.post('/cart/decrease/:id',c.change(-1));router.post('/cart/clear',c.clear);module.exports=router;
