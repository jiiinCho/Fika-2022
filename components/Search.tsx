import React, { useState, useEffect, useRef, useCallback } from "react";
import { ISearch, ILocation } from "@components/icons";
import { useRouter } from "next/router";
import fetcher from "@network/fetcher";
import { LocationT } from "@interface/index";
import s from "@styles/components/Search.module.css";

export default function Search() {
  const [locationId, setLocationId] = useState<string>("");
  const [business, setBusiness] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [locationMeta, setLocationMeta] = useState<LocationT[]>([]);
  const [metaIndex, setMetaIndex] = useState<number>(0);

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const onFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let variable = undefined;
    if (e.target.name === "searchByName") {
      setBusiness(e.target.value);
      variable = e.target.value && { business: e.target.value };
    } else {
      setCity(e.target.value);
      variable = e.target.value && { city: e.target.value };
    }
    if (variable) {
      const { locations } = await fetcher(
        "/api/searchLocationHandler",
        variable
      );
      locations[0] && setLocationMeta(locations);
    } else {
      setLocationMeta([]);
    }
  };

  const onMetaSelect = useCallback(
    (id: string) => {
      if (locationMeta.length) {
        const found = locationMeta.find((meta) => meta.id === id);
        if (found) {
          const { id: locationId, business, street, city } = found;
          setLocationId(locationId);
          setBusiness(`${business}, ${street}`);
          setCity(city);
        }
      }
    },
    [locationMeta]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          setMetaIndex((prev) => {
            if (prev <= locationMeta.length - 1) {
              onMetaSelect(locationMeta[prev].id);
              return prev + 1;
            } else {
              onMetaSelect(locationMeta[locationMeta.length - 1].id);
              return locationMeta.length - 1;
            }
          });
          break;
        case "ArrowUp":
          setMetaIndex((prev) => {
            if (prev > 0) {
              onMetaSelect(locationMeta[prev - 1].id);
              return prev - 1;
            } else {
              onMetaSelect(locationMeta[0].id);
              return 0;
            }
          });
          break;
        case "Enter":
          router.push(`/search/${locationId}`);
          break;
      }
    },
    [locationMeta, onMetaSelect, locationId, router]
  );

  useEffect(() => {
    const formRefInstance = formRef.current;
    if (formRefInstance) {
      formRefInstance.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (formRefInstance) {
        formRefInstance.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleKeyDown]);

  return (
    <form ref={formRef} className={s.form}>
      <label className="input input-search flex">
        <span className="sr-only">Search Cafe by name</span>
        <ISearch color="icon-primary" />
        <input
          className={`fw-regular fs-16 text-accent ${s.input}`}
          type="text"
          placeholder="Search"
          name="searchByName"
          onChange={onFilter}
          value={business}
        />
      </label>
      <label className="input input-search flex">
        <span className="sr-only">Search by location</span>
        <ILocation color="icon-primary" />
        <input
          className={`fw-regular fs-16 text-accent ${s.input}`}
          type="text"
          placeholder="City"
          name="searchByLocation"
          onChange={onFilter}
          value={city}
        />
      </label>
      <div style={{ position: "relative" }}>
        {!!locationMeta.length && (
          <ul className="select p-25 m-0">
            {locationMeta.map((meta) => {
              const { id, business, street, city } = meta;
              return (
                <li key={id} className="mb-25">
                  <button
                    type="button"
                    value={business}
                    className="p-50 fw-regular text-black"
                    onClick={() => onMetaSelect(id)}
                  >
                    {business}, {street}, {city}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </form>
  );
}
