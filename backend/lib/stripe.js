

import Stripe from 'stripe';

// Make sure to replace 'your-secret-key' with your actual Stripe secret key
const stripe = new Stripe('your-secret-key');

export default stripe;