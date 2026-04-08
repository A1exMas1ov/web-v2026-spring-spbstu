const LS_KEY = 'products_v1';

let nextId = 4;
let products = [];

function saveToLS() {
    localStorage.setItem(LS_KEY, JSON.stringify({
        nextId,
        products: products.map(p => p.toJSON())
    }));
}

function loadFromLS() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return false;
        const data = JSON.parse(raw);
        nextId = data.nextId;
        products = data.products.map(d => new Product(d.id, d.name, d.suppliers));
        return true;
    } catch(e) {
        return false;
    }
}

if (!loadFromLS()) {
    products = [
        new Product(1, "prod1", ["supp1_1", "supp1_2"]),
        new Product(2, "prod2", ["supp2_1"]),
        new Product(3, "prod3", ["supp3_1", "supp3_2"])
    ];
}

window.addEventListener('beforeunload', saveToLS);

function asyncOp(fn) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(fn()); saveToLS();
            } catch(e) {
                reject(e);
            }
        }, 300);
    });
}

function addSupplier(id) {
    const name = prompt('Введите имя поставщика:');
    asyncOp(() => {
        const product = products.find(p => p.id === id);
        product.addSupplier(name.trim());
    })
    .then(() => render())
    .catch(e => alert(e.message));
}

function removeSupplier(id, name) {
    asyncOp(() => {
        const product = products.find(p => p.id === id);
        product.removeSupplier(name);
    })
    .then(() => render())
    .catch(e => alert(e.message));
}

function deleteProduct(id) {
    asyncOp(() => {
        products = products.filter(p => p.id !== id);
    }).then(() => render());
}

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('prodName').value.trim();
    if (!name) {
        return;
    }
    const suppliersRaw = document.getElementById('prodSuppliers').value.trim();
    const suppliers = suppliersRaw ? suppliersRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

    asyncOp(() => {
        products.push(new Product(nextId++, name, suppliers));
    }).then(() => { this.reset(); render(); });
});

function renderList(list, title = '') {
    const container = document.getElementById('productsList');
    container.innerHTML = title ? `<h4>${title}</h4>` : '';

    if (!list.length) {
        container.innerHTML += '<p>Нет товаров</p>';
        return;
    }

    list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'productCard';
        const suppliersListHtml = product.suppliers.map(s => `
            <div class="supplierItem">
                <span>${s}</span>
                <button class="btnDeleteSmall" onclick="removeSupplier(${product.id}, '${s}')">x</button>
            </div>
        `).join('');

        card.innerHTML = `
            <h3>${product.name}</h3>
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

function render() {
    renderList(products);
}

function showUniqueSuppliers() {
    const list = uniqueSuppliers(products);
    alert('Все поставщики:\n' + (list.length ? list.join('\n') : 'нет'));
}

function showMaxSuppliers() {
    const list = maxSupplierProducts(products);
    alert('Товары с макс. поставщиками:\n' + list.map(p => `${p.name} (${p.supplierCount})`).join('\n'));
}

function showBySupplier() {
    const name = document.getElementById('filterSupplierInput').value.trim();
    if (!name) {
        return alert('Введите имя поставщика');
    }
    const list = productsBySupplier(products, name);
    renderList(list.length ? list : [], `Товары с поставщиком "${name}"`);
}

function showGroupBySupplier() {
    const grouped = groupBySupplier(products);
    const container = document.getElementById('productsList');
    container.innerHTML = '<h3>Группировка по поставщику</h3>';

    for (const [supplier, items] of Object.entries(grouped)) {
        container.innerHTML += `<h3>Поставщик: ${supplier}</h3>`;
        items.forEach(p => {
            const card = document.createElement('div');
            card.className = 'productCard';
            card.innerHTML = `<h4>${p.name}</h4>`;
            container.appendChild(card);
        });
    }
}

function showGroupByCount() {
    const grouped = groupBySupplierCount(products);
    const container = document.getElementById('productsList');
    container.innerHTML = '<h3>Группировка по количеству поставщиков</h3>';

    for (const count of Object.keys(grouped).sort((a, b) => b - a)) {
        container.innerHTML += `<h3>Поставщиков: ${count}</h3>`;
        grouped[count].forEach(p => {
            const card = document.createElement('div');
            card.className = 'productCard';
            card.innerHTML = `<h4>${p.name}</h4>`;
            container.appendChild(card);
        });
    }
}

function resetView() {
    render();
}

render();
