import React, { useRef, useState } from "react";

type Props = {
  setRating: React.Dispatch<React.SetStateAction<Number>>;
};

export default function Rating({ setRating }: Props) {
  const [pressed, setPressed] = useState<Array<number>>([0, 0, 0, 0, 0]);

  const handleOnBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const btn = e.target as HTMLButtonElement;
    let curr = getLimit(btn.name);

    if (btn.ariaPressed === "false") {
      setPressed((prev) => {
        const updated = [...prev];
        for (let i = 0; i < curr; i++) {
          updated[i] = 1;
        }
        return updated;
      });
    } else {
      setPressed((prev) => {
        const updated = [...prev];
        for (let i = curr - 1; i < prev.length; i++) {
          updated[i] = 0;
        }
        return updated;
      });
    }

    setRating(pressed.reduce((p, c) => p + c, 0));
  };

  return (
    <label className="my-auto fs-16 fw-medium text-black d-block">
      <span className="d-block my-50">Rating</span>
      <div className="flex">
        <button style={{ display: "none" }}></button>
        <button
          onClick={(e) => handleOnBtnClick(e)}
          className="rating-pressable"
          type="button"
          name="btn1"
          aria-pressed={pressed[0] ? "true" : "false"}
        >
          <span className="sr-only">rating tab</span>
        </button>

        <button
          onClick={(e) => handleOnBtnClick(e)}
          className="rating-pressable"
          type="button"
          name="btn2"
          aria-pressed={pressed[1] ? "true" : "false"}
        >
          <span className="sr-only">rating tab</span>
        </button>

        <button
          onClick={(e) => handleOnBtnClick(e)}
          className="rating-pressable"
          type="button"
          name="btn3"
          aria-pressed={pressed[2] ? "true" : "false"}
        >
          <span className="sr-only">rating tab</span>
        </button>

        <button
          onClick={(e) => handleOnBtnClick(e)}
          className="rating-pressable"
          type="button"
          name="btn4"
          aria-pressed={pressed[3] ? "true" : "false"}
        >
          <span className="sr-only">rating tab</span>
        </button>

        <button
          onClick={(e) => handleOnBtnClick(e)}
          className="rating-pressable"
          type="button"
          name="btn5"
          aria-pressed={pressed[4] ? "true" : "false"}
        >
          <span className="sr-only">rating tab</span>
        </button>
      </div>
    </label>
  );
}

function getLimit(btnName: string) {
  let curr = 0;
  switch (btnName) {
    case "btn1":
      curr = 1;
      break;
    case "btn2":
      curr = 2;
      break;
    case "btn3":
      curr = 3;
      break;
    case "btn4":
      curr = 4;
      break;
    default:
      curr = 5;
  }
  return curr;
}
