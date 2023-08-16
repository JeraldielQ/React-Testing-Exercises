import React, { useState } from "react";
import "./Carousel.css";
import Card from "./Card";

/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
function Carousel({ photos, title }) {
  const total = photos.length;

  const [currCardIdx, setCurrCardIdx] = useState(0);
  const currCard = photos[currCardIdx];

  function goBackward() {
    setCurrCardIdx((currCardIdx - 1 + total) % total);
  }

  function goForward() {
    setCurrCardIdx((currCardIdx + 1) % total);
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        <i
          className={`bi bi-arrow-left-circle${currCardIdx === 0 ? ' hidden' : ''}`}
          onClick={goBackward}
          data-testid="left-arrow"
        />
        <Card
          caption={currCard ? currCard.caption : ''}
          src={currCard ? currCard.src : ''}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        <i
          className={`bi bi-arrow-right-circle${currCardIdx === total - 1 ? ' hidden' : ''}`}
          onClick={goForward}
          data-testid="right-arrow"
        />
      </div>
    </div>
  );
}

export default Carousel;
