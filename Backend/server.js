const http = require('http');
const app = require('./app');
// ... existing code ...
const port = process.env.PORT || 3000; // Updated port number
// ... existing code ...


const server = http.createServer(app)

server.listen(port ,()=>{
    console.log(`Sever  is running on ${port}`)
})
    