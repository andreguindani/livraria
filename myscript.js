        // Exemplo de produtos
        var products = [
            { id: 1, nome: "Livro 1", preco: 20.00 },
            { id: 2, nome: "Livro 2", preco: 15.00 },
            { id: 3, nome: "Livro 3", preco: 25.00 }
        ];

        // Inicializar lista de produtos
        $(document).ready(function() {
            var productList = $("#productList");
            products.forEach(function(product) {
                productList.append(`<li>${product.nome} - R$${product.preco.toFixed(2)} <button onclick="adicionarAoCarrinho(${product.id})">Adicionar</button></li>`);
            });
        });

        // Função para adicionar produto ao carrinho
        function adicionarAoCarrinho(productId) {
            var product = products.find(p => p.id === productId);
            cart.push(product);
            atualizarCarrinho();
        }

        // Função para remover produto do carrinho
        function removerDoCarrinho(productId) {
            cart.splice(index, 1);
            atualizarCarrinho();
        }

        // Função para calcular o total do carrinho
        function calcularTotal() {
            return cart.reduce((total, product) => total + product.preco, 0);
        }

        function atualizarCarrinho() {
            var cartList = $("#cartList");
            cartList.empty();
            
            cart.forEach(function(product, index) {
                cartList.append(`<li>${product.nome} - R$${product.preco.toFixed(2)} <button onclick="removerDoCarrinho(${index})">Remover</button></li>`);
            });

            var totalElement = $("#total");
            var total = calcularTotal();
            totalElement.text(total.toFixed(2));
        }

        // Função para finalizar a compra
        function concluirCompra() {
            // Adicione a lógica para validar o formulário
            // Se tudo estiver certo, envie os dados para o servidor
            // Use AJAX para enviar dados ao servidor
            // Exemplo: $.post("http://jkorpela.fi/cgi-bin/echo.cgi", $("#checkoutForm").serialize(), function(data) { console.log(data); });
        }