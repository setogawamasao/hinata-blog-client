import React, { useEffect, useState } from "react";
// import { Blog, List } from "./List";
import { Blog, SmartPhoneList } from "./SmartPhoneList";
import { SearchModal } from "./SearchModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";

export const App: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const blogs = await getBlogs();
      setBlogs(blogs);
    };
    console.log("call");
    fetch();
  }, []);

  const getBlogs = async (
    members?: string[],
    dateFrom?: Date | undefined,
    dateTo?: Date | undefined,
    title?: string
  ): Promise<Blog[]> => {
    let queryString = "?";

    let membersCondition = "";
    if (members && members.length) {
      members.forEach((member) => {
        membersCondition = `${membersCondition}&postedBy[]=${member}`;
      });
      queryString = `${queryString}&${membersCondition}`;
    }

    let dateFromCondition = "";
    if (dateFrom) {
      dateFromCondition = `dateFrom=${DateTime.fromISO(
        dateFrom.toISOString()
      ).toFormat("yyyy/MM/dd")}`;
      queryString = `${queryString}&${dateFromCondition}`;
    }

    let dateToCondition = "";
    if (dateTo) {
      dateToCondition = `dateTo=${DateTime.fromISO(
        dateTo.toISOString()
      ).toFormat("yyyy/MM/dd")}`;
      queryString = `${queryString}&${dateToCondition}`;
    }

    let titleCondition = "";
    if (title) {
      titleCondition = `title=${title}`;
      queryString = `${queryString}&${titleCondition}`;
    }

    const apiUrl = `http://34.219.139.226/hinata-blogs-api/blogs/search${queryString}`;
    const response = await fetch(apiUrl);
    const blogs: Blog[] = await response.json();
    return blogs;
  };

  return (
    <>
      <section className="section" style={{ padding: "1rem" }}>
        <div className="container">
          <div style={{ display: "table" }}>
            <div
              style={{
                fontSize: "2rem",
                display: "table-cell",
                verticalAlign: "middle",
              }}
            >
              おひさまブログ
            </div>
            <div
              style={{
                display: "table-cell",
                width: "10%",
                verticalAlign: "middle",
                textAlign: "right",
              }}
            >
              <button
                className="button"
                onClick={(): void => {
                  setIsOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faFilter} size={"1x"} />
              </button>
            </div>
          </div>
          <SmartPhoneList blogs={blogs} />
          {/* <List blogs={blogs} /> */}
        </div>
      </section>
      {isOpen && (
        <SearchModal getBlogs={getBlogs} setBlogs={setBlogs} close={close} />
      )}
    </>
  );
};
