import React, { createContext, useEffect, useState } from "react";

const PostContext = createContext();

function PostProvider(props) {
  const [postList, setPostList] = useState([]);
  const [deletedPost, setDeletedPost] = useState({});
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [modalCommentsShow, setModalCommentsShow] = useState(false);
  const [editedPost, setEditedPost] = useState({
    userId: 1,
    title: "",
    body: "",
  });
  const [modalEditShow, setModalEditShow] = useState(false);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPostList(data));
  }, []);

  const deletePost = async (id) => {
    console.log("Deleting", id);
    setPostList((prev) => {
      return prev.filter((post) => {
        return post.id !== id;
      });
    });
    // console.log(postList.length);
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    setModalDeleteShow(true);
    setDeletedPost(postList[id - 1]);
  };

  const viewComments = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setComments(data));
    setModalCommentsShow(true);
  };

  // const editPost = async (id) => {
  //   console.log("Editing", id);
  //   const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  //   await fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => setEditedPost(data));
  //   setModalEditShow(true);
  // };
  const editPost2 = async (post) => {
    console.log("Editing", post.id);
    // const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    // await fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => setEditedPost(data));
    setModalEditShow(true);
    setEditedPost(post);
  };
  const saveEditedPost = async (post) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${post.id}`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      // .then((data) => console.log("received data", data));
      .then((data) => setEditedPost(data));
    //   .then((json) => {
    //     postList[postList.findIndex((p) => p.id === post.id)].title =
    //       json.title;
    //     postList[postList.findIndex((p) => p.id === post.id)].body = json.body;
    //   });
    console.log("edited post", editedPost);
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

  const contextElems = {
    postList: postList,
    setPostList: setPostList,
    deletePost: deletePost,
    deletedPost: deletedPost,
    modalDeleteShow: modalDeleteShow,
    setModalDeleteShow: setModalDeleteShow,
    viewComments: viewComments,
    comments: comments,
    modalCommentsShow: modalCommentsShow,
    setModalCommentsShow: setModalCommentsShow,
    editPost: editPost2,
    editedPost: editedPost,
    modalEditShow: modalEditShow,
    setModalEditShow: setModalEditShow,
    saveEditedPost: saveEditedPost,
    saveNewPost: saveNewPost,
  };
  return (
    <PostContext.Provider value={contextElems}>
      {props.children}
    </PostContext.Provider>
  );
}

export { PostProvider };
export default PostContext;
