import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPLFunction";
import { commands } from "./Commands";

interface REPLInputProps {
  history: [string, string | (string | number)[][]][];
  setHistory: Dispatch<
    SetStateAction<[string, string | (string | number)[][]][]>
  >;
  isVerbose: boolean;
  setVerbose: Dispatch<SetStateAction<boolean>>;
  currCSV: string;
  setCurrCSV: Dispatch<SetStateAction<string>>;
}

/**
 * REPLInput component. Provides functionality when the submit button is pressed. Attempts to run a corresponding
 * function based on user input. Creates states for commandString which represents the user inputted string.
 * Also creates a count state to represent how many times the submit button was clicked.
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  // Initializes a Map of command to REPLFunction by calling the commands function
  const commandToFunction: Map<string, REPLFunction> = commands(
    props.isVerbose,
    props.setVerbose,
    props.currCSV,
    props.setCurrCSV
  );

  /**
   * Ran when Submit button is clicked. The user's input is split via spaces and accepts a maximum of 5 split elements
   * to protect against users adding an excessive number of arguments. The input is processed and if the commandToFunction
   * map contains thhe corresponding REPLFunction. If the function is found, its output is added to history.
   */
  const handleSubmit = () => {
    const parsedCommand: string[] = commandString.split(" ", 5);
    if (commandString.length < 1) {
      return;
    }
    setCount(count + 1);

    if (commandToFunction.has(parsedCommand[0])) {
      const func: REPLFunction = commandToFunction.get(parsedCommand[0])!;
      props.setHistory([
        ...props.history,
        [commandString, func(parsedCommand)],
      ]);
    } else {
      props.setHistory([
        ...props.history,
        [commandString, "no known function for given command"],
      ]);
    }
    setCommandString("");
  };

  /**
   * The returned jsx element corresponds to the bottom of the screen where users enter a command and then enter that command.
   * It keeps a counter of how many times the command has been submitted.
   */
  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={handleSubmit}>Submitted {count} times</button>
    </div>
  );
}
