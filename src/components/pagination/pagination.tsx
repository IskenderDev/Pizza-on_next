import React from "react";
import styles from "./pagination.module.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        &lt;
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={page === index + 1 ? styles.active : ""}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
