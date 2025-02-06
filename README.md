# Number Classification API

An API that analyzes numbers and returns their mathematical properties alongside a fun fact. The API also identifies prime numbers, perfect numbers, Armstrong numbers and calculates digit sums.
## API Endpoint

```
GET /number-classification-api-wbx0.onrender.com/api/classify-number?number={}
```

### Response Format (200 OK)
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Error Response (400 Bad Request)
```json
{
    "number": "alphabet",
    "error": true
}
```

## Features of API
- Number property analysis (prime, perfect, Armstrong)
- Odd/Even classification
- Digit sum calculation
- Mathematical fun facts via Numbers API
- CORS enabled
- Fast response time (< 500ms)
- Error handling

## Property Combinations
The `properties` field will contain one of these combinations:
1. `["armstrong", "odd"]` - if the number is both an Armstrong number and odd
2. `["armstrong", "even"]` - if the number is an Armstrong number and even
3. `["odd"]` - if the number is not an Armstrong number but is odd
4. `["even"]` -  if the number is not an Armstrong number but is even


## Dependencies
- express ^4.21.2: Web framework
- cors ^2.8.5: CORS middleware
- axios ^1.7.9: HTTP client for Numbers API
- nodemon ^3.1.9 (dev): Development auto-reload

## Deployment
This API is deployed on Render and can be accessed at: `https://number-classification-api-wbx0.onrender.com/`
To deploy your own instance:
1. Fork this repository
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Use the following settings:
   - Build Command: `npm install`
   - Start Command: `node index.js`

## Error Handling
- Invalid inputs return 400 Bad Request

## APIs Used
- Numbers API (http://numbersapi.com) for mathematical facts
