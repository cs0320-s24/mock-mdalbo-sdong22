import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { Mock } from "./Mock";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: [string, string][];
  setHistory: Dispatch<SetStateAction<[string, (string | number)[][]][]>>;
  isVerbose: boolean;
  setVerbose: Dispatch<SetStateAction<boolean>>;
  currCSV: string;
  setCurrCSV: Dispatch<SetStateAction<string>>;
}

export function REPLInput(props: REPLInputProps) {
  const nameToCSV: Map<string, (string | number)[][]> = new Map([
    [
      "csv1",
      [
        [1, 2, 3, 4, 5],
        ["The", "song", "remains", "the", "same."],
      ],
    ],
    ["csv2", [[10, 9, 8, 7], ["Second", "CSV", "file"], ["bka"]]],
  ]);

  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0); // highly recommended to include type in <>

  const handleLoad = (name: string): string => {
    if (name in nameToCSV) {
      props.setCurrCSV(name);
      return "succesfully loaded: " + name;
    } else {
      return "sorry file does not exists in map";
    }
  };

  const handleSubmit = () => {
    const parsedCommand: string[] = commandString.split(" ", 2);
    setCount(count + 1);
    if (parsedCommand[0] == "mode") {
      if (props.isVerbose == true) {
        props.setVerbose(false);
      } else {
        props.setVerbose(true);
      }
    } else if (parsedCommand[0] == "load_csv") {
      const output: string = handleLoad(parsedCommand[1]);
      props.setHistory([...props.history, [output, commandString]]);
    } else if (parsedCommand[0] == "view") {
    } else if (parsedCommand[0] == "search") {
      props.setHistory([
        ...props.history,
        [nameToCSV.get(props.currCSV), commandString],
      ]);
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
