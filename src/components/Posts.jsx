import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton
} from "@material-ui/core";
import KeyBoardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyBoardArrowDown from "@material-ui/icons/KeyboardArrowDown";

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

  async function upvote(post, increment = 1) {
    await fetch(`http://localhost:3000/api/posts/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`
      },
      body: JSON.stringify({
        upvotes: post.upvotes + increment
      })
    });

    await fetch(`http://localhost:3000/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`
      },
      body: JSON.stringify({
        upvotedPosts: [post._id, ...user.upvotedPosts]
      })
    });
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
          <Paper
            key={post._id}
            elevation={3}
            className="flex justify-between p-2 m-4"
          >
            <section>
              <Typography variant="h2" className="my-2">
                {post.title}
              </Typography>
              {user && user.upvotedPosts.includes(post._id) ? "UPVOTED" : ""}
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className="my-4"
                onClick={() => upvote(post)}
                disabled={!user}
              >
                <KeyBoardArrowUp />
              </IconButton>
              <Typography>{post.upvotes}</Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className="my-4"
                onClick={() => upvote(post)}
                disabled={!user}
              >
                <KeyBoardArrowDown />
              </IconButton>
              <Typography>{post.textContent}</Typography>
              <Typography>by {post.createdBy.username}</Typography>
            </section>
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="w-1/5" />
            )}
          </Paper>
        );
      })}
    </div>
  );
};

export default Posts;
