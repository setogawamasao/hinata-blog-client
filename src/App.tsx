import React, { useState } from "react";
// import { Blog, List } from "./List";
import { Blog, SmartPhoneList } from "./SmartPhoneList";
import { SearchModal } from "./SearchModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export const App: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <span className={"is-size-3"}>おひさまブログ</span>
          <button
            className="button"
            onClick={(): void => {
              setIsOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faFilter} size={"1x"} />
          </button>
          <SmartPhoneList blogs={blogs} />
          {/* <List blogs={blogs} /> */}
        </div>
      </section>
      {isOpen && <SearchModal setBlogs={setBlogs} close={close} />}
    </>
  );
};
