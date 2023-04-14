import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";

function Register() {
  const [inputvalue, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <Form className="Register-form">
      <h2>Sign Up</h2>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          value={inputvalue.firstName}
          name="firstName"
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          required="true"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          value={inputvalue.lastName}
          name="lastName"
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          required="true"

        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          value={inputvalue.email}
          onChange={handleChange}
          required="true"

        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          value={inputvalue.password}
          onChange={handleChange}
          required="true"
        />
      </Form.Group>
      <Button variant="warning" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Register;
