import React from "react";
import { Col, Container, Image } from "react-bootstrap";
import abruzzoLogo from "../assets/abruzzologo.png";

function CustomFooter() {
  return (
    <Container fluid bg="dark" id="footer">
      <Col className="text-center py-2">
        <Image src={abruzzoLogo} width={150} />
        <footer>
          <span>
            &copy; 2024 Live Concert Abruzzo. <br /> Tutti i diritti riservati.
          </span>
          <br />
          <div>
            <a href="https://github.com/Davidino87" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{" "}
            |{" "}
            <a href="https://www.linkedin.com/in/davide-polimeno-4186062ab/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </footer>
      </Col>
    </Container>
  );
}

export default CustomFooter;
