import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PayPalButtons } from '@paypal/react-paypal-js';

function PaymentCard({header, title, content}) {
  const styles = {
    shape: "rect",
    layout: "vertical"
  };

async function onCreateOrder(){
  try {
    const response = await fetch("/paypal/create-order",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      }
    });
    const data = await response.json();
    return data.orderId;
  } catch (error) {
      console.log("Error creating paypal orders!", error);
      throw error;
  }
}

async function onApprove(data){
  try {
    console.log({data});
    if (!data?.orderID) throw new Error("Invalid orderid!");

    const response = await fetch(`/paypal/capture-payment/${data.orderID}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    console.log("onApprove result", result);
    
    window.location.href = "/complete";
  } catch (error) {
    console.log("Error verifying paypal order!", error);
    window.location.href = "/cancel";
  }
}

async function onError(error){
  console.log("Paypal error!", error);
  window.location.href = "/cancel";
}

  return (
    <Card className="h-100">
      <Card.Header>{header}</Card.Header>
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='fw-bold'>{title}</Card.Title>
        <Card.Text>
          {content}
        </Card.Text>
        <PayPalButtons className='mt-auto' style={styles} createOrder={onCreateOrder} onApprove={onApprove} onError={onError}/>
        {/* To show only the paypal button add: fundingSource: "paypal" */}
      </Card.Body>
    </Card>
  );
}

export default PaymentCard;