import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";

import { Blog } from "./Blog";
import { SearchModal } from "./SearchModal";
import { PcList } from "./PcList";
import { SmartPhoneList } from "./SmartPhoneList";
import { BrowserView, MobileView } from "react-device-detect";

export const App: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [title, setTitle] = useState<string>("");
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [showNumber, setShowNumber] = useState<number>(100);
  const [sort, setSort] = useState<string>("asc");

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const blogs = await getBlogs();
      setBlogs(blogs);
    };
    fetch();
  }, []);

  const getBlogs = async (
    members?: string[],
    dateFrom?: Date | undefined,
    dateTo?: Date | undefined,
    title?: string,
    showNumber: number = 100,
    sort: string = "asc"
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

    const apiUrl = `http://34.219.139.226/hinata-blogs-api/blogs/search${queryString}&showNumber=${showNumber}&sort=${sort}`;
    const response = await fetch(apiUrl);
    const blogs: Blog[] = await response.json();
    return blogs;
  };

  return (
    <>
      <section className="section" style={{ padding: "1rem" }}>
        <div className="container">
          <div style={{ display: "table", width: "100%" }}>
            <div
              style={{
                fontSize: "2rem",
                display: "table-cell",
                width: "90%",
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
          <MobileView>
            <SmartPhoneList blogs={blogs} />
          </MobileView>
          <BrowserView>
            <PcList blogs={blogs} />
          </BrowserView>
        </div>
      </section>
      {isOpen && (
        <SearchModal
          members={members}
          setMembers={setMembers}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          title={title}
          setTitle={setTitle}
          showNumber={showNumber}
          setShowNumber={setShowNumber}
          sort={sort}
          setSort={setSort}
          getBlogs={getBlogs}
          setBlogs={setBlogs}
          close={close}
        />
      )}
    </>
  );
};
