import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch("https://codebuddy.review/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="rounded-lg bg-white p-7 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {post.firstName} {post.lastName}
                </h2>
              </div>
              <img
                src={post.avatar}
                alt={`${post.firstName} ${post.lastName}`}
                className="h-16 w-16 rounded-full"
              />
            </div>
            <img src={post.image} alt={post.writeup} className="mb-3 w-full rounded-lg" />
            <p className="text-gray-700">{post.writeup}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
