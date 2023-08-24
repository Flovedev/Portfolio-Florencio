import React, { useEffect, useRef } from "react";

const STAR_COLOR = "#fff";
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

const StarfieldComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let scale = 1;
  let width = window.innerWidth;
  let height = window.innerHeight;

  let stars: { x: number; y: number; z: number }[] = [];

  let pointerX: number | null = null;
  let pointerY: number | null = null;

  let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

  let touchInput = false;

  const generate = () => {
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: 0,
        y: 0,
        z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
      });
    }
  };

  const placeStar = (star: { x: number; y: number; z: number }) => {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  };

  const recycleStar = (star: { x: number; y: number; z: number }) => {
    let direction = "z";

    let vx = Math.abs(velocity.x),
      vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
      let axis;

      if (vx > vy) {
        axis = Math.random() < vx / (vx + vy) ? "h" : "v";
      } else {
        axis = Math.random() < vy / (vx + vy) ? "v" : "h";
      }

      if (axis === "h") {
        direction = velocity.x > 0 ? "l" : "r";
      } else {
        direction = velocity.y > 0 ? "t" : "b";
      }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === "z") {
      star.z = 0.1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    } else if (direction === "l") {
      star.x = -OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "r") {
      star.x = width + OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "t") {
      star.x = width * Math.random();
      star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === "b") {
      star.x = width * Math.random();
      star.y = height + OVERFLOW_THRESHOLD;
    }
  };

  const resize = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    scale = window.devicePixelRatio || 1;

    width = window.innerWidth * scale;
    height = window.innerHeight * scale;

    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      stars.forEach(placeStar);
    }
  };

  const update = () => {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;

    stars.forEach((star) => {
      star.x += velocity.x * star.z;
      star.y += velocity.y * star.z;

      star.x += (star.x - width / 2) * velocity.z * star.z;
      star.y += (star.y - height / 2) * velocity.z * star.z;
      star.z += velocity.z;

      // recycle when out of bounds
      if (
        star.x < -OVERFLOW_THRESHOLD ||
        star.x > width + OVERFLOW_THRESHOLD ||
        star.y < -OVERFLOW_THRESHOLD ||
        star.y > height + OVERFLOW_THRESHOLD
      ) {
        recycleStar(star);
      }
    });
  };

  const renderStars = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, width, height);

    stars.forEach((star) => {
      context.beginPath();
      context.lineCap = "round";
      context.lineWidth = STAR_SIZE * star.z * scale; // Use STAR_SIZE
      context.globalAlpha = 0.5 + 0.5 * Math.random();
      context.strokeStyle = STAR_COLOR; // Use STAR_COLOR

      context.beginPath();
      context.moveTo(star.x, star.y);

      var tailX = velocity.x * 2,
        tailY = velocity.y * 2;

      if (Math.abs(tailX) < 0.1) tailX = 0.5;
      if (Math.abs(tailY) < 0.1) tailY = 0.5;

      context.lineTo(star.x + tailX, star.y + tailY);

      context.stroke();
    });
  };

  const step = () => {
    update();
    renderStars();
    requestAnimationFrame(step);
  };

  const movePointer = (x: number, y: number, isTouch?: boolean) => {
    if (typeof pointerX === "number" && typeof pointerY === "number") {
      let ox = x - pointerX,
        oy = y - pointerY;

      velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
      velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
    }

    pointerX = x;
    pointerY = y;
  };

  const onMouseMove = (event: MouseEvent) => {
    touchInput = false;

    movePointer(event.clientX, event.clientY);
  };

  const onTouchMove = (event: TouchEvent) => {
    touchInput = true;

    movePointer(event.touches[0].clientX, event.touches[0].clientY, true);

    event.preventDefault();
  };

  const onMouseLeave = () => {
    pointerX = null;
    pointerY = null;
  };

  useEffect(() => {
    generate();
    resize(canvasRef);
    step();

    const handleResize = () => {
      resize(canvasRef);
    };

    const handleMouseMove = (event: MouseEvent) => {
      onMouseMove(event);
    };

    const handleTouchMove = (event: TouchEvent) => {
      onTouchMove(event);
    };

    const handleTouchEnd = () => {
      onMouseLeave();
    };

    const handleMouseLeave = () => {
      onMouseLeave();
    };

    window.addEventListener("resize", handleResize);
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
      canvasRef.current.addEventListener("touchmove", handleTouchMove);
      canvasRef.current.addEventListener("touchend", handleTouchEnd);
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
        canvasRef.current.removeEventListener("touchmove", handleTouchMove);
        canvasRef.current.removeEventListener("touchend", handleTouchEnd);
      }
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="starfield-container">
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default StarfieldComponent;
