// Initialize Stripe with your publishable key
const stripe = Stripe('YOUR_PUBLISHABLE_KEY');

// Get all purchase buttons
const purchaseButtons = document.querySelectorAll('.purchase-button');

// Handle clicks on purchase buttons
purchaseButtons.forEach(button => {
    button.addEventListener('click', async () => {
        try {
            // Get the price (in cents) from the button's data attribute
            const price = parseInt(button.getAttribute('data-price'));

            // Create a PaymentMethod with Stripe
            const { paymentMethod, error } = await stripe.createPaymentMethod('card');

            if (error) {
                throw new Error(error.message);
            }

            // Send the payment method ID and price to your server
            const paymentMethodId = paymentMethod.id;
            
            // Make a POST request to your server (replace with your server endpoint)
            const response = await fetch('/charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentMethodId, price }),
            });

            // Handle the server's response (e.g., show a success message)
            const result = await response.json();
            if (result.success) {
                alert('Payment successful! Thank you for your purchase.');
            } else {
                alert('Payment failed. Please try again later.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment error. Please try again later.');
        }
    });
});
