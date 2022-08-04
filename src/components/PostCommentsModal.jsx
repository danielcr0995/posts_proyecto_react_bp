import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function PostCommentsModal(props) {
  //   const [comments, setComments] = useState([]);
  const { comments, posttitle } = props;

  const commentsList = comments.map((com) => {
    return (
      <div key={com.id}>
        <h4>{com.name}</h4>
        <p>
          <span style={{ fontWeight: "300" }}>{com.email}</span>
        </p>
        <p>{com.body}</p>
      </div>
    );
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Comments from post: <p style={{ fontWeight: "400" }}>{posttitle}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{commentsList}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostCommentsModal;
