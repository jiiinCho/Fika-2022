import React, { useEffect, useState } from "react";
import { LocationT } from "@interface/index";

type Props = {
  getLocationVar: (locationInput: LocationT) => void;
};

export default function Location({ getLocationVar }: Props) {
  const [business, setBusiness] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (business && street && city && country) {
      getLocationVar({ business, street, city, country });
    }
  }, [business, street, city, country, getLocationVar]);

  return (
    <article className="flow fg-75">
      <h5
        className="my-auto fs-16 fw-medium text-black d-block"
        style={{ maxWidth: "300px", marginBottom: "1rem" }}
      >
        Add location
      </h5>
      <label className="my-auto fs-16 text-black d-block">
        <span className="d-block my-25 fs-14 text-grey">Business name</span>
        <input
          className={`${
            !business && "input--empty"
          } input p-50 fw-regular text-black`}
          type="text"
          value={business}
          name="business"
          onChange={(e) => setBusiness(e.target.value)}
          placeholder="A.B.Café."
        />
      </label>

      <label className="my-auto fs-16 text-black d-block">
        <span className="d-block my-25 fs-14 text-grey">Street</span>
        <input
          className={`${
            !street && "input--empty"
          } input p-50 fw-regular text-black`}
          type="text"
          value={street}
          name="location"
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Valborgsmässovägen 34"
        />
      </label>

      <div
        className="flex my-auto"
        style={{ maxWidth: "300px", justifyContent: "space-between" }}
      >
        <label
          className="my-auto fs-16 text-black d-block"
          style={{ maxWidth: "142px" }}
        >
          <span className="d-block my-25 fs-14 text-grey">City</span>
          <input
            className={`${
              !city && "input--empty"
            } input p-50 fw-regular text-black`}
            type="text"
            value={city}
            name="city"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Hägersten"
          />
        </label>
        <label
          className="my-auto fs-16 text-black d-block"
          style={{ maxWidth: "142px" }}
        >
          <span className="d-block my-25 fs-14 text-grey">Country</span>
          <input
            className={`${
              !country && "input--empty"
            } input p-50 fw-regular text-black`}
            type="text"
            value={country}
            name="country"
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Sweden"
          />
        </label>
      </div>
    </article>
  );
}
