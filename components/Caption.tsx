import React, { useState } from "react";

type Props = {
  setCaption: React.Dispatch<React.SetStateAction<string>>;
};

export default function Caption({ setCaption }: Props) {
  const [message, setMessage] = useState<string>("");
  const [alert, setAlert] = useState(false);

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const count = message.length;
    if (count > 270) {
      setAlert(true);
    } else {
      setAlert(false);
      setCaption(e.target.value);
    }
    setMessage(e.target.value);
  };

  return (
    <label className="my-auto fs-16 fw-medium text-black d-block">
      <span className="d-block my-50">Caption</span>
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
      {alert && (
        <p className="fs-14 fw-light text-accent">
          Caption cannot exceed 270 letters.
        </p>
      )}
    </label>
  );
}
