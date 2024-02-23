import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { setAlert } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("http://localhost:3001/login", {
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
          setAlert({ variant: "danger", message: `Login error: ${data}` })
        );
        return;
      }
      dispatch(setUser(data.user));
      localStorage.setItem("activeUser", JSON.stringify(data.user));
      navigate("/");
    } catch (e) {
      dispatch(setAlert({ variant: "danger", message: `Login error: ${e}` }));
    }
  };
  return (
    <>
      <h2 className="mt-4">Login</h2>
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
          Login
        </Button>
      </Form>
    </>
  );
}

export default Login;
