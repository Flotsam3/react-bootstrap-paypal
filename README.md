- PayPal developer documentation
  
https://developer.paypal.com/sdk/js/reference/#link-overview

## Prerequesites

- In order to use PayPal for API integration, a business account needs to be set up (free)

- Next step is to log in with the business account for:
  https://developer.paypal.com/

- Generate API Credentials
  Testing Tools > Sandbox Accouts
  Create 2 accounts, business and merchant

- Enter the business account
  REST API apps > Create App
  Copy Client ID and Secret

- Enable API Permissions

- Configure Webhooks (optional, to get real-time transaction notifications)

## Frontend configuration

- PayPay package
`react-paypal-js`

- React Router
`react-router-dom`

- Additional configuration in vite.config.js

```js
server: {
    port:5173,
    proxy: {
      "/paypal":"http://localhost:3000"
    }
  }
```