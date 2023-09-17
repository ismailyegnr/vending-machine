import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import { useAuth } from "../utils/auth";

function LoginView() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.login(password);
      navigate("/supplier", { replace: true });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div style={{ width: "420px" }}>
        {error && (
          <Card bg="warning" className="mb-3">
            <Card.Body className="justify-content-between d-flex">
              {error} <CloseButton onClick={() => setError(null)} />
            </Card.Body>
          </Card>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-3"
            />
            <Button variant="primary" type="submit" className="mx-auto d-block">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default LoginView;
