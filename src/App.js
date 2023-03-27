import React, { useState } from "react";
import "./App.css";
const MAX_IMAGE_AMOUNT = 53;

const displayImages = () => {
  let count = 1;
  const images = [],
      basePath =
          "https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/medium/00";
  while (count <= MAX_IMAGE_AMOUNT) {
    let countNumber = count;
    if (count < 10) {
      countNumber = "0" + count;
    }
    images.push({
      src: `${basePath}${countNumber}.png`,
      class: "image",
      alt: count,
      index: count
    });
    count++;
  }

  return images;
};

export default function App() {
  const [images] = useState(displayImages());
  const [imageIndex, setImageIndex] = useState(0);
  const [y, setY] = useState(0);

  const [scrollDirection, setScrollDirection] = useState("down");
  const maxImageIndex = MAX_IMAGE_AMOUNT - 1;

  const onScrollHandler = (event) => {
    const scrollY = event.currentTarget.scrollTop;

    if (scrollY === 0) {
      setImageIndex(0);
    }

    if (y > scrollY) {
      setScrollDirection("up");
    } else if (y < scrollY) {
      setScrollDirection("down");
    }
    setY(scrollY);

    showImage();
  };

  const showImage = () => {
    setImageIndex((prev) => {
      if (scrollDirection === "up" && !(prev <= 1)) {
        return prev - 1;
      }
      if (scrollDirection === "down" && !(prev >= maxImageIndex)) {
        return prev + 1;
      }
      return prev;
    });
  };

  const getClassName = (index) => {
    if (index === 1 && imageIndex === 0) {
      return ["visible"];
    }

    return index === imageIndex ? "visible" : "image";
  };

  return (
      <div className="App" onScroll={onScrollHandler}>
        <div id="image-container">
          {images.map((im) => (
              <img className={getClassName(im.index)} src={im.src} alt={im.alt} />
          ))}
        </div>
        {[...Array(100)].map((_, index) => (
            <p key={index}>
              <br />
            </p>
        ))}
      </div>
  );
}
