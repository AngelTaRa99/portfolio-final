import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatusDot from "./StatusDot";
import TechChip from "./TechChip";
import TerminalPanel from "./TerminalPanel";
import PromptLine from "./PromptLine";
import BlinkingCursor from "./BlinkingCursor";

describe("StatusDot", () => {
  it("usa clases según variante", () => {
    const { rerender } = render(<StatusDot variant="success" />);
    expect(screen.getByTestId("status-dot")).toHaveClass("bg-success");
    rerender(<StatusDot variant="active" />);
    expect(screen.getByTestId("status-dot")).toHaveClass("bg-primary");
    rerender(<StatusDot />);
    expect(screen.getByTestId("status-dot")).toHaveClass("bg-muted-foreground");
  });
});

describe("TechChip", () => {
  it("renderiza la etiqueta", () => {
    render(<TechChip label="Next.js" />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });
});

describe("TerminalPanel", () => {
  it("muestra title-bar con ruta, título y children", () => {
    render(
      <TerminalPanel title="inicio" path="~/">
        <p>contenido</p>
      </TerminalPanel>
    );
    expect(screen.getByText("~/")).toBeInTheDocument();
    expect(screen.getByText("inicio")).toBeInTheDocument();
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });
});

describe("PromptLine", () => {
  it("prefija el prompt $", () => {
    const { container } = render(<PromptLine>whoami</PromptLine>);
    expect(container).toHaveTextContent("$");
    expect(screen.getByText("whoami")).toBeInTheDocument();
  });
});

describe("BlinkingCursor", () => {
  it("renderiza un cursor con clase blink", () => {
    const { container } = render(<BlinkingCursor />);
    expect(container.querySelector(".cursor-blink")).not.toBeNull();
  });
});
