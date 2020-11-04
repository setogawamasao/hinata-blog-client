import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

import { members1, members2, members3 } from "./members";
import { DateSelector } from "./DateSelector";
import { Blog } from "./Blog";

export const SearchModal: React.FC<{
  getBlogs: (
    members?: string[],
    dateFrom?: Date | undefined,
    dateTo?: Date | undefined,
    title?: string
  ) => Promise<Blog[]>;
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  close: () => void;
}> = ({ getBlogs, setBlogs, close }) => {
  const [checkedMembers, setCheckedMembers] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [titleInput, setTitleInput] = useState<string>("");

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
          <DateSelector
            startYear={2016}
            defaultDate={new Date("2016-02-01T00:00:00")}
            setDate={setDateFrom}
          />
          ~
          <DateSelector
            startYear={2016}
            defaultDate={new Date()}
            setDate={setDateTo}
          />
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
          <div style={{ margin: "0 auto" }}>
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
          </div>
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
