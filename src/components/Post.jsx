import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Stack from "react-bootstrap/Stack";
import PostCommentsModal from "./PostCommentsModal";
import PostCreateUpdateModal from "./PostCreateUpdateModal";
import PostContext from "../context/PostContext";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState();

  const navigate = useNavigate();

  const {
    viewComments,
    comments,
    modalCommentsShow,
    setModalCommentsShow,
    editPost,
    editedPost,
    modalEditShow,
    setModalEditShow,
    saveEditedPost,
  } = useContext(PostContext);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [postId]);

  const handleDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    navigate(`/post-deleted`);
  };

  // const saveEditedPost = (post) => {
  //   const url = `https://jsonplaceholder.typicode.com/posts/${post.id}`;
  //   fetch(url, {
  //     method: "PUT",
  //     body: JSON.stringify(post),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  //   // .then((json) => {
  //   //   post.title = json.title;
  //   //   post.body = json.body;
  //   // });
  // };

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
        <Button variant="outline-danger" onClick={() => handleDelete(postId)}>
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
