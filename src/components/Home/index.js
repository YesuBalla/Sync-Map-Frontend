import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import indiaMap from '../../assets/indiaMap.png'
import SignUpModal from '../SignUpModal';
import SignInModal from '../SignInModal';

export default function Home() {

  const [modalSignUp, setModalSignUp] = React.useState(false);
  const [modalSignIn, setModalSignIn] = React.useState(false);

  return (
    <div id="home">
      <Container className="py-5 my-5">
        <Row>
          <Col>
            <Card className="border-0">
              <Card.Body>
                <Card.Title>
                  <h2>Welcome to the Sync Map App</h2>
                  <br />{" "}
                  <h3>
                  With this interactive and secure tool, you can explore and manage locations effortlessly and privately...
                  </h3>
                  <br /> To use this tool you need to register first.
                  <br />
                  <Button
                    variant="primary"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                      marginLeft: "120px",
                    }}
                    onClick={() => setModalSignUp(true)}
                  >
                    Register here!
                  </Button>
                  <SignUpModal
                    show={modalSignUp}
                    onHide={() => setModalSignUp(false)}
                  />
                  <br /> Already have an account? Go to{" "}
                  <Link
                    className="blueColor font16 no-underline"
                    onClick={() => setModalSignIn(true)}
                    offset={-80}
                  >
                    Sign In
                  </Link>
                  <SignInModal
                    show={modalSignIn}
                    onHide={() => setModalSignIn(false)}
                  />{" "}
                  please.
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Image src={indiaMap} rounded width={450} height={300} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
