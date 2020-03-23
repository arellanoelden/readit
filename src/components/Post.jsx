import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { Paper, Typography, IconButton } from "@material-ui/core";
import KeyBoardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyBoardArrowDown from "@material-ui/icons/KeyboardArrowDown";

const Post = ({ post }) => {
  const userContext = useContext(UserContext);
  const bearerToken = userContext.userToken;
  const user = userContext.user;

  async function upvote(post) {
    let increment = 1;
    let downvotedPosts = user.downvotedPosts;
    if (user.downvotedPosts.includes(post._id)) {
      increment = 2;
      downvotedPosts = user.downvotedPosts.filter(
        downvotedPost => downvotedPost !== post._id
      );
    }
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
        upvotedPosts: [...user.upvotedPosts, post._id],
        downvotedPosts: downvotedPosts
      })
    });
    userContext.getUser();
  }

  async function downvote(post) {
    let decrement = 1;
    let upvotedPosts = user.upvotedPosts;
    if (user.upvotedPosts.includes(post._id)) {
      decrement = 2;
      upvotedPosts = user.upvotedPosts.filter(
        upvotedPost => upvotedPost !== post._id
      );
    }
    await fetch(`http://localhost:3000/api/posts/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`
      },
      body: JSON.stringify({
        upvotes: post.upvotes - decrement
      })
    });

    await fetch(`http://localhost:3000/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`
      },
      body: JSON.stringify({
        downvotedPosts: [...user.downvotedPosts, post._id],
        upvotedPosts: upvotedPosts
      })
    });
    userContext.getUser();
  }

  const upvoted = user && user.upvotedPosts.includes(post._id);
  const downvoted = user && user.downvotedPosts.includes(post._id);
  return (
    <Paper elevation={3} className="flex justify-between p-2 m-4">
      <section>
        <Typography variant="h2" className="my-2">
          {post.title}
        </Typography>

        <IconButton
          edge="start"
          color={upvoted ? "primary" : "inherit"}
          className="my-4"
          onClick={() => upvote(post)}
        >
          <KeyBoardArrowUp />
        </IconButton>
        <Typography>{post.upvotes}</Typography>
        <IconButton
          edge="start"
          color={downvoted ? "primary" : "inherit"}
          className="my-4"
          onClick={() => downvote(post)}
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
};

export default Post;
