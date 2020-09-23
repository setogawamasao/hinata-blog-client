import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <section className="section">
        <div className="container">
          <button
            className="button"
            onClick={(): void => {
              setIsOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faFilter} size={"1x"} />
          </button>
          <table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "100px" }}>投稿日</th>
                <th style={{ width: "100px" }}>名前</th>
                <th style={{ width: "auto" }}>タイトル</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2020/01/01</td>
                <td>金村美玖</td>
                <td>XXXXXXXXXX</td>
              </tr>
              <tr>
                <td>2020/01/02</td>
                <td>松田好花</td>
                <td>YYYYYYYYYY</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {isOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">検索条件を入力してください</p>
              <button
                className="delete"
                aria-label="close"
                onClick={(): void => {
                  setIsOpen(false);
                }}
              />
            </header>
            <section className="modal-card-body">AAA</section>
            <footer className="modal-card-foot">
              <button
                className="button"
                style={{ margin: "0  auto" }}
                onClick={(): void => {
                  setIsOpen(false);
                }}
              >
                検索
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
