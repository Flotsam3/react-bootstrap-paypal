- PayPal developer documentation
  
https://developer.paypal.com/sdk/js/reference/#link-overview

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