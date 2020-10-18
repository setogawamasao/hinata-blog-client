import React from "react";
import { DateTime } from "luxon";

export type Blog = {
  postedAt: string;
  postedBy: string;
  title: string;
  url: string;
};

export const List: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {
  return (
    <table className="table" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th style={{ width: "148px" }}>投稿日</th>
          <th style={{ width: "110px" }}>名前</th>
          <th style={{ width: "auto" }}>タイトル</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog, idx) => {
          return <Row blog={blog} key={idx} />;
        })}
      </tbody>
    </table>
  );
};

export const Row: React.FC<{ blog: Blog }> = ({ blog }) => {
  return (
    <tr
      style={{}}
      onClick={(): void => {
        window.open(blog.url);
      }}
    >
      <td>{DateTime.fromISO(blog.postedAt).toFormat("yyyy/MM/dd HH:mm")}</td>
      <td>{blog.postedBy}</td>
      <td>{blog.title}</td>
    </tr>
  );
};
