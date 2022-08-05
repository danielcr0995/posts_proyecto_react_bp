import React, { useContext, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import PostItem from "./PostItem";
import PostDeleteModal from "./PostDeleteModal";
import PostCommentsModal from "./PostCommentsModal";
import PostCreateUpdateModal from "./PostCreateUpdateModal";
import PostContext from "../context/PostContext";

function PostList() {
  const [modalCreateShow, setModalCreateShow] = useState(false);
  // const [postList, setPostList] = useState([]);

  const {
    postList,
    setPostList,
    deletePost,
    deletedPost,
    modalDeleteShow,
    setModalDeleteShow,
    viewComments,
    comments,
    modalCommentsShow,
    setModalCommentsShow,
    editPost,
    editedPost,
    modalEditShow,
    setModalEditShow,
    saveEditedPost,
    saveNewPost,
  } = useContext(PostContext);

  console.log("before changing", editedPost);

  const postItems = postList.map((post) => {
    return (
      <PostItem
        key={post.id}
        // id={post.id}
        // title={post.title}
        // body={post.body}
        post={post}
        onDelete={deletePost}
        onEdit={editPost}
        onViewComments={viewComments}
      />
    );
  });

  // useEffect(() => {
  // if (
  //   Object.keys(editedPost).length === 0 &&
  //   Object.keys(postList).length === 0
  // ) {
  const postIndex = postList?.findIndex((post) => post?.id === editedPost?.id);
  console.log(postIndex);
  if (postIndex >= 0) {
    //   // console.log(postIndex);
    postList[postIndex].title = editedPost?.title;
    postList[postIndex].body = editedPost.body;
    console.log("after changing", editedPost);
    // setPost(editedPost);
  }
  // }, [editedPost]);
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
