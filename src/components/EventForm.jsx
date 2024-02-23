import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function EventForm({ onFormSubmit, actionName, value = {} }) {
  const [formData, setFormData] = useState(value);
  const handleChange = (event) => {
    const field = event.target;
    setFormData({ ...formData, [field.name]: field.value });
  };
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        onFormSubmit(formData, event);
      }}
    >
      <Form.Group as={Row} className="mb-3" controlId="name">
        <Form.Label column sm="2">
          Nome
        </Form.Label>
        <Col sm="10">
          <Form.Control
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome evento"
            required
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="description">
        <Form.Label column sm="2">
          Descrizione
        </Form.Label>
        <Col sm="10">
          <Form.Control
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrizione evento"
            required
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="place">
        <Form.Label column sm="2">
          Luogo
        </Form.Label>
        <Col sm="10">
          <Form.Control
            name="place"
            type="text"
            value={formData.place}
            onChange={handleChange}
            placeholder="Pescara"
            required
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="date">
        <Form.Label column sm="2">
          Data
        </Form.Label>
        <Col sm="10">
          <Form.Control
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="04/04/2024"
            required
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="image">
        <Form.Label column sm="2">
          Immagine
        </Form.Label>
        <Col sm="10">
          <Form.Control
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://picsum.photos/id/111/500/500"
            required
          />
        </Col>
      </Form.Group>

      <Button variant="dark" type="submit">
        {actionName}
      </Button>
    </Form>
  );
}

export default EventForm;
