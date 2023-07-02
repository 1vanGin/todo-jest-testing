import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { List } from "src/components/List";
import {
  deleteTask,
  filterIsActive,
  tasksSelector,
  toggleTask,
} from "src/store/taskSlice";

export const TaskList = () => {
  const items = useSelector(tasksSelector);
  const justActive = useSelector(filterIsActive);
  const dispatch = useDispatch();

  const filteredItems = justActive ? items.filter((item) => item.done) : items;

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  return items.length > 0 ? (
    <List
      items={filteredItems}
      onDelete={handleDelete}
      onToggle={handleToggle}
    />
  ) : (
    <Empty />
  );
};
