import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function SignInModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setError("");
    setUsername("");
    setPassword("");
    props.onHide();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const signInData = { username, password };


    try {
      const url = "https://sync-map-backend.onrender.com/login";
      const response = await axios.post(url, signInData, {
        headers: { "Content-Type": "application/json" },
      });

      const { jwtToken } = response.data;
      Cookies.set("jwt_token", jwtToken, { expires: 1});
      localStorage.setItem("username", username);
      handleClose();
      navigate("/"); 
    } catch (error) {
      console.error("Error occurred during sign in:", error);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("Sign-in failed. Please try again.");
      }
    }
  };

  return (
    <Modal
      {...props}
      onHide={handleClose}
      size="lg"
      aria-labelledby="modal-signin"
      centered
    >
      <form onSubmit={handleSignIn}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-signin">Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
          {error && <div className="error_msg">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Sign In</Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
