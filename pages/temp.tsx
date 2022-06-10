import React, { useEffect, useState } from "react";

export default function Temp() {
  const [info, setInfo] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`https://final-project-simon.herokuapp.com/myData/dive/koh-haa`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.response);
        const { img, info } = data.response;
        setImage(img);
        setInfo(info);
        setLoading(false);
      });
    // hämta dive med slug dvs API-adressen + /${}
    // setDives(response)
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="main-container">
      {image && <img src={image} alt="beautiful seaside" />}
      {info && <p>{info}</p>}
    </div>
  );
}
