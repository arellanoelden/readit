import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import Post from "./Post";

const UserPosts = () => {
  const userContext = useContext(UserContext);
  const bearerToken = userContext.userToken;
  const user = userContext.user;

  const [posts, setPosts] = useState();

  useEffect(() => {
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

    if (user && bearerToken) {
      getUserPosts();
    }
  }, [user, bearerToken]);

  if (!posts) return <div>posts</div>;
  return (
    <div>
      {posts.map(post => {
        return (
          <Post
            key={post._id}
            post={post}
            user={user}
            edit={true}
            bearerToken={bearerToken}
          />
        );
      })}
    </div>
  );
};

export default UserPosts;
