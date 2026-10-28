const db = require('../db/database');
const base = `SELECT p.id,p.name,c.name AS category,p.price,p.price AS points,p.stock,p.emoji,p.description,p.image,p.featured FROM products p JOIN categories c ON c.id=p.category_id`;
const shape = p => p ? {...p,featured:Boolean(p.featured)} : undefined;
const all = () => db.prepare(base+' ORDER BY p.id').all().map(shape);
function normalizeId(raw) {
  if(!/^[1-9]\d*$/.test(String(raw)) || !Number.isSafeInteger(Number(raw))) {const e=new Error('ID inválido');e.status=400;throw e;}
  const id=Number(raw);
  if(!db.prepare('SELECT 1 FROM products WHERE id=?').get(id)){const e=new Error('Producto no encontrado');e.status=404;throw e;}
  return id;
}
const findById = id => shape(db.prepare(base+' WHERE p.id=?').get(normalizeId(id)));
const category = name => db.prepare(base+' WHERE LOWER(c.name)=LOWER(?) ORDER BY p.id').all(String(name)).map(shape);
const search = q => db.prepare(base+' WHERE instr(LOWER(p.name),LOWER(?)) > 0 ORDER BY p.id').all(String(q||'').trim()).map(shape);
const sorted = (list, sort) => ['asc','desc'].includes(sort)?[...list].sort((a,b)=>sort==='asc'?a.price-b.price:b.price-a.price):list;
const related = product => db.prepare(base+' WHERE c.name=? AND p.id<>? ORDER BY p.id LIMIT 4').all(product.category,product.id).map(shape);
const suggested = (limit=5) => db.prepare(base+' WHERE p.stock>0 ORDER BY p.featured DESC,p.id LIMIT ?').all(limit).map(shape);

const count = () => db.prepare('SELECT COUNT(*) AS total FROM products').get().total;
const create = data => {
 const result=db.prepare('INSERT INTO products (name,category_id,price,stock,emoji,description,image,featured) VALUES (@name,@category_id,@price,@stock,@emoji,@description,@image,@featured)').run(data);
 return findById(result.lastInsertRowid);
};
const update = (id,data) => {
 db.prepare('UPDATE products SET name=@name,category_id=@category_id,price=@price,stock=@stock,emoji=@emoji,description=@description,image=@image,featured=@featured WHERE id=@id').run({...data,id});
 return findById(id);
};
const remove = id => db.prepare('DELETE FROM products WHERE id=?').run(id).changes>0;
module.exports={all,normalizeId,findById,related,category,search,sorted,suggested,count,create,update,remove};
