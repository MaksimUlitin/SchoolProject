function memoize(fn) {
    const cache = new Map();
    
    return function (...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            cache.get(key).calls++;
            return cache.get(key).val;
        } else {
            const result = fn(...args);
            cache.set(key, { val: result, calls: 1 });
            return result;
        }
    };
}

const getInputs = () => [[2,2],[2,2],[1,2]];
const fn = function (a, b) { return a + b; };
const memoized = memoize(fn);

const inputs = getInputs();
const results = [];

for (const arr of inputs) {
    results.push(memoized(...arr));
}

console.log(JSON.stringify(results));
