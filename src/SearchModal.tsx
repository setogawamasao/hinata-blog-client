import React from "react";

import { members1, members2, members3 } from "./members";
import { DateSelector } from "./DateSelector";
import { Blog } from "./Blog";

export const SearchModal: React.FC<{
  members: string[];
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
  dateFrom: Date | undefined;
  setDateFrom: React.Dispatch<React.SetStateAction<Date | undefined>>;
  dateTo: Date | undefined;
  setDateTo: React.Dispatch<React.SetStateAction<Date | undefined>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  showNumber: number;
  setShowNumber: React.Dispatch<React.SetStateAction<number>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  getBlogs: (
    members?: string[],
    dateFrom?: Date | undefined,
    dateTo?: Date | undefined,
    title?: string,
    showNumber?: number,
    sort?: string
  ) => Promise<Blog[]>;
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  close: () => void;
}> = ({
  members,
  setMembers,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  title,
  setTitle,
  showNumber,
  setShowNumber,
  sort,
  setSort,
  getBlogs,
  setBlogs,
  close,
}) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">検索条件</p>
          <button
            className="delete"
            aria-label="close"
            onClick={close}
          ></button>
        </header>
        <section className="modal-card-body">
          <div>
            <span style={{ marginRight: "1rem" }}>表示件数</span>
            <input
              type="number"
              style={{ width: "10%" }}
              value={showNumber}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setShowNumber(Number(event.target.value));
              }}
            />
          </div>
          <div>
            <span style={{ marginRight: "1rem" }}>並び順(投稿日)</span>
            <span className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="sort"
                  checked={sort === "asc"}
                  onChange={() => {
                    setSort("asc");
                  }}
                />
                昇順
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="sort"
                  checked={sort === "desc"}
                  onChange={() => {
                    setSort("desc");
                  }}
                />
                降順
              </label>
            </span>
          </div>
          <hr style={{ margin: "0.2rem 0" }} />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {members1.map((member, idx) => {
              return (
                <div style={{ marginBottom: "0.3rem" }} key={idx}>
                  <MemberCheckBox
                    value={member.code}
                    caption={member.name}
                    checkedMembers={members}
                    setCheckedMembers={setMembers}
                  />
                </div>
              );
            })}
          </div>
          <hr style={{ margin: "0.2rem 0" }} />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {members2.map((member, idx) => {
              return (
                <div style={{ marginBottom: "0.3rem" }} key={idx}>
                  <MemberCheckBox
                    value={member.code}
                    caption={member.name}
                    checkedMembers={members}
                    setCheckedMembers={setMembers}
                  />
                </div>
              );
            })}
          </div>
          <hr style={{ margin: "0.2rem 0" }} />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {members3.map((member, idx) => {
              return (
                <div style={{ marginBottom: "0.3rem" }} key={idx}>
                  <MemberCheckBox
                    value={member.code}
                    caption={member.name}
                    checkedMembers={members}
                    setCheckedMembers={setMembers}
                  />
                </div>
              );
            })}
          </div>
          <div>投稿日</div>
          <DateSelector
            startYear={2016}
            initialDate={new Date("2016-01-01T00:00:00")}
            date={dateFrom}
            setDate={setDateFrom}
          />
          ~
          <DateSelector
            startYear={2016}
            initialDate={new Date()}
            date={dateTo}
            setDate={setDateTo}
          />
          <div>タイトル</div>
          <input
            type="text"
            style={{ width: "100%" }}
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
          />
        </section>
        <footer className="modal-card-foot">
          <button
            className="button"
            style={{ width: "100%" }}
            onClick={async (): Promise<void> => {
              const blogs = await getBlogs(
                members,
                dateFrom,
                dateTo,
                title,
                showNumber,
                sort
              );
              setBlogs(blogs);
              close();
            }}
          >
            検索
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
        checked={checkedMembers.includes(value)}
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
