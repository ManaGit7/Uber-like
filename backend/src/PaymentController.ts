// backend/routes/paymentRoutes.js
import express from 'express';
import Stripe from 'stripe';
const router = express.Router();

// Replace with your Stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Convert amount to cents if needed
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error  : any) {
    res.status(500).json({ error: error.message });
  }
});

export default router