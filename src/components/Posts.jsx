import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { TextField, Button } from "@material-ui/core";
import Post from "./Post";

const Posts = () => {
  const userContext = useContext(UserContext);
  const bearerToken = userContext.userToken;
  const user = userContext.user;

  const [posts, setPosts] = useState();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [textContent, setTextContent] = useState("");

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

  async function createPost(e) {
    e.preventDefault();
    await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`
      },
      body: JSON.stringify({
        title,
        textContent,
        imageUrl,
        createdBy: user._id
      })
    });

    getPosts();
  }

  if (!posts) return <div>posts</div>;
  return (
    <div>
      {bearerToken && (
        <form
          noValidate
          autoComplete="off"
          onSubmit={e => createPost(e)}
          className="p-8 flex flex-col w-full"
        >
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="my-4"
          />
          <TextField
            label="ImageUrl"
            variant="outlined"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className="my-4"
          />
          <TextField
            label="Text"
            variant="outlined"
            value={textContent}
            onChange={e => setTextContent(e.target.value)}
            className="my-4"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="my-4"
          >
            Create Post
          </Button>
        </form>
      )}
      {posts.map(post => {
        return (
          <Post
            key={post._id}
            post={post}
            user={user}
            bearerToken={bearerToken}
          />
        );
      })}
    </div>
  );
};

export default Posts;
