import React, { Dispatch, SetStateAction } from "react";
import { Region } from "../../server-mock";
import classes from "./HierarchyLine.module.css";
import { ReactComponent as ChevronDownIcon } from "../../assets/ChevronDown.svg";
import { ReactComponent as MapIcon } from "../../assets/Map.svg";

interface Props {
  elems: Region[];
  opened: number[];
  setOpened: Dispatch<SetStateAction<number[]>>;
  indexNumber: number;
  id?: number;
}

export const HierarchyLine: React.FC<Props> = (props) => {
  const { elems, indexNumber, setOpened, opened, id } = props;

  const parsedPaths = elems.filter((elem) => {
    const splitElems = elem.path.split(".");
    return (
      splitElems.length === indexNumber + 1 &&
      (id ? Number(splitElems[indexNumber - 1]) === id : true)
    );
  });

  function onClickHandler() {
    setOpened((prev) =>
      isOpened
        ? prev.filter((elem) => elem !== id)
        : typeof id === "number"
        ? [...prev, id]
        : prev
    );
  }

  const elem = elems.find((elem) => elem.id === id);
  const isRoot = typeof id !== "number";
  const isOpened = Boolean(isRoot || opened.find((elem) => elem === id));

  return (
    <div className={classes.rootHierarchyLine}>
      {!isRoot && (
        <div onClick={onClickHandler}>
          <span style={{ transform: "translateY(4px)" }}>
            <ChevronDownIcon
              style={{
                transform: isOpened ? undefined : "rotate(-90deg)",
                fontSize: "12px",
              }}
            />
          </span>
          <MapIcon
            style={{
              margin: "0 15px",
              transform: "translateY(2px)",
              color: "#5f74a4",
            }}
          />
          {elem?.name}
        </div>
      )}
      {isOpened &&
        parsedPaths.map((elem) => (
          <HierarchyLine
            key={elem.id}
            id={elem.id}
            elems={elems}
            opened={opened}
            setOpened={setOpened}
            indexNumber={indexNumber + 1}
          />
        ))}
    </div>
  );
};
