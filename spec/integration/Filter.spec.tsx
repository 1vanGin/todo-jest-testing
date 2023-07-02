import { render, screen } from "@testing-library/react";
import { App } from "src/App";
import ue from "@testing-library/user-event";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Список задач", () => {
  it("пустой, и кнопка фильтра отсутствует", async () => {
    render(<App />);

    const filterBtn = screen.queryByTestId("filter-button");
    const items = screen.queryByRole("list");

    expect(items).not.toBeInTheDocument();
    expect(filterBtn).not.toBeInTheDocument();
  });

  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it("с включенным фильтром", async () => {
    render(<App />);

    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByAltText(/Добавить/i);

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, "Первый заголовок");
    await userEvent.click(addBtnEl);

    await userEvent.type(inputEl, "Второй заголовок");
    await userEvent.click(addBtnEl);

    const firstElem = screen.getByRole("checkbox", {
      name: /Первый заголовок/i,
    });
    const secondElem = screen.getByRole("checkbox", {
      name: /Второй заголовок/i,
    });
    // выполняем первый todo
    await userEvent.click(firstElem);

    const filterBtn = screen.getByTestId("filter-button");
    // активируем фильтр
    await userEvent.click(filterBtn);

    const items = screen.getAllByRole("listitem");

    // Фильтр активирован
    expect(filterBtn).toHaveClass("active");
    // из 2 элементов после фильтрации показывается только 1
    expect(items).toHaveLength(1);
    // "Второй заголовок" отсутсвует
    expect(secondElem).not.toBeInTheDocument();
  });

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it("с выключенным фильтром", async () => {
    render(<App />);

    const filterBtn = screen.getByTestId("filter-button");
    // отключем фильтр
    await userEvent.click(filterBtn);

    const items = screen.getAllByRole("listitem");

    // Фильтр деактивирован
    expect(filterBtn).not.toHaveClass("active");
    // Показываются оба элемента
    expect(items).toHaveLength(2);
  });
});
