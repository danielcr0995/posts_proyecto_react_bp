import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function PostCreateUpdateModal(props) {
  const { title, post, onSave } = props;
  const [postContent, setPostContent] = useState({});
  useEffect(() => {
    setPostContent(post);
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setPostContent((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    onSave(postContent);
    props.onHide();
  };
  // console.log(postContent);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="field">
          <Form.Label className="label">Title</Form.Label>
          <Form.Text className="control">
            <Form.Control
              className="input"
              type="text"
              name="title"
              value={postContent?.title}
              onChange={handleChange}
            />
          </Form.Text>
        </Form.Group>

        <Form.Group className="field">
          <Form.Label className="label">Content</Form.Label>
          <Form.Text className="control">
            <Form.Control
              as="textarea"
              type="text"
              name="body"
              style={{ height: "150px" }}
              value={postContent?.body}
              onChange={handleChange}
            />
          </Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={props.onHide}>
          Close
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostCreateUpdateModal;
