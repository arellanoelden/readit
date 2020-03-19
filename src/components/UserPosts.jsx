import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { Paper, Typography, IconButton } from "@material-ui/core";
import KeyBoardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyBoardArrowDown from "@material-ui/icons/KeyboardArrowDown";

const UserPosts = () => {
  const userContext = useContext(UserContext);
  const bearerToken = userContext.userToken;
  const user = userContext.user;

  const [posts, setPosts] = useState();
  console.log("User: ", user);

  useEffect(() => {
    if (user && bearerToken) {
      getUserPosts();
    }
  }, [user, bearerToken]);

  async function getUserPosts() {
    const response = await fetch(
      `http://localhost:3000/api/posts?user=${user._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`
        }
      }
    );
    const postsResponse = await response.json();
    setPosts(postsResponse.data);
  }

  if (!posts) return <div>posts</div>;
  return (
    <div>
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
                disabled
              >
                <KeyBoardArrowUp />
              </IconButton>
              <Typography>{post.upvotes}</Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className="my-4"
                disabled
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

export default UserPosts;
