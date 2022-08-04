import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function PostDeleted() {
  const navigate = useNavigate();

  return (
    <Container style={{ textAlign: "center" }}>
      <h1 style={{ textAlign: "center" }}>Post Deleted</h1>
      <Button
        style={{ margin: "auto" }}
        variant="outline-dark"
        onClick={() => navigate(`/posts`)}
      >
        Go back to Posts
      </Button>
    </Container>
  );
}

export default PostDeleted;
