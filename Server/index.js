const express=require("express");
const app=express();
const server=require("http").createServer(app);
const io=require("socket.io")(server);
const port=3000;

io.on("connection",function(socket){
    console.log(`User with id ${socket.id} has connected`);
    socket.on("Message sent",function(msg){
        console.log("Message sent: "+msg);
        io.emit("add message",msg);
    });
});

server.listen(port,function(){
    console.log(`Server is running at port ${port}`);
});