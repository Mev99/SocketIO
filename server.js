const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", handlebars.engine())
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "handlebars");
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.render("index.hbs");
})

products = []

io.on('connection', (socket) => {
    console.log('connected sv side: ', socket.id)

    socket.on('addProduct', (data) => {
        const checkProduct = products.some((e) => e.product === data.product)
        
        if (checkProduct) {
            const indexProduct = products.findIndex((e) => e.product === data.product)
            products[indexProduct].quantity += 1
            
            io.emit('showProducts', products)
        } else {
            products.push(data)

            io.emit('showProducts', products)
        }
    })
})


const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})