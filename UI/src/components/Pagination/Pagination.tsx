import React from "react";
import { useSearchParams } from "react-router";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import styles from "./Pagination.module.css";
import { PAGE_SIZE } from "../../utils/constants.ts";

interface IPagination {
  count: number;
  pages: number;
}

const Pagination: React.FC<IPagination> = ({ count, pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  function nextPage() {
    const next = currentPage === pages ? currentPage : currentPage + 1;
    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  if (pages <= 1) return null;

  return (
    <>
      <div className={styles["pagination-container"]}>
        <p className={styles["pagination-info"]}>
          Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
          <span>{currentPage === pages ? count : currentPage * PAGE_SIZE}</span>{" "}
          of <span>{count}</span> results
        </p>
        <div className={styles["pagination-buttons"]}>
          <button
            className={styles["pagination-button"]}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <HiChevronLeft />
            <span>Prev</span>
          </button>
          <button
            className={styles["pagination-button"]}
            onClick={nextPage}
            disabled={currentPage === pages}
          >
            <span>Next</span>
            <HiChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
