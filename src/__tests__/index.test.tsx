import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading Component", () => {
  it("renders a loading component", () => {
    render(<Loading />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
