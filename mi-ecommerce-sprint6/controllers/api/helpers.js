const error=(status,message)=>Object.assign(new Error(message),{status});
const id=raw=>{if(!/^[1-9]\d*$/.test(String(raw))||!Number.isSafeInteger(Number(raw)))throw error(400,'ID inválido');return Number(raw)};
const asyncHandler=fn=>(req,res,next)=>{try{Promise.resolve(fn(req,res)).catch(next)}catch(e){next(e)}};
const validateCategory=data=>{if(!data||typeof data.name!=='string'||!data.name.trim()||data.name.trim().length>100)throw error(400,'Nombre de categoría inválido');return data.name.trim()};
const validateProduct=(input,previous)=>{
 if(!input||typeof input!=='object'||Array.isArray(input))throw error(400,'Body JSON inválido');
 const d={...previous,...input};
 if(typeof d.name!=='string'||!d.name.trim()||d.name.length>150)throw error(400,'Nombre de producto inválido');
 if(!Number.isSafeInteger(d.category_id)||d.category_id<=0)throw error(400,'category_id debe ser un entero positivo');
 if(!Number.isSafeInteger(d.price)||d.price<0)throw error(400,'price debe ser un entero no negativo');
 if(!Number.isSafeInteger(d.stock)||d.stock<0)throw error(400,'stock debe ser un entero no negativo');
 for(const key of ['emoji','description','image'])if(d[key]!==undefined&&d[key]!==null&&typeof d[key]!=='string')throw error(400,`${key} debe ser texto`);
 if(d.featured!==undefined&&typeof d.featured!=='boolean'&&d.featured!==0&&d.featured!==1)throw error(400,'featured inválido');
 return {name:d.name.trim(),category_id:d.category_id,price:d.price,stock:d.stock,emoji:d.emoji??null,description:d.description??null,image:d.image??null,featured:Number(Boolean(d.featured))};
};
module.exports={error,id,asyncHandler,validateCategory,validateProduct};
