import React, { useEffect, useState } from "react";
import { HierarchyLine } from "./components/HierarchyLine/HierarchyLine";
import { Region, startMirage } from "./server-mock";

if (process.env.NODE_ENV === "development") {
  startMirage();
}

function App() {
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  async function getData() {
    try {
      const res = await fetch("/api/regions", {
        method: "GET",
      });
      setRegions(await res.json());
    } catch (e) {}
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <HierarchyLine
        indexNumber={0}
        opened={openedIds}
        setOpened={setOpenedIds}
        elems={regions}
      />
    </div>
  );
}

export default App;
