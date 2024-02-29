import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPLFunction";
import { commands } from "./Commands";

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
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  // Create Map from command to function from commands function
  const commandToFunction: Map<string, REPLFunction> = commands(
    props.isVerbose,
    props.setVerbose,
    props.currCSV,
    props.setCurrCSV
  );

  const handleSubmit = () => {
    const parsedCommand: string[] = commandString.split(" ", 2);
    setCount(count + 1);

    // Check Map for parsedCommand[0]
    if (commandToFunction.has(parsedCommand[0])) {
      const func: REPLFunction = commandToFunction.get(parsedCommand[0])!;
      props.setHistory([
        ...props.history,
        [commandString, func(parsedCommand)],
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
