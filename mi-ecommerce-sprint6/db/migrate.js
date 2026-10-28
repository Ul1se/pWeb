const db = require('./database');
const legacy = require('../data/legacyProducts');
const insertCategory = db.prepare('INSERT OR IGNORE INTO categories(name) VALUES (?)');
const categoryId = db.prepare('SELECT id FROM categories WHERE name = ?');
const insertProduct = db.prepare(`INSERT OR IGNORE INTO products(id,name,category_id,price,stock,emoji,description,image,featured) VALUES (@id,@name,@category_id,@price,@stock,@emoji,@description,@image,@featured)`);
const migrate = db.transaction(() => {
  for (const p of legacy) {
    insertCategory.run(p.category);
    insertProduct.run({id:p.id,name:p.name,category_id:categoryId.get(p.category).id,price:p.points,stock:p.id===9?0:12,emoji:p.emoji,description:p.description,image:null,featured:[1,3,4,5].includes(p.id)?1:0});
  }
});
migrate();
console.log('Migración completa. Productos:',db.prepare('SELECT COUNT(*) AS total FROM products').get().total);
