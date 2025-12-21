import { useState } from "react";

const ImageMagnifier = ({
  src,
  className,
  width,
  height,
  alt,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 3,
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  const setImageSize = (el) => {
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
  };

  // 🖱 Mouse
  const mouseEnter = (e) => {
    setImageSize(e.currentTarget);
    setShowMagnifier(true);
  };

  const mouseLeave = () => {
    setShowMagnifier(false);
  };

  const mouseMove = (e) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();

    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    setXY([x, y]);
  };

  // 📱 Touch
  const touchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const el = e.currentTarget;

    setImageSize(el);
    setShowMagnifier(true);

    const { top, left } = el.getBoundingClientRect();
    setXY([
      touch.pageX - left - window.scrollX,
      touch.pageY - top - window.scrollY,
    ]);
  };

  const touchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();

    setXY([
      touch.pageX - left - window.scrollX,
      touch.pageY - top - window.scrollY,
    ]);
  };

  const touchEnd = () => {
    setShowMagnifier(false);
  };

  return (
    <div className="relative inline-block">
      <img
        src={src}
        className={className}
        width={width}
        height={height}
        alt={alt}
        style={{
          height,
          touchAction: "none", // 🔴 THIS is mandatory
        }}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      />

      <div
        style={{
          display: showMagnifier ? "block" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: magnifierHeight,
          width: magnifierWidth,
          border: "1px solid lightgrey",
          borderRadius: "5px",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          top: y - magnifierHeight / 2,
          left: x - magnifierWidth / 2,
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      />
    </div>
  );
};

export default ImageMagnifier;
