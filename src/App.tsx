import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { BlogInfo, List } from "./List";

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<BlogInfo[]>([]);

  const getBlogs = async ():Promise<BlogInfo[]> => {  
    const response = await fetch("http://localhost:3001/api/v1/blogs");
    const blogs:BlogInfo[] = await response.json();
    console.log(blogs);
    return blogs 
   };  

  return (
    <>
      <section className="section">
        <div className="container">
          <button
            className="button"
            onClick={async(): Promise<void> => {
              //setIsOpen(true);
              const blogs = await getBlogs();
              setBlogs(blogs)
            }}
          >
           検索
          </button>
          <List blogs={blogs}/>
        </div>
      </section>
      {/* {isOpen && (
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
      )} */}
    </>
  );
};
