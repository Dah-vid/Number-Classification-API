// First, import required packages
const express = require('express');  // Web framework
const cors = require('cors');        // For handling CORS
const axios = require('axios');      // For making HTTP requests

// Create Express application
const app = express();

// Enable CORS for all origins (for development)
app.use(cors());

//Root to show API is working
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Number Classification API",
        usage: {
            endpoint: "/api/classify-number",
            example: "/api/classify-number?number=371"
        }
    });
});

// Function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to check if a number is perfect
function isPerfect(num) {
    if (num < 2) return false;
    let sum = 1;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            sum += i;
        }
    }
    return sum === num;
}

// Function to check if a number is Armstrong
function isArmstrong(num) {
    const digits = String(num).split('');
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => 
        acc + Math.pow(parseInt(digit), power), 0);
    return sum === num;
}

// Function to get number properties
function getNumberProperties(num) {
    const properties = [];
    const isArmstrongNum = isArmstrong(num);
    const isOdd = num % 2 !== 0;
    
     // Check if Armstrong
    if (isArmstrong(num)) {
        properties.push('armstrong');
    }
    
    // Check if odd or even
    if (isOdd) {
        properties.push('odd');
    } else {
        properties.push('even');
    }

    return properties;
}

// Function to calculate digit sum
function calculateDigitSum(num) {
    return String(Math.abs(num))
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
}

// Function to get a fun fact about a number
async function getNumberFact(num) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);

        const response = await axios.get(`http://numbersapi.com/${num}/math`, {
            signal: controller.signal
        });
        
        clearTimeout(timeout);
        return response.data;
    } catch (error) {
        if (isArmstrong(num)) {
            const digits = String(num).split('');
            const power = digits.length;
            return `${num} is an Armstrong number because ${digits.map(d => `${d}^${power}`).join(' + ')} = ${num}`;
        }
        return `${num} is an interesting number with various mathematical properties.`;
    }
}
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
// Main API endpoint
app.get('/api/classify-number', async (req, res) => {
    const numberStr = req.query.number;
    
    // Validate input: must be a valid integer
    if (!numberStr || isNaN(numberStr) || !Number.isInteger(Number(numberStr))) {
        return res.status(400).json({
            number: numberStr,
            error: true
        });
    }
    // Convert string to number
    const number = parseInt(numberStr);
    
    try {
        // Get fun fact about the number
        const funFact = await getNumberFact(number);
        
        // Prepare and send response
        res.json({
            number: number,
            is_prime: isPrime(number),
            is_perfect: isPerfect(number),
            properties: getNumberProperties(number),
            digit_sum: calculateDigitSum(number),
            fun_fact: funFact
        });
   } catch (error) {
        res.status(400).json({
            number: numberStr,
            error: true
        });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
