let products = [
    new Product(1, "prod1", ["supp1_1", "supp1_2"]),
    new Product(2, "prod2", ["supp2_1"]),
    new Product(3, "prod3", ["supp3_1", "supp3_2"])
];

function addSupplier(id) {
    console.log("Добавить поставщика:", id);
}
function removeSupplier(id) {
    console.log("Удалить поставщика:", id);
}
function deleteProduct(id) {
    console.log("Удалить товар:", id);
}

function render() {
    const container = document.getElementById('productsList');
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'productCard';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Поставщики:</strong> ${product.suppliers.join(', ') || 'Нет'}</p>
            <p><strong>Количество:</strong> ${product.supplierCount}</p>

            <div class="cardActions">
                <button onclick="addSupplier(${product.id})">Добавить поставщика</button>
                <button onclick="removeSupplier(${product.id})">Удалить поставщика</button>
                <button class="btnDelete" onclick="deleteProduct(${product.id})">Удалить товар</button>
            </div>
        `;

        container.appendChild(card);
    });
}

render();
