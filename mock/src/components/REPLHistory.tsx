import "../styles/main.css";

interface REPLHistoryProps {
  isVerbose: boolean;
  history: [string, string | (string | number)[][]][];
}

/**
 * Function that processes the history state and renders its contents appropriately. If verbose mode is enabled, both the user inputted command
 * and its result appear. Without verbose mode enabled, only the result is returned. If the history contains a 2D array representation of a CSV file, the
 * it's converted into an HTML table.
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* first map through each element inside the array */}
      {props.history.map((elem, i) =>
        //check if the mode is verbose
        props.isVerbose === true ? (
          // then map through each item in the tuple
          elem.map(
            (
              e,
              index //if verbose than do the following operations: calls
              //array to table if type of e isn't string. If string than simply returns e
            ) => (
              <p key={index}>
                {index === 1 ? "result: " : "command: "}
                {typeof e !== "string" ? arrayToTable(e) : e}
              </p>
            )
          )
        ) : (
          //Does the following if not verbose.
          //Only prints result, and formats to table if type isn't string
          <p key={i}>
            {typeof elem[1] !== "string" ? arrayToTable(elem[1]) : elem[1]}
          </p>
        )
      )}
    </div>
  );
}

/**
 * The arrayToTable function returns a JSX.Element for which the inputted data is formatted into a nice looking table.
 * @param data a 2d array of strings or numbers
 * @returns jsx element of a table that is centered and has boxes around all the elements
 */
export function arrayToTable(data: (string | number)[][]): JSX.Element {
  return (
    <div style={{ textAlign: "center" }}>
      <table style={{ margin: "auto", borderCollapse: "collapse" }}>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={{ border: "1px solid black", padding: "10px" }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
