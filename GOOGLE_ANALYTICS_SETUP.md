# Google Analytics 4 Setup Guide

Google Analytics 4 (GA4) has been integrated into your NeuroState® website. Follow these steps to complete the setup:

## Step 1: Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **Admin** (gear icon in the bottom left)
4. Under **Property**, click **Data Streams**
5. Click on your web stream (or create a new one if needed)
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 2: Add Your Measurement ID to the Website

1. Open the `index.html` file in your project
2. Find **both** instances of `G-XXXXXXXXXX` (there are 2 places)
3. Replace them with your actual Measurement ID

```html
<!-- Replace this -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  ...
  gtag('config', 'G-XXXXXXXXXX', {
    'send_page_view': false
  });
</script>

<!-- With your actual ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
<script>
  ...
  gtag('config', 'G-YOUR-ACTUAL-ID', {
    'send_page_view': false
  });
</script>
```

## Step 3: Publish Your Changes

After adding your Measurement ID, click the **Update** button in the publish dialog to deploy your changes.

## What's Being Tracked

Your website now automatically tracks:

### 1. **Page Views**
- Every page visit is tracked automatically
- Includes page path, title, and URL

### 2. **Product Views**
- Tracked when users view product detail pages
- Includes product ID, name, price, and category

### 3. **Add to Cart**
- Tracked when users add items to their cart
- Includes product details, variant, and quantity

### 4. **Remove from Cart**
- Tracked when users remove items from cart
- Includes product details and quantity

### 5. **Begin Checkout**
- Tracked when users start the checkout process
- Includes full cart contents and total value

### 6. **Custom Events** (ready for future use)
- Newsletter signups
- Product quiz completions
- Search queries

## Viewing Your Data

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Navigate to **Reports** to see:
   - **Real-time**: Current active users and their activity
   - **Engagement**: Page views, events, and conversions
   - **Monetization**: E-commerce performance
   - **User attributes**: Demographics and technology

## E-commerce Reports

Your GA4 is configured for enhanced e-commerce tracking. After a few days of data collection, you'll see:

- **Product performance**: Which products are viewed and purchased most
- **Shopping behavior**: Cart abandonment rates and conversion funnels
- **Revenue metrics**: Total revenue, average order value
- **Product list performance**: Click-through rates from category pages

## Testing Your Setup

1. Visit your website with your GA4 Measurement ID added
2. Open [Google Analytics Real-time report](https://analytics.google.com/)
3. Navigate around your site, view products, and add items to cart
4. You should see your activity appear in the real-time report within seconds

## Troubleshooting

**Not seeing data?**
- Verify your Measurement ID is correct in `index.html`
- Make sure you've published your changes
- Check browser console for errors
- Disable ad blockers when testing
- Wait 24-48 hours for some reports to populate

**Need help?**
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 E-commerce Documentation](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)

## Privacy & GDPR Compliance

Consider adding:
- Cookie consent banner (if targeting EU users)
- Privacy policy update mentioning analytics
- IP anonymization (already enabled by default in GA4)

## Next Steps

Once data is flowing:
1. Set up **Conversion Events** for your key goals
2. Create **Custom Reports** for your business needs
3. Set up **Alerts** for significant changes in traffic
4. Connect to **Google Search Console** for search data
5. Enable **Google Ads linking** if running ads
