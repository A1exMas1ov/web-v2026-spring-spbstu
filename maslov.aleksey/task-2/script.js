function generateParenthesis(n) {
    if (!Number.isInteger(n)) {
        throw new Error("parameter n must be an int");
    }
    if (n < 0) {
        throw new Error("parameter n cannot be negative");
    }
    if (n === 0) return [];
    const result = [];
    function buildStrings(currentString, openCount, closeCount) {
        if (currentString.length === n * 2) {
            result.push(currentString);
            return;
        }
        if (openCount < n) {
            buildStrings(currentString + "(", openCount + 1, closeCount);
        }
        if (closeCount < openCount) {
            buildStrings(currentString + ")", openCount, closeCount + 1);
        }
    }
    buildStrings("", 0, 0);
    return result;
}

try {
    console.log("n = 2: ", generateParenthesis(2));
    console.log("n = 3: ", generateParenthesis(3));
    console.log("n = 0: ", generateParenthesis(0));
    console.log(generateParenthesis("abcde"));
}
catch(e) {
    console.error("Error: " + e.message)
}
try {
    console.log("n = -1: ", generateParenthesis(-1));   
}
catch(e) {
    console.error("Error: " + e.message)
}
