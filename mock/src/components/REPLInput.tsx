import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { Mock } from "./Mock";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: [string, string][];
  setHistory: Dispatch<SetStateAction<[string, string][]>>;
  isVerbose: boolean;
  setVerbose: Dispatch<SetStateAction<boolean>>;
  mock: Mock;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0); // highly recommended to include type in <>
  // TODO WITH TA : add a count state

  // TODO WITH TA: build a handleSubmit function called in button onClick
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   *
   */

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
      const output: string = props.mock.loadCsv(parsedCommand[1]);
      props.setHistory([...props.history, [output, commandString]]);
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
