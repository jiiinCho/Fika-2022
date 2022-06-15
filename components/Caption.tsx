import React, { useState } from "react";

type Props = {
  setCaption: React.Dispatch<React.SetStateAction<string>>;
};

export default function Caption({ setCaption }: Props) {
  const [message, setMessage] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [alert, setAlert] = useState(false);

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(message.length);
    if (message.length > 269) {
      setAlert(true);
      const str = e.target.value;
      setMessage(str.slice(0, 269));
    } else {
      setAlert(false);
      setCaption(e.target.value);
      setMessage(e.target.value);
    }
  };

  return (
    <label
      className="my-auto fs-16 fw-medium text-black d-block"
      htmlFor="caption"
    >
      <div
        className="flex"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <span className="d-block my-50">Caption</span>
        <span className="d-block my-50 fs-14 fw-light">
          <span className="text-accent">{count}</span> / 270
        </span>
      </div>
      <textarea
        required={true}
        rows={5}
        className={`${
          !message && "input--empty"
        } input input--textarea p-50 fw-regular`}
        value={message}
        name="caption"
        onChange={onMessageChange}
      />
      <p
        className={`${
          alert ? "text-accent" : "text-white"
        } fs-14 fw-light my-25`}
      >
        Caption cannot exceed 270 letters.
      </p>
    </label>
  );
}
