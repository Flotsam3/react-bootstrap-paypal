import './App.css';
import PaymentCard from './components/PaymentCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const data = {
  header: ["Featured", "Most Popular", "For Teams"],
  title: ["Starter $9/month", "Creator $29/month", "Enterprise $99/month"],
  content: ["Access to basic tools and functionalities, 5 GB storage, Email support, Ideal for individuals starting out", "Everything in Starter, plus: 50 GB storage, Priority email support, Advanced tools for creators and small businesses, Analytics and insights", "Everything in Creator, plus: Unlimited storage, Dedicated account manager, Team collaboration tools, Enterprise-grade security"]
}

function App() {
  return (
      <>
        <Container fluid="lg">
          <Row className="d-flex">
            <Col xs={12} sm={6} md={4}>< PaymentCard header={data.header[0]} title={data.title[0]} content={data.content[0]} /></Col>
            <Col xs={12} sm={6} md={4}>< PaymentCard header={data.header[1]} title={data.title[1]} content={data.content[1]} /></Col>
            <Col xs={12} sm={6} md={4}>< PaymentCard header={data.header[2]} title={data.title[2]} content={data.content[2]} /></Col>
          </Row>
        </Container>
        
      </>
  )
}

export default App
