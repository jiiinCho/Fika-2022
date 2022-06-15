import React, { useEffect, useState, useRef } from "react";
import { LocationT } from "@interface/index";
import fetcher from "@network/fetcher";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<LocationT | undefined>>;
};

export default function Location({ setLocation }: Props) {
  const [locationId, setLocationId] = useState<string>("0");
  const [business, setBusiness] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [autoComplete, setAutoComplete] = useState<boolean>(false);
  let timeoutId: NodeJS.Timeout;
  const waitTime = 750;

  useEffect(() => {
    if (business && street && city && country) {
      setLocation({
        id: locationId,
        business: capitalizeFirstLetter(business),
        street: capitalizeFirstLetter(street),
        city: capitalizeFirstLetter(city),
        country: capitalizeFirstLetter(country),
      });
    }
  }, [locationId, business, street, city, country, setLocation]);

  useEffect(() => {
    async function getSearchResult() {
      const { locations } = await fetcher("/api/searchLocationHandler", {
        business,
      });
      if (locations[0] && business && autoComplete) {
        const { id, business, street, city, country } = locations[0];
        setLocationId(id);
        setBusiness(business);
        setStreet(street);
        setCity(city);
        setCountry(country);
      }
    }
    business && getSearchResult();
  }, [business, locationId, autoComplete]);

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      return;
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setAutoComplete(true);
    }, waitTime);
  };

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
          required={true}
          className={`${
            !business && "input--empty"
          } input p-50 fw-regular text-black`}
          type="text"
          value={business}
          name="business"
          onChange={(e) => {
            setBusiness(e.target.value);
          }}
          placeholder="A.B. Café."
          onKeyDown={() => {
            setAutoComplete(false);
          }}
          onKeyUp={handleOnKeyUp}
        />
      </label>

      <label className="my-auto fs-16 text-black d-block">
        <span className="d-block my-25 fs-14 text-grey">Street</span>
        <input
          required={true}
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
            required={true}
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
            required={true}
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

function capitalizeFirstLetter(sentence: string) {
  const str = sentence.slice(1);
  const firstLetter = sentence.charAt(0).toUpperCase();
  return firstLetter + str;
}
