const http = require("http")
 const PORT = 3500
 
 const server = http.createServer((req,res)=>{
     res.writeHead(200,{"Content-Type":"text/plain"})
     res.end("Hello MERN - CMJD 109")
 });
 
 server.listen(PORT,()=>{
     console.log(`Server Started PORT: ${PORT} `)
 })