import React, { useState } from "react";
import { Blog, List } from "./List";

export const App: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlogs = async (): Promise<Blog[]> => {
    //const apiUrl = "http://localhost:3001/api/blogs/search";
    const apiUrl = "http://34.219.139.226/hinata-blogs-api/blogs/search";
    const response = await fetch(apiUrl);
    const blogs: Blog[] = await response.json();
    return blogs;
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <button
            className="button"
            onClick={async (): Promise<void> => {
              const blogs = await getBlogs();
              setBlogs(blogs);
            }}
          >
            検索
          </button>
          <List blogs={blogs} />
        </div>
      </section>
    </>
  );
};
