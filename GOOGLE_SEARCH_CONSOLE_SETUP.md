# Google Search Console Setup Guide

Google Search Console (GSC) helps you monitor and optimize your website's presence in Google Search results. Follow this guide to set it up for NeuroState®.

## What is Google Search Console?

Google Search Console provides:
- **Search Performance**: See which queries bring users to your site
- **Index Coverage**: Monitor which pages are indexed by Google
- **Mobile Usability**: Identify mobile-friendly issues
- **Core Web Vitals**: Track page experience metrics
- **Manual Actions**: Get notified of any penalties
- **Sitemap Submission**: Help Google discover your pages

## Step 1: Add Your Property to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click **Add Property** (or **Start now** if it's your first property)
4. Choose **URL prefix** property type
5. Enter your website URL: `https://neurostate.co.uk`
6. Click **Continue**

## Step 2: Get Your Verification Code

After adding your property, Google will show verification methods:

1. Select the **HTML tag** verification method
2. You'll see a meta tag like this:
   ```html
   <meta name="google-site-verification" content="abc123xyz456..." />
   ```
3. **Copy** the content value (the part between the quotes after `content=`)
   - Example: `abc123xyz456...`

## Step 3: Add Verification Code to Your Website

1. Open the `index.html` file in your project
2. Find this line:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
3. Replace `YOUR_VERIFICATION_CODE` with your actual code:
   ```html
   <meta name="google-site-verification" content="abc123xyz456..." />
   ```

## Step 4: Publish Your Changes

1. Save the `index.html` file
2. Click the **Update** button in Lovable's publish dialog
3. Wait for your site to deploy (usually 1-2 minutes)

## Step 5: Complete Verification in Google Search Console

1. Go back to the Google Search Console verification page
2. Click **Verify**
3. You should see a success message! 🎉

**Note**: If verification fails:
- Wait a few more minutes for DNS to propagate
- Clear your browser cache
- Double-check that the verification code is correct
- Make sure your site is published and live

## Step 6: Submit Your Sitemap

Your website already has a sitemap at `https://neurostate.co.uk/sitemap.xml`

1. In Google Search Console, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**

Google will now crawl your site more efficiently!

## Step 7: Link Google Search Console with Google Analytics

Combining both tools provides powerful insights:

1. Open [Google Analytics](https://analytics.google.com/)
2. Go to **Admin** > **Property Settings**
3. Scroll to **Product Links**
4. Click **Search Console Links**
5. Click **Link** and select your GSC property
6. Complete the linking process

## What to Monitor in Google Search Console

### 1. Performance Report
- **Total Clicks**: How many times users clicked your site in search results
- **Total Impressions**: How many times your site appeared in search results
- **Average CTR**: Click-through rate (clicks ÷ impressions)
- **Average Position**: Your average ranking position

**Key Pages to Monitor**:
- Homepage (`/`)
- Product pages (`/product/*`)
- Category pages (`/category/*`)
- Resource pages (`/resources`, `/guides`)

### 2. Search Queries
See what people search for to find your site:
- Identify high-performing keywords
- Find opportunities for new content
- Discover long-tail keywords

**Example Queries You Might See**:
- "science-backed supplements UK"
- "red light therapy benefits"
- "cognitive enhancement supplements"
- "NSF certified supplements"

### 3. Index Coverage
Monitor indexing status:
- **Valid**: Pages successfully indexed ✅
- **Excluded**: Pages intentionally not indexed
- **Error**: Pages that couldn't be indexed ⚠️
- **Valid with warnings**: Indexed but with issues

**Fix Common Issues**:
- Submit sitemap to help discovery
- Check robots.txt isn't blocking important pages
- Ensure pages return 200 status codes
- Fix broken internal links

### 4. Mobile Usability
Your site is already mobile-responsive, but monitor:
- Clickable elements too close together
- Content wider than screen
- Text too small to read
- Viewport not set

### 5. Core Web Vitals
Track page experience metrics:
- **LCP (Largest Contentful Paint)**: Loading performance
- **FID (First Input Delay)**: Interactivity
- **CLS (Cumulative Layout Shift)**: Visual stability

**Target Goals**:
- LCP: < 2.5s ✅
- FID: < 100ms ✅
- CLS: < 0.1 ✅

## Initial Data Timeline

- **Verification**: Immediate
- **Sitemap Processing**: 24-48 hours
- **Performance Data**: 2-3 days
- **Full Reports**: 7-14 days

## Optimization Tips Based on GSC Data

### Improve Click-Through Rate (CTR)
If impressions are high but clicks are low:
- Optimize page titles (include target keywords)
- Write compelling meta descriptions
- Use power words: "Science-Backed", "Premium", "Certified"
- Add structured data for rich snippets

### Improve Rankings
If average position is low:
- Create high-quality content around target keywords
- Build internal links to important pages
- Get quality backlinks
- Improve page load speed
- Ensure mobile-friendliness

### Fix Indexing Issues
If pages aren't indexed:
- Check robots.txt
- Ensure sitemap is submitted
- Build internal links to orphaned pages
- Fix crawl errors
- Remove duplicate content

## Regular Maintenance Tasks

**Weekly**:
- Check for new coverage issues
- Monitor search performance trends
- Review mobile usability issues

**Monthly**:
- Analyze top-performing queries and pages
- Identify new keyword opportunities
- Check for manual actions
- Review Core Web Vitals

**Quarterly**:
- Audit indexed pages vs. total pages
- Analyze seasonal traffic patterns
- Update content based on search insights
- Review and update meta descriptions

## Advanced Features

### URL Inspection Tool
Test individual URLs to:
- See how Google views the page
- Check mobile usability
- Identify structured data issues
- Request indexing for new/updated pages

### Manual Actions
Get notified if Google applies manual penalties:
- Unnatural links
- Thin content
- Cloaking
- Hidden text

### Security Issues
Get alerts for:
- Hacked content
- Malware
- Phishing attacks

## Troubleshooting Common Issues

### "Site not verified"
- Double-check verification code in `index.html`
- Ensure site is published and live
- Wait 24 hours and try again
- Try alternative verification methods (DNS, file upload)

### "Sitemap couldn't be read"
- Verify sitemap exists at `/sitemap.xml`
- Check for XML syntax errors
- Ensure URLs are absolute (include full domain)
- Make sure robots.txt allows sitemap

### "Coverage issues detected"
- Review specific errors in Index Coverage report
- Common fixes: update internal links, fix broken pages, add canonical tags

## Best Practices

1. **Regular Monitoring**: Check GSC weekly for issues
2. **Act on Errors**: Fix coverage and usability issues promptly
3. **Optimize Content**: Use search query data to improve content
4. **Submit New Pages**: Use URL Inspection to request indexing
5. **Mobile First**: Prioritize mobile experience
6. **Page Speed**: Keep Core Web Vitals in the green
7. **Structured Data**: Add schema markup for rich results

## Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Search Quality Guidelines](https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf)
- [Structured Data Testing Tool](https://search.google.com/test/rich-results)

## Next Steps

Once Google Search Console is set up and collecting data:

1. ✅ **Set up email notifications** for critical issues
2. ✅ **Add team members** if you have an SEO team
3. ✅ **Connect to Google Analytics** for unified insights
4. ✅ **Request indexing** for your most important pages
5. ✅ **Monitor performance** weekly and optimize accordingly

## Contact Support

If you need help with Google Search Console:
- [Google Search Central Community](https://support.google.com/webmasters/community)
- [Official Twitter: @googlesearchc](https://twitter.com/googlesearchc)

---

Your NeuroState® website is now ready for Google Search Console! 🚀
