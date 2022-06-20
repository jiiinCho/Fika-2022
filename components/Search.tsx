import React, { useState, useEffect, useRef, useCallback } from "react";
import { ISearch, ILocation } from "@components/icons";
import { NotFound, Footer } from "@components/index";
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
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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

  const onSubmit = useCallback(
    (locationId: string) => {
      onReset();
      locationId ? router.push(`/search/${locationId}`) : setError(true);
    },
    [router]
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
          onSubmit(locationId);
          break;
      }
    },
    [locationMeta, onMetaSelect, locationId, onSubmit]
  );

  const onReset = () => {
    setError(false);
    setBusiness("");
    setCity("");
    setLocationId("");
    setLocationMeta([]);
    setMetaIndex(0);
  };

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

  useEffect(() => {
    const currBusinessName = business.split(",")[0];
    if (listRef.current) {
      const arr = listRef.current.childNodes;
      arr.forEach((listElem) => {
        const btnElem = listElem.firstChild as HTMLButtonElement;
        btnElem.value === currBusinessName
          ? btnElem.setAttribute("aria-pressed", "true")
          : btnElem.setAttribute("aria-pressed", "false");
      });
    }
  }, [business]);

  if (error) {
    return (
      <div className={`bg-white-95 ${s.alert}`}>
        <div className="grid">
          <h1 className="fs-28 fw-medium my-100">{`Sorry, we couldn't find "${business}"`}</h1>
          <button className="btn-primary uppercase" onClick={onReset}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className={s.form}>
      <label className="input input-search flex">
        <span className="sr-only">Search Cafe by name</span>
        <ISearch color="icon-primary" />
        <input
          autoComplete="off"
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
          autoComplete="off"
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
          <ul ref={listRef} className="select p-25 m-0">
            {locationMeta.map((meta) => {
              const { id, business, street, city } = meta;
              return (
                <li key={id} className="mb-25">
                  <button
                    aria-pressed="false"
                    value={business}
                    type="button"
                    className={`p-50 fw-regular text-black ${s.btn}`}
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
