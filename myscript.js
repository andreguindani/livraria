var cart = [];
var storedCart = localStorage.getItem('cart');
var cart = storedCart ? JSON.parse(storedCart) : [];
var salesHistory = localStorage.getItem('salesHistory') ? JSON.parse(localStorage.getItem('salesHistory')) : [];

function adicionarAoCarrinho(productId) {
    var product = document.querySelector(`#productList div[data-id="${productId}"]`);
    var productData = {
        id: productId,
        nome: product.getAttribute("data-nome"),
        preco: parseFloat(product.getAttribute("data-preco")),
        quantidade: 1
    };

    var existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantidade++;
    } else {
        cart.push(productData);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    atualizarCarrinho();
}

function removerDoCarrinho(productId) {
    cart = cart.filter(item => item.id !== productId);
    atualizarCarrinho();

    localStorage.setItem('cart', JSON.stringify(cart));
}

function calcularTotal() {
    return cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

function atualizarCarrinho() {
    var cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    cart.forEach(item => {
        var listItem = document.createElement("li");
        listItem.innerHTML = `${item.quantidade}x ${item.nome} - R$${(item.preco * item.quantidade).toFixed(2)} <button onclick="removerDoCarrinho(${item.id})">Remover</button>`;
        cartList.appendChild(listItem);
    });

    var totalElement = document.getElementById("total");
    totalElement.textContent = calcularTotal().toFixed(2);
}

function finalizarCompra() {
    if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart));
        var totalValue = calcularTotal();
        salesHistory.push(totalValue);
        localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

        window.location.href = 'formulario.html'
        alert("Compra finalizada! Total: R$" + calcularTotal().toFixed(2));
    } else {
        alert("Adicione produtos ao carrinho antes de finalizar a compra.");
    }
}
window.addEventListener('load', function () {
    var storedCart = localStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];
    var storedSalesHistory = localStorage.getItem('salesHistory');
    salesHistory = storedSalesHistory ? JSON.parse(storedSalesHistory) : [];
    atualizarCarrinho();
});

console.log("Vendas " + salesHistory)


