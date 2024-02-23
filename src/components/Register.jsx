import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/features/alertSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(
          setAlert({ variant: "danger", message: `Register error: ${data}` })
        );
        return;
      }
      dispatch(
        setAlert({
          variant: "success",
          message: `Registrazione riuscita, ora effettua la login`,
        })
      );
      navigate("/login");
    } catch (e) {
      dispatch(
        setAlert({ variant: "danger", message: `Register error: ${e}` })
      );
    }
  };

  return (
    <>
      <h2 className="mt-4">Registrazione</h2>
      <Form onSubmit={onFormSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="registerEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="email"
              type="email"
              placeholder="email@example.com"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="registerPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </Col>
        </Form.Group>

        <Button variant="dark" type="submit">
          Registrati
        </Button>
      </Form>
    </>
  );
}

export default Register;
