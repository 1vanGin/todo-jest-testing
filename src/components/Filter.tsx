import React from "react";
import FilterIcon from "src/icons/filter.png";
import { useDispatch, useSelector } from "react-redux";
import {
  filterIsActive,
  tasksSelector,
  toggleFilter,
} from "src/store/taskSlice";

export const Filter = () => {
  const items = useSelector(tasksSelector);
  const justActive = useSelector(filterIsActive);
  const dispatch = useDispatch();

  if (items.length === 0) return null;

  return (
    <div className="filter-wrapper">
      Показывать только выполненные задачи:
      <button
        onClick={() => dispatch(toggleFilter())}
        className={`button button-with-icon filter ${
          justActive === true ? "active" : ""
        }`}
        data-testid="filter-button"
      >
        <img src={FilterIcon} alt="Только выполненные задачи" />
      </button>
    </div>
  );
};
