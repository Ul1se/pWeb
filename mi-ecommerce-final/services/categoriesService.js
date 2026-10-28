const db=require('../db/database');
const all=()=>db.prepare('SELECT id,name FROM categories ORDER BY id').all();
const findById=id=>db.prepare('SELECT id,name FROM categories WHERE id=?').get(id);
const count=()=>db.prepare('SELECT COUNT(*) AS total FROM categories').get().total;
const create=name=>{const result=db.prepare('INSERT INTO categories(name) VALUES (?)').run(name);return findById(result.lastInsertRowid)};
const update=(id,name)=>{db.prepare('UPDATE categories SET name=? WHERE id=?').run(name,id);return findById(id)};
const remove=id=>db.prepare('DELETE FROM categories WHERE id=?').run(id).changes>0;
module.exports={all,findById,count,create,update,remove};
