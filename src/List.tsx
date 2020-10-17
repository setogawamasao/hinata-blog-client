import React from "react";
import { DateTime } from "luxon";

export const List: React.FC<{ blogs: BlogInfo[] }> = ({ blogs }) => {
  return (
    <table className="table" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th style={{ width: "170px" }}>投稿日</th>
          <th style={{ width: "100px" }}>名前</th>
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

export type BlogInfo = {
  postedAt: string;
  memberName: string;
  blogTitle: string;
  url: string;
};

export const Row: React.FC<{ blog: BlogInfo }> = ({ blog }) => {
  return (
    <tr
      style={{}}
      onClick={(): void => {
        window.open(blog.url);
      }}
    >
      <td>{DateTime.fromISO(blog.postedAt).toFormat("yyyy/MM/dd HH:mm")}</td>
      <td>{blog.memberName}</td>
      <td>{blog.blogTitle}</td>
    </tr>
  );
};
