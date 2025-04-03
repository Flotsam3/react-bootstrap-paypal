# PayPal Demo App

This is a demo application showcasing the integration of PayPal for payments using the PayPal REST API. The app demonstrates the entire workflow from order creation to payment capture.

## Features
- Create and capture PayPal orders
- Integration with PayPal API using Node.js and Express
- Frontend using React and PayPal Buttons

## Technologies Used
- Backend: Node.js, Express
- Frontend: React, Vite, Bootstrap
- PayPal SDK: @paypal/react-paypal-js

## PayPal Developer Documentation
For more information about the PayPal SDK, refer to the official documentation:
[PayPal Developer Docs](https://developer.paypal.com/sdk/js/reference/#link-overview)

## Prerequisites
1. **PayPal Business Account**: Required for API integration (free to set up).
2. **Developer Account Setup**:
   - Log in to the PayPal Developer Portal: [PayPal Developer](https://developer.paypal.com/)
   - Generate API Credentials:
     - Go to **Testing Tools > Sandbox Accounts**
     - Create two accounts: one business and one merchant
   - Log into the business account and navigate to **REST API apps > Create App**
   - Copy the **Client ID** and **Secret**

## Frontend Configuration
### Packages
- PayPal package: `@paypal/react-paypal-js`
- Router: `react-router-dom`

### Vite Configuration
The following configuration in `vite.config.js` is used to handle backend requests:
```js
server: {
  port: 5173,
  proxy: {
    "/paypal": "http://localhost:3000"
  }
}
```

## Running the App
1. Clone the repository.
2. Install dependencies:
```
npm install
```
3. Set up environment variables:

### Backend Environment Variables:
```
PORT=<your-backend-port>
PAYPAL_CLIENTID=<your-client-id>
PAYPAL_SECRET=<your-secret>
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
PAYPAL_REDIRECT_BASE_URL=http://localhost:5173
```
### Frontend Environment Variables:
```
VITE_PAYPAL_CLIENTID=<your-client-id>
```

4. Start the backend server:
```
npm run server
```
5. Start the frontend:
```
npm run dev
```
6. Visit the app at `http://localhost:5173`.

## License
This project is licensed under the MIT License.

