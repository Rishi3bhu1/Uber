const {createServer} = require('http')
const app = require('./app');
const {initializeSocket} = require('./socket.js')
const PORT = process.env.PORT||3000;

const server = createServer(app);

initializeSocket(server);

server.listen(PORT,()=>{
  console.log(`Server is running on PORT ${PORT}`)  
})