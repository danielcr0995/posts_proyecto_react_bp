import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Stack from "react-bootstrap/Stack";
import PostCommentsModal from "./PostCommentsModal";
import PostCreateUpdateModal from "./PostCreateUpdateModal";

function Post() {
  const [post, setPost] = useState();
  const { postId } = useParams();
  const [editedPost, setEditedPost] = useState({});
  const [comments, setComments] = useState([]);
  const [modalCommentsShow, setModalCommentsShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [postId]);

  const handleDelete = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    });
    navigate(`/post-deleted`);
  };

  async function viewComments(id) {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setComments(data));
    setModalCommentsShow(true);
  }

  const saveEditedPost = (post) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${post.id}`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then((json) => {
        post.title = json.title;
        post.body = json.body;
      });
  };

  const editPost = async (id) => {
    console.log("Editing", id);
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setEditedPost(data));
    setModalEditShow(true);
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Post</h1>
      <Stack direction="horizontal" gap={2} className="mb-2">
        <Button variant="outline-primary" onClick={() => viewComments(postId)}>
          Comments
        </Button>
        <Button variant="outline-secondary" onClick={() => editPost(postId)}>
          <ModeEditOutlinedIcon />
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          <DeleteOutlineOutlinedIcon />
        </Button>
      </Stack>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
      <PostCommentsModal
        show={modalCommentsShow}
        onHide={() => setModalCommentsShow(false)}
        comments={comments}
        posttitle={post?.title}
      />
      <PostCreateUpdateModal
        show={modalEditShow}
        onHide={() => setModalEditShow(false)}
        post={editedPost}
        title={"Editing post"}
        onSave={saveEditedPost}
      />
    </Container>
  );
}

export default Post;
