import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import PostItem from "./PostItem";
import PostDeleteModal from "./PostDeleteModal";
import PostCommentsModal from "./PostCommentsModal";
import PostCreateUpdateModal from "./PostCreateUpdateModal";

function PostList() {
  const [postList, setPostList] = useState([]);
  const [deletedPost, setDeletedPost] = useState({});
  const [editedPost, setEditedPost] = useState({});
  const [comments, setComments] = useState([]);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalCommentsShow, setModalCommentsShow] = useState(false);
  const [modalCreateShow, setModalCreateShow] = useState(false);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPostList(data));
  }, []);

  async function deletePost(id) {
    console.log("Deleting", id);
    setPostList((prev) => {
      return prev.filter((post) => {
        return post.id !== id;
      });
    });
    console.log(postList.length);
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    setModalDeleteShow(true);
    setDeletedPost(postList[id - 1]);
  }

  async function viewComments(id) {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setComments(data));
    setModalCommentsShow(true);
  }

  const editPost = async (id) => {
    console.log("Editing", id);
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setEditedPost(data));
    setModalEditShow(true);
  };

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
        postList[postList.findIndex((p) => p.id === post.id)].title =
          json.title;
        postList[postList.findIndex((p) => p.id === post.id)].body = json.body;
      });
  };

  const saveNewPost = (post) => {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setPostList([json, ...postList]));
  };
  const postItems = postList.map((post) => {
    return (
      <PostItem
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        onDelete={deletePost}
        onEdit={editPost}
        onViewComments={viewComments}
      />
    );
  });
  return (
    <>
      <Container>
        <h1 style={{ textAlign: "center" }}>Post List</h1>
        <Button variant="primary" onClick={() => setModalCreateShow(true)}>
          <RateReviewOutlinedIcon className="me-2" />
          New Post
        </Button>
        <Table striped style={{ textAlign: "left" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{postItems}</tbody>
        </Table>
        <PostDeleteModal
          show={modalDeleteShow}
          onHide={() => setModalDeleteShow(false)}
          deletedPost={deletedPost}
        />
        <PostCommentsModal
          show={modalCommentsShow}
          onHide={() => setModalCommentsShow(false)}
          comments={comments}
          posttitle={postList[comments[0]?.postId - 1]?.title}
        />
        {/* to create a new post */}

        <PostCreateUpdateModal
          show={modalCreateShow}
          onHide={() => setModalCreateShow(false)}
          post={{ userId: 1, title: "", body: "" }}
          title={"Creating post"}
          onSave={saveNewPost}
        />

        {/* to update a new post */}
        <PostCreateUpdateModal
          show={modalEditShow}
          onHide={() => setModalEditShow(false)}
          post={editedPost}
          title={"Editing post"}
          onSave={saveEditedPost}
        />
      </Container>
    </>
  );
}

export default PostList;
