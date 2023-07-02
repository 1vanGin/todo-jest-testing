import { render, screen } from "@testing-library/react";
import { List } from "src/components/List";

const onDelete = jest.fn();
const onToggle = jest.fn();

const items: Task[] = [
  {
    id: "1",
    header: "Очень длинное название на 32 сим",
    done: false,
  },
  {
    id: "2",
    header: "купить молоко",
    done: false,
  },
  {
    id: "3",
    header: "выгулять собаку",
    done: false,
  },
  {
    id: "4",
    header: "задача 4",
    done: false,
  },
  {
    id: "5",
    header: "задача 5",
    done: false,
  },
  {
    id: "6",
    header: "задача 6",
    done: false,
  },
  {
    id: "7",
    header: "задача 7",
    done: false,
  },
  {
    id: "8",
    header: "задача 8",
    done: false,
  },
  {
    id: "9",
    header: "задача 9",
    done: false,
  },
  {
    id: "10",
    header: "задача 10",
    done: false,
  },
  {
    id: "11",
    header: "задача 11",
    done: true,
  },
];

it("отображение списка задач", () => {
  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );
  const firstRender = asFragment();

  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("список содержит не больше 10 невыполненных задач", () => {
  render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

  const allItems = screen.getAllByRole("listitem");
  expect(allItems.length).toBeLessThanOrEqual(10);
});

it("название не должно быть больше 32 символов", () => {
  render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

  const allItems = screen.getAllByRole("listitem");
  allItems.forEach((item) => {
    expect(item.textContent!.length).toBeLessThanOrEqual(32);
  });
});

it("название не должно быть пустым", () => {
  render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

  const allItems = screen.getAllByRole("listitem");
  allItems.forEach((item) => {
    expect(item.textContent).not.toBe("");
  });
});

it("нельзя удалять невыполненные задачи", () => {
  render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);

  const allItems = screen.getAllByRole("listitem");
  allItems.forEach((item) => {
    const checkbox = item.querySelector("input");
    const btnEl = item.querySelector("button");

    expect(checkbox).not.toHaveAttribute("checked");
    expect(btnEl).toHaveAttribute("disabled");
  });
});
