const readline = require('readline');

// Create interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Input array
function inputArray() {
    return new Promise((resolve, reject) => {
        rl.question('Input array (Numbers are separated by spaces): \n', (input) => {
            // Split string
            const arr = input.trim().split(' ').map(Number);

            // Check if each element is a number
            if (arr.some(isNaN)) {
                reject(new Error('Please enter numbers only'));
            } else {
                resolve(arr);
            }
        });
    });
}

// Find Minimum, Maximum
function minMaxSum(arr) {
    //Check if the array has 5 elements
    if (arr.length != 5) {
        throw new Error('The array must have 5 elements');
    }
    // Sort array
    arr.sort((a, b) => a - b);
    // Minimum, Maximum
    const minimum = arr.slice(0, 4).reduce((acc, curr) => acc + curr, 0);
    const maximum = arr.slice(-4).reduce((acc, curr) => acc + curr, 0);

    return [minimum, maximum];
}


async function main() {
    try {
        const arr = await inputArray();

        const [minimum, maximum] = minMaxSum(arr);

        console.log("Minimum, Maximun:\n", minimum, maximum);
    } catch (error) {
        console.error(error.message);
    }

    rl.close();
}

main();
