import React from "react";
import { DateTime } from "luxon";

export type Blog = {
  postedAt: string;
  postedBy: string;
  title: string;
  url: string;
};

export const SmartPhoneList: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog, idx) => {
        return (
          <div style={{ marginBottom: "0.3rem" }}>
            <Row blog={blog} key={idx} />
          </div>
        );
      })}
    </>
  );
};

export const Row: React.FC<{ blog: Blog }> = ({ blog }) => {
  return (
    <div
      className="card"
      onClick={(): void => {
        window.open(blog.url);
      }}
    >
      <div className="card-content" style={{ padding: "0.5rem" }}>
        <div className={"is-size-6"}>{blog.title}</div>

        <span className={"is-size-7"} style={{ marginRight: "0.5rem" }}>
          {DateTime.fromISO(blog.postedAt).toFormat("yyyy/MM/dd HH:mm")}
        </span>
        <span className={"is-size-7"}>{blog.postedBy}</span>
      </div>
    </div>
  );
};
