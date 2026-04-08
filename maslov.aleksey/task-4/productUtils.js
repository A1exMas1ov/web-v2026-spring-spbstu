function groupBySupplier(products) {
    const map = {};
    for (const p of products) {
        for (const s of p.suppliers) {
            if (!map[s]) {
                map[s] = [];
            }
            map[s].push(p);
        }
    }
    return map;
}

function uniqueSuppliers(products) {
    return [...new Set(products.flatMap(p => p.suppliers))].sort();
}

function productsBySupplier(products, supplierName) {
    return products.filter(p => p.suppliers.includes(supplierName));
}

function groupBySupplierCount(products) {
    const map = {};
    for (const p of products) {
        if (!map[p.supplierCount]) {
            map[p.supplierCount] = [];
        }
        map[p.supplierCount].push(p);
    }
    return map;
}

function maxSupplierProducts(products) {
    if (!products.length) {
        return [];
    }
    const max = Math.max(...products.map(p => p.supplierCount));
    return products.filter(p => p.supplierCount === max);
}
