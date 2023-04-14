import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState }from 'react'

function Login() {


  const [inputvalue, setValue] = useState({
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
    <Form className="Login-form">
      <h2>Sign in</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          value={inputvalue.email}
          onChange={handleChange}
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
        />
      </Form.Group>
      {inputvalue.password.length > 0 && inputvalue.email.length > 0 ? (
      <Button variant="warning" type="submit">
        Submit
      </Button>
      ) : null}
    </Form>
  );
}

export default Login;