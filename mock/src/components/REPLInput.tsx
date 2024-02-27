import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPLFunction";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: [string, string | (string | number)[][]][];
  setHistory: Dispatch<
    SetStateAction<[string, string | (string | number)[][]][]>
  >;
  isVerbose: boolean;
  setVerbose: Dispatch<SetStateAction<boolean>>;
  currCSV: string;
  setCurrCSV: Dispatch<SetStateAction<string>>;
}

export function REPLInput(props: REPLInputProps) {
  // Example CSV Json
  const data1: (string | number)[][] = [
    [1, 2, 3, 4, 5],
    ["The", "song", "remains", "the", "same."],
  ];
  const data2: (string | number)[][] = [
    [10, 9, 8, 7],
    ["Second", "CSV", "file"],
    ["bka"],
  ];

  // Map of CSVs
  const nameToCSV: Map<string, (string | number)[][]> = new Map([
    ["csv1", data1],
    ["csv2", data2],
  ]);

  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const mode: REPLFunction = (args: Array<string>): string | string[][] => {
    if (props.isVerbose == true) {
      props.setVerbose(false);
    } else {
      props.setVerbose(true);
    }
    return "mode";
  };

  const load: REPLFunction = (args: Array<string>): String | String[][] => {
    return "error go away";
  };

  const view: REPLFunction = (args: Array<string>): String | String[][] => {
    return "error go away";
  };
  // Map from command to function
  const commandToFunction: Map<string, REPLFunction> = new Map([
    ["mode", mode],
  ]);
  const handleLoad = (name: string): string => {
    if (nameToCSV.has(name)) {
      props.setCurrCSV(name);
      return "succesfully loaded: " + name;
    } else {
      return "sorry file does not exists in map";
    }
  };

  const handleSubmit = () => {
    const parsedCommand: string[] = commandString.split(" ", 2);
    setCount(count + 1);

    // Check Map for parsedCommand[0]
    if (commandToFunction.has(parsedCommand[0])) {
      const func: REPLFunction = commandToFunction.get(parsedCommand[0])!;
      func(parsedCommand);
    }

    if (parsedCommand[0] == "mode") {
      // mode(parsedCommand);
    } else if (parsedCommand[0] == "load_csv") {
      const output: string = handleLoad(parsedCommand[1]);
      props.setHistory([...props.history, [commandString, output]]);
    } else if (parsedCommand[0] == "view") {
      const output: (string | number)[][] | undefined = nameToCSV.get(
        props.currCSV
      );
      if (output !== undefined) {
        props.setHistory([...props.history, [commandString, output]]);
      }
    } else if (parsedCommand[0] == "search") {
      // props.setHistory([
      //   ...props.history,
      //   [nameToCSV.get(props.currCSV), commandString],
      // ]);
    } else {
      props.setHistory([...props.history, ["result", commandString]]);
    }
    setCommandString("");
  };

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={handleSubmit}>Submitted {count} times</button>
    </div>
  );
}
