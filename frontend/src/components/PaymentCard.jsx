import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PaymentCard({header, title, content}) {
  return (
    <Card className="h-100">
      <Card.Header>{header}</Card.Header>
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='fw-bold'>{title}</Card.Title>
        <Card.Text>
          {content}
        </Card.Text>
        <Button className='mt-auto' variant="warning">PayPal</Button>
      </Card.Body>
    </Card>
  );
}

export default PaymentCard;