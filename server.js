const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('YOUR_SECRET_KEY'); // Replace with your actual secret key

const app = express();

// Middleware
app.use(bodyParser.json());

// Define a POST route to handle payments
app.post('/charge', async (req, res) => {
    try {
        const { paymentMethodId, price } = req.body;

        // Create a PaymentIntent on Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price, // Amount in cents
            currency: 'usd', // Currency code (change as needed)
            payment_method: paymentMethodId,
            confirm: true, // Confirm the payment immediately
        });

        // If successful, send a success response
        res.json({ success: true });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ success: false, error: 'Payment failed' });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
