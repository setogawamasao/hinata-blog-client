import React from "react";
import { DateTime } from "luxon";
import { Blog } from "./Blog";

export const SmartPhoneList: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog, idx) => {
        return (
          <div key={idx} style={{ marginBottom: "0.3rem" }}>
            <Row blog={blog} />
          </div>
        );
      })}
    </>
  );
};

export const Row: React.FC<{ blog: Blog }> = ({ blog }) => {
  console.log(blog.postedAt);
  return (
    <div
      className="card"
      onClick={(): void => {
        window.open(blog.url);
      }}
    >
      <div className="card-content" style={{ padding: "0.5rem" }}>
        <div className={"is-size-6"}>{blog.title}</div>
        <div
          style={{
            textAlign: "right",
          }}
        >
          <span className={"is-size-7"} style={{ marginRight: "0.5rem" }}>
            {DateTime.fromISO(blog.postedAt, {
              setZone: true,
            }).toFormat("yyyy/MM/dd HH:mm")}
          </span>
          <span className={"is-size-7"}>{blog.postedBy}</span>
        </div>
      </div>
    </div>
  );
};
