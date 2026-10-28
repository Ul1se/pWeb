const {WebSocketServer,WebSocket}=require('ws');
const clients=new Map();let wss;
function send(ws,type,payload){if(ws.readyState===WebSocket.OPEN)ws.send(JSON.stringify({type,payload}));}
function start(server,sessionMiddleware){wss=new WebSocketServer({noServer:true});server.on('upgrade',(request,socket,head)=>{if(new URL(request.url,'http://localhost').pathname!=='/ws'){socket.destroy();return;}sessionMiddleware(request,{},()=>{if(!request.session){socket.destroy();return;}wss.handleUpgrade(request,socket,head,ws=>wss.emit('connection',ws,request));});});wss.on('connection',(ws,req)=>{const sid=req.sessionID;let set=clients.get(sid);if(!set){set=new Set();clients.set(sid,set);}set.add(ws);send(ws,'connected',{status:'Conectado'});ws.on('close',()=>{set.delete(ws);if(!set.size)clients.delete(sid);});ws.on('error',()=>{});});return wss;}
function toSession(sessionId,type,payload){for(const ws of clients.get(sessionId)||[])send(ws,type,payload);}
function broadcast(type,payload){for(const set of clients.values())for(const ws of set)send(ws,type,payload);}
function activeConnections(){return [...clients.values()].reduce((n,s)=>n+s.size,0);}
module.exports={start,toSession,broadcast,activeConnections};
