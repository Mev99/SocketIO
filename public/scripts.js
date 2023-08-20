const socket = io();

socket.on('showProducts', (socket) => {
    const productsBox = document.getElementById('products__div')
    productsBox.innerHTML = ''
    console.log('SOCKET LOG', socket)

    socket.forEach((e) => {
        const paragraph = document.createElement('p')
        paragraph.textContent = e.product, e.quantity
        productsBox.appendChild(paragraph)

    });
})

const formInput = document.getElementById('input')
const formButton = document.getElementById('send__button')
formButton.onclick = updateProducts
const quantity = 1

function updateProducts(e) {
    e.preventDefault()
    const product = formInput.value
    if (product === "") {
        console.log('enter a product')
    } else {
        socket.emit('addProduct', { product, quantity })
    }
}
