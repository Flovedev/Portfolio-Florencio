import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex mt-5 pt-5">
      <Row>
        <Col>
          <h1>Hello! I'm Florencio Villanueva but you can call me Flo</h1>
          <h5>I'm a Full-stack developer expert on MERN</h5>
          <div>
            <div>
              <p
                onClick={() => {
                  navigate("/experience");
                }}
              >
                see my projects
              </p>
              <p
                onClick={() => {
                  navigate("/about");
                }}
              >
                more about me
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
