import React, { useState } from "react";
import { DateTime } from "luxon";

import { members1, members2, members3 } from "./members";
import { DateSelector } from "./DateSelector";
import { Blog } from "./List";

export const SearchModal: React.FC<{
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  close: () => void;
}> = ({ setBlogs, close }) => {
  const [checkedMembers, setCheckedMembers] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [titleInput, setTitleInput] = useState<string>("");

  const getBlogs = async (
    members: string[],
    dateFrom: Date | undefined,
    dateTo: Date | undefined,
    title: string
  ): Promise<Blog[]> => {
    //const apiUrl = "http://localhost:3001/api/blogs/search";
    let queryString = "?";

    let membersCondition = "";
    if (members.length) {
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
    <div className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">検索条件</p>
        </header>
        <section className="modal-card-body">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {members1.map((member, idx) => {
              return (
                <div style={{ marginBottom: "0.3rem" }}>
                  <MemberCheckBox
                    key={idx}
                    value={member.code}
                    caption={member.name}
                    checkedMembers={checkedMembers}
                    setCheckedMembers={setCheckedMembers}
                  />
                </div>
              );
            })}
          </div>
          <hr style={{ margin: "0.2rem 0" }} />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {members2.map((member, idx) => {
              return (
                <div style={{ marginBottom: "0.3rem" }}>
                  <MemberCheckBox
                    key={idx}
                    value={member.code}
                    caption={member.name}
                    checkedMembers={checkedMembers}
                    setCheckedMembers={setCheckedMembers}
                  />
                </div>
              );
            })}
          </div>
          <hr style={{ margin: "0.2rem 0" }} />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {members3.map((member, idx) => {
              return (
                <div style={{ marginBottom: "0.3rem" }}>
                  <MemberCheckBox
                    key={idx}
                    value={member.code}
                    caption={member.name}
                    checkedMembers={checkedMembers}
                    setCheckedMembers={setCheckedMembers}
                  />
                </div>
              );
            })}
          </div>
          <div>投稿日</div>
          <DateSelector startYear={2016} setDate={setDateFrom} />
          ~
          <DateSelector startYear={2016} setDate={setDateTo} />
          <div>タイトル</div>
          <input
            type="text"
            style={{ width: "100%" }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitleInput(event.target.value);
            }}
          />
        </section>
        <footer className="modal-card-foot">
          <button
            className="button"
            onClick={async (): Promise<void> => {
              const blogs = await getBlogs(
                checkedMembers,
                dateFrom,
                dateTo,
                titleInput
              );
              setBlogs(blogs);
              close();
            }}
          >
            検索
          </button>
          <button className="button" onClick={close}>
            閉じる
          </button>
        </footer>
      </div>
    </div>
  );
};

const MemberCheckBox: React.FC<{
  value: string;
  caption: string;
  checkedMembers: string[];
  setCheckedMembers: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ value, caption, checkedMembers, setCheckedMembers }) => {
  return (
    <label className="checkbox" style={{ margin: "0 0.2rem" }}>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let bufMembers: string[] = [];
          if (event.target.checked) {
            checkedMembers.push(event.target.value);
            bufMembers = checkedMembers.slice();
          } else {
            bufMembers = checkedMembers.filter((member) => {
              return member !== event.target.value;
            });
          }
          setCheckedMembers(bufMembers);
        }}
        type="checkbox"
        value={value}
      />
      <span style={{ marginLeft: "0.2rem" }}>{caption}</span>
    </label>
  );
};
