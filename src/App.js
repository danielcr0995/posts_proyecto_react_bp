import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import PostList from "./components/PostList";
import Post from "./components/Post";
import PostDeleted from "./components/PostDeleted";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="posts" element={<PostList />}></Route>
            <Route path="posts/:postId" element={<Post />}></Route>
            <Route path="post-deleted" element={<PostDeleted />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
