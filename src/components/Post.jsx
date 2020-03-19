import React from "react";
import { Paper, Typography, IconButton } from "@material-ui/core";
import KeyBoardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyBoardArrowDown from "@material-ui/icons/KeyboardArrowDown";

const Post = ({ post, user, edit }) => {
  return (
    <Paper elevation={3} className="flex justify-between p-2 m-4">
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
          disabled={edit}
        >
          <KeyBoardArrowUp />
        </IconButton>
        <Typography>{post.upvotes}</Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="my-4"
          disabled={edit}
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
