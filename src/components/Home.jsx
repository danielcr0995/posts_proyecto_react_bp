import React from "react";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <h1>Pichincha Post</h1>
        <Button variant="secondary" onClick={() => navigate("/posts")}>
          View Posts
        </Button>
      </div>
    </Container>
  );
}

export default Home;
