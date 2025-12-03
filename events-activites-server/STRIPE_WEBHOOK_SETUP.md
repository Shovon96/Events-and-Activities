# Stripe Webhook Setup Guide

## Problem
Stripe webhooks don't work automatically in local development because Stripe can't reach `localhost`. You need to use **Stripe CLI** to forward webhooks to your local server.

## Solution: Use Stripe CLI

### Step 1: Install Stripe CLI

**Windows:**
```bash
# Using Scoop
scoop install stripe

# Or download from: https://github.com/stripe/stripe-cli/releases
```

**Mac:**
```bash
brew install stripe/stripe-brew/stripe
```

**Linux:**
```bash
# Download and install from: https://github.com/stripe/stripe-cli/releases
```

### Step 2: Login to Stripe
```bash
stripe login
```
This will open your browser to authenticate with Stripe.

### Step 3: Forward Webhooks to Local Server
```bash
stripe listen --forward-to localhost:5000/v1/api/payments/webhook
```

You should see output like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx (^C to quit)
```

### Step 4: Copy Webhook Secret
Copy the webhook signing secret (starts with `whsec_`) and add it to your `.env` file:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### Step 5: Restart Your Server
```bash
pnpm dev
```

### Step 6: Keep Stripe CLI Running
**IMPORTANT:** Keep the `stripe listen` command running in a separate terminal while testing payments.

## Testing the Setup

### 1. Test Webhook Endpoint is Accessible
```bash
GET http://localhost:5000/v1/api/payments/webhook/test
```

Should return:
```json
{
  "success": true,
  "message": "Webhook endpoint is accessible",
  "url": "/v1/api/payments/webhook"
}
```

### 2. Join an Event (Initiate Payment)
```bash
POST http://localhost:5000/v1/api/participants/join
Authorization: Cookie (accessToken)
Body: { "eventId": "your-event-uuid" }
```

Response will include:
```json
{
  "success": true,
  "message": "Successfully joined the event!",
  "data": {
    "paymentUrl": "https://checkout.stripe.com/...",
    "participant": { ... }
  }
}
```

### 3. Complete Payment
- Open the `paymentUrl` in your browser
- Use Stripe test card: **4242 4242 4242 4242**
- Any future expiry date (e.g., 12/34)
- Any 3-digit CVC (e.g., 123)
- Click "Pay"

### 4. Watch the Logs

**In Stripe CLI terminal:**
```
2025-01-31 10:00:00   --> checkout.session.completed [evt_xxxxx]
2025-01-31 10:00:00  <--  [200] POST http://localhost:5000/v1/api/payments/webhook [evt_xxxxx]
```

**In your server terminal:**
```
🔔 Webhook endpoint hit
✅ Webhook signature verified
Event type: checkout.session.completed
🔔 Webhook received: {
  eventId: '...',
  userId: '...',
  paymentId: '...',
  paymentStatus: 'paid'
}
✅ Payment updated: payment-uuid
✅ Participant payment status updated
```

### 5. Verify Database
```sql
-- Check Payment status
SELECT id, "paymentStatus", "transactionId" FROM payments 
WHERE id = 'your-payment-id';

-- Check Participant status
SELECT id, "userId", "eventId", "paymentStatus" FROM participents 
WHERE "userId" = 'your-user-id' AND "eventId" = 'your-event-id';
```

Both should show `paymentStatus: 'PAID'`

## Common Issues

### Issue 1: "Webhook endpoint not found"
**Solution:** Make sure payment routes are registered in `src/app/routes/index.ts`

### Issue 2: "No stripe-signature header"
**Solution:** Make sure Stripe CLI is running with the correct forward URL

### Issue 3: "Webhook signature verification failed"
**Solution:** 
- Copy the webhook secret from Stripe CLI output
- Add it to `.env` as `STRIPE_WEBHOOK_SECRET`
- Restart your server

### Issue 4: "Payment status not updating"
**Solution:**
- Check that `userId`, `eventId`, and `paymentId` are in session metadata
- Check console logs for errors
- Verify Stripe CLI is forwarding webhooks

## Environment Variables Required

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_from_stripe_cli
STRIPE_SUCCESS_URL=http://localhost:3000/payment/success
STRIPE_CANCEL_URL=http://localhost:3000/payment/cancel
```

## Production Setup

For production, you don't need Stripe CLI. Instead:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your production webhook URL: `https://yourdomain.com/v1/api/payments/webhook`
4. Select event: `checkout.session.completed`
5. Copy the signing secret
6. Add it to your production environment variables

## Quick Start Commands

```bash
# Terminal 1: Start your server
pnpm dev

# Terminal 2: Forward Stripe webhooks
stripe listen --forward-to localhost:5000/v1/api/payments/webhook

# Copy the webhook secret (whsec_...) to your .env file
# Restart your server (Terminal 1)
```

Now test by joining an event and completing payment! 🎉
