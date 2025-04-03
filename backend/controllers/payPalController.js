const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL;

export const getAccessToken = async (req, res) => {
    try {
        const credentials = Buffer.from(
            `${process.env.PAYPAL_CLIENTID}:${process.env.PAYPAL_SECRET}`
        ).toString('base64');
          
        const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ // send data as application/x-www-form-urlencoded
                grant_type: 'client_credentials',
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        const newAccessToken = data.access_token;
        return newAccessToken;
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error!"});
    }
}


export const createOrder = async (req, res) => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(
            `${PAYPAL_BASE_URL}/v2/checkout/orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            items: [
                                {
                                    name: "Volatility Grid",
                                    description: "Interactive volatilities dashboard for cryptocurrencies.",
                                    quantity: "1",
                                    unit_amount: {
                                        currency_code: "USD",
                                        value: "5.00"
                                    }
                                }
                            ],
                            amount: {
                                currency_code: "USD",
                                value: "5.00",
                                breakdown: {
                                    item_total: {
                                        currency_code: "USD",
                                        value: "5.00"
                                    }
                                }
                            }
                        }
                    ],
                    payment_source: {
                        paypal: {
                            experience_context: {
                                payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                                payment_method_selected: "PAYPAL",
                                brand_name: "DekayHub - Volatility Grid",
                                shipping_preference: "NO_SHIPPING",
                                locale: "de-DE",
                                user_action: "PAY_NOW",
                                return_url: `${process.env.PAYPAL_REDIRECT_BASE_URL}/complete`,
                                cancel_url: `${process.env.PAYPAL_REDIRECT_BASE_URL}/cancel`,
                            },
                        },
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text(); // or .json() if you expect a JSON error
            console.error("PayPal order creation failed:", errorData);
            return res.status(response.status).json({ error: "Failed to create PayPal order" });
        }

        const data = await response.json();
        const orderId = data.id;
        console.log({data, orderId});
        
        res.status(200).json({orderId});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error!"});
    }
};

export const capturePayment = async (req, res) => {
    try {
        const accessToken = await getAccessToken();

        const { paymentId } = req.params;

        const response = await fetch(
            `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${paymentId}/capture`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to capture payment: ${response.statusText}`);
        }

        const paymentData = await response.json();

        console.log(paymentData);

        if (paymentData.status !== "COMPLETED") {
            return res.status(400).json({msg: "Paypal payment incomplete or failed!"})
        };

        const email = "test@xyz.com";
        const daysToExtend = 30;
        const currentDate = new Date();
        const tierEndAt = new Date(currentDate.setDate(currentDate.getDate() + daysToExtend));

        res.status(200).json({message: "success", user: {email, tier: "pro", tierEndAt}});
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
