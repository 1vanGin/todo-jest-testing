import { render, screen } from "@testing-library/react";
import { Notifier } from "src/components/Notifier";
import * as taskSliceModule from "src/store/taskSlice";
import { JestStoreProvider } from "../utils/JestStoreProvider";

describe("Оповещение при выполнении задачи", () => {
  const notification = "Задача выполнена";
  const spied = jest
    .spyOn(taskSliceModule, "getNotification")
    .mockReturnValue(notification);
  const onClose = jest.fn();

  it("появляется и содержит заголовок задачи", async () => {
    render(<Notifier open={true} onClose={onClose} task={notification} />, {
      wrapper: JestStoreProvider,
    });

    jest.runAllTimers();
    const notifierEl = screen.getByText(notification);

    expect(notifierEl).toBeInTheDocument();
    expect(notifierEl.textContent).toBe(notification);
  });
  it("одновременно может отображаться только одно", () => {
    render(<Notifier open={true} onClose={onClose} task={notification} />, {
      wrapper: JestStoreProvider,
    });
    const notifierElements = screen.getAllByText(notification);
    expect(notifierElements.length).toBe(1);
  });
});
