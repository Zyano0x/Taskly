import React, { useState } from "react";
import { useSearchParams } from "react-router";
import { IoCheckmarkDoneOutline, IoSearchOutline } from "react-icons/io5";

import styles from "./Filter.module.css";
import { useUpdateTasks } from "../../features/tasks/useUpdateTasks.ts";

const Filter: React.FC = () => {
  const { updateTasks, isUpdatingTasks } = useUpdateTasks();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("status") || "all";
  const [keyword, setKeyword] = useState<string>("");

  function handleUpdateTasks() {
    updateTasks({
      taskData: { isCompleted: true },
      condition: { isCompleted: false },
    });
  }

  function handleSearch() {
    ["page"].forEach((param) => searchParams.delete(param));

    if (keyword) {
      searchParams.set("search", keyword);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }

  function handleFilter(e: React.ChangeEvent) {
    searchParams.set("status", (e.currentTarget as HTMLSelectElement).value);
    if (searchParams.has("page")) {
      searchParams.set("page", String(1));
    }
    setSearchParams(searchParams);
  }

  return (
    <section className={styles["section-filter"]}>
      <div>
        <button
          className={styles["btn-completed"]}
          onClick={handleUpdateTasks}
          disabled={isUpdatingTasks}
        >
          Mark All Completed <IoCheckmarkDoneOutline />
        </button>
      </div>
      <div className={styles["filter-container"]}>
        <div>
          <label htmlFor="filter" hidden={true}>
            Filter Text
          </label>
          <select
            id={"filter"}
            className={styles["filter-dropdown"]}
            value={currentFilter}
            onChange={(e: React.ChangeEvent) => handleFilter(e)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Not Completed</option>
          </select>
        </div>
        <div className={styles["search-container"]}>
          <label htmlFor="search" hidden={true}>
            Search
          </label>
          <input
            id={"search"}
            name="search"
            type="text"
            placeholder="Search"
            className={styles["search-input"]}
            onChange={(e: React.ChangeEvent) =>
              setKeyword((e.currentTarget as HTMLInputElement).value)
            }
          />
          <button className={styles["search-button"]} onClick={handleSearch}>
            <IoSearchOutline />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Filter;
