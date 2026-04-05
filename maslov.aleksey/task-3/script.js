function sortArrayByParity(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("Parameter arr must be an array");
    }
    const even = [];
    const odd = [];
    for (let num of arr) {
        if (!Number.isInteger(num)) {
            throw new TypeError("Element is not an integer");
        }
        if (num % 2 === 0) {
            even.push(num);
        } else {
            odd.push(num);
        }
    }
    return even.concat(odd);
}

try {
    console.log(sortArrayByParity([3, 1, 2, 4]));
    console.log(sortArrayByParity([1, 6, 2, 3, 8, 5, 1, 4, 0, -1, -4]));    
    console.log(sortArrayByParity("string"));
} catch (e) {
    console.error("Error: ", e.message);
}
try {
    console.log(sortArrayByParity([3, 1, "string", 4]));
} catch (e) {
    console.error("Error: ", e.message);
}
