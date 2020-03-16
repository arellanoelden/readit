import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";

const Posts = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:3000/api/posts", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const postsResponse = await response.json();
      setPosts(postsResponse.data);
    }

    if (!posts) {
      getPosts();
    }
  }, [posts]);
  if (!posts) return <div>Posts</div>;
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
              <Typography>{post.textContent}</Typography>
            </section>
            <img src={post.imageUrl} alt={post.title} className="w-1/5" />
          </Paper>
        );
      })}
    </div>
  );
};

export default Posts;
