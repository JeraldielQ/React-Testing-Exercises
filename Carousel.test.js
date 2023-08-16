import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

const samplePhotos = [
  { src: "image1.jpg", caption: "Image 1" },
  { src: "image2.jpg", caption: "Image 2" },
];

it("renders without crashing", function () {
  render(<Carousel photos={samplePhotos} />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Carousel photos={samplePhotos} />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByAltText, queryByTestId } = render(<Carousel photos={samplePhotos} />);

  expect(queryByAltText("Image 1")).toBeInTheDocument();
  expect(queryByAltText("Image 2")).not.toBeInTheDocument();

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  expect(queryByAltText("Image 1")).not.toBeInTheDocument();
  expect(queryByAltText("Image 2")).toBeInTheDocument();
});

it("hides and shows arrows appropriately", function () {
  const { getByTestId } = render(<Carousel photos={samplePhotos} />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});

it("works when you click on the left arrow", function () {
  const { getByTestId, queryByAltText } = render(<Carousel photos={samplePhotos} />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  fireEvent.click(rightArrow);

  fireEvent.click(leftArrow);
  expect(queryByAltText("Image 1")).toBeInTheDocument();
  expect(queryByAltText("Image 2")).not.toBeInTheDocument();
});
