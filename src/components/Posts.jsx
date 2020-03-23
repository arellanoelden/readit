import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import Post from "./Post";
import PostForm from "./PostForm";

const Posts = () => {
  const userContext = useContext(UserContext);
  const bearerToken = userContext.userToken;
  const user = userContext.user;

  const [posts, setPosts] = useState();

  useEffect(() => {
    if (!posts) {
      getPosts();
    }
  }, [posts]);

  async function getPosts() {
    const response = await fetch("http://localhost:3000/api/posts", {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const postsResponse = await response.json();
    setPosts(postsResponse.data);
  }

  if (!posts) return <div>posts</div>;
  return (
    <div>
      <PostForm getPosts={getPosts} />
      {posts.map(post => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
