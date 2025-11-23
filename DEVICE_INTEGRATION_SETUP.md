# Device Integration Setup Guide

Nova supports syncing biometric data from popular wearable devices. This guide explains how to set up each integration.

## Overview

Nova can integrate with:
- **Oura Ring** (OAuth integration available)
- **Whoop** (OAuth integration - requires setup)
- **Apple Watch** (Requires native mobile app - coming soon)

## Oura Ring Integration

### Prerequisites
1. An Oura Ring with an active account
2. Oura API credentials (Client ID and Client Secret)

### Setup Steps

1. **Create Oura Application**
   - Go to [Oura Cloud Developers](https://cloud.ouraring.com/oauth/applications)
   - Create a new application
   - Set the redirect URI to: `https://ibugjjjhxtclofaegtvc.supabase.co/functions/v1/oura-callback`
   - Copy your Client ID and Client Secret

2. **Add Secrets to Lovable Cloud**
   - You'll need to add these secrets:
     - `OURA_CLIENT_ID`
     - `OURA_CLIENT_SECRET`
   
3. **Update Frontend Code**
   - In `src/pages/NovaDevices.tsx`, replace the OAuth flow with your Client ID

4. **Test Connection**
   - Go to Nova → Devices
   - Click "Connect" on Oura Ring Gen 3
   - Authorize NeuroState to access your Oura data
   - You'll be redirected back with your device connected

### Data Synced from Oura
- HRV (Heart Rate Variability)
- Sleep quality scores
- Sleep stages (Deep, REM, Light, Awake)
- Recovery scores
- Activity data

## Whoop Integration

### Prerequisites
1. A Whoop 4.0 or newer device
2. Whoop API credentials

### Setup Steps

1. **Apply for Whoop API Access**
   - Contact Whoop Developer Support
   - Provide your use case (personal wellness tracking)
   - Wait for API access approval (can take several weeks)

2. **Create Whoop Application**
   - Similar OAuth flow to Oura
   - Set redirect URI and obtain credentials

3. **Add Secrets**
   - `WHOOP_CLIENT_ID`
   - `WHOOP_CLIENT_SECRET`

4. **Implement Edge Function**
   - Create `supabase/functions/whoop-callback/index.ts` similar to Oura callback
   - Update `sync-device-data` to handle Whoop data format

## Apple Watch Integration

Apple Watch data syncing requires:
- Native iOS app with HealthKit integration
- Background sync capabilities
- Secure data transmission to Nova backend

**Status**: Coming soon. Currently in development.

## Demo Data

For testing and demonstration purposes, new users automatically receive 30 days of sample biometric data when they first sign up. This allows you to explore Nova's features immediately without connecting a device.

To generate demo data manually, call the `seed-demo-data` edge function.

## Troubleshooting

### Device Won't Connect
- Verify OAuth credentials are correct
- Check that redirect URIs match exactly
- Ensure device has an active subscription (Oura, Whoop)

### Data Not Syncing
- Check device battery level
- Verify internet connection on wearable
- Manually trigger sync from Devices page
- Check edge function logs for errors

### API Rate Limits
- Oura: 5,000 requests per day
- Whoop: Varies by tier

## Security Notes

- All OAuth tokens are encrypted and stored securely in the database
- Tokens are never exposed to the frontend
- Data is only accessible by the authenticated user
- All API calls go through secure edge functions

## Support

For help with device integrations, contact: support@neurostate.co.uk