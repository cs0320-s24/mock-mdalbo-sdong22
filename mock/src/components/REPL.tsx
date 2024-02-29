import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { REPLFunction } from "./REPLFunction";

/**
 * The top level componenet for REPL. Creates a state for history which is an array of tuples.
 * Creates a state for isVerbose representing the type of mode the user is in.
 * Creates a currCSV state representing the current CSV file, ensuring only 1 csv is accessed at a time.
 */
export default function REPL() {
  const [history, setHistory] = useState<
    [string, string | (string | number)[][]][]
  >([]);
  const [isVerbose, setVerbose] = useState<boolean>(false);
  const [currCSV, setCurrCSV] = useState<string>("");

  return (
    <div className="repl">
      <REPLHistory isVerbose={isVerbose} history={history} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        isVerbose={isVerbose}
        setVerbose={setVerbose}
        currCSV={currCSV}
        setCurrCSV={setCurrCSV}
      />
    </div>
  );
}
