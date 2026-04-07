let nextId = 4;
let products = [
    new Product(1, "prod1", ["supp1_1", "supp1_2"]),
    new Product(2, "prod2", ["supp2_1"]),
    new Product(3, "prod3", ["supp3_1", "supp3_2"])
];

function addSupplier(id) {
    console.log("Добавление поставщика:", id);
}
function removeSupplier(id) {
    console.log("Удаление поставщика:", id);
}
function deleteProduct(id) { 
    console.log("Удаление товара:", id);
    products = products.filter(p => p.id !== id);
    render();
}

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('prodName').value.trim();
    if (!name) return;
    const suppliersRaw = document.getElementById('prodSuppliers').value.trim();
    const suppliers = suppliersRaw ? suppliersRaw.split(',').map(s => s.trim()) : [];

    const product = new Product(nextId++, name, suppliers);
    products.push(product);

    this.reset();
    render();
});

function render() {
    const container = document.getElementById('productsList');
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'productCard';
        const suppliersListHtml = product.suppliers.map(s => `
            <div class="supplierItem">
                <span>${s}</span>
                <button class="btnDeleteSmall" onclick="removeSupplier(${product.id}, '${s}')">x</button>
            </div>
        `).join('');

        card.innerHTML = `
            <h3>${product.name} (ID: ${product.id})</h3>
            <p><strong>Количество поставщиков:</strong> ${product.supplierCount}</p>
            
            <div class="suppliersContainer">
                ${suppliersListHtml || '<p>Нет поставщиков</p>'}
            </div>

            <div class="cardActions">
                <button onclick="addSupplier(${product.id})">Добавить поставщика</button>
                <button class="btnDelete" onclick="deleteProduct(${product.id})">Удалить товар</button>
            </div>
        `;

        container.appendChild(card);
    });
}

render();
