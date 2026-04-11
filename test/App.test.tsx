/**
 * @vitest-environment jsdom
 */

import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Block from "../src/Block";

describe("Block", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders blank block", () => {
    const elementProps = {
      id: "test-blank-block",
      className: "bg-slate-100",
    };

    const { container } = render(<Block {...elementProps} />);

    const allDivs = container.querySelectorAll("div");
    expect(allDivs.length).toStrictEqual(1); // We only ask to render one block
    expect(allDivs[0]).toBeInTheDocument();
    expect(allDivs[0]).toBeEmptyDOMElement();
    expect(allDivs[0].id).toBe("test-blank-block");
  });

  it("renders non-blank block", () => {
    const children = "2";
    const elementProps = {
      id: "test-non-blank-block",
      className: "bg-orange-400",
    };

    const { container } = render(<Block {...elementProps}>{children}</Block>);
    const allDivs = container.querySelectorAll("div");
    expect(allDivs.length).toStrictEqual(1); // We only ask to render one block
    expect(allDivs[0]).toBeInTheDocument();
    expect(allDivs[0]).not.toBeEmptyDOMElement();
    expect(allDivs[0].innerHTML).toStrictEqual(children);
    expect(allDivs[0].id).toBe(elementProps.id);
  });
});
