import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  isVerbose: boolean;
  history: [string, string | (string | number)[][]][];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map(
        (
          elem,
          i // uniquely identify each element of array
        ) =>
          props.isVerbose === true ? (
            elem.map((e, index) => (
              <p key={index}>
                {index === 1 ? "result: " : "command: "}
                {typeof e !== "string" ? arrayToTable(e) : e}
              </p>
            ))
          ) : (
            <p key={i}>{elem[1]}</p>
          )
      )}
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
    </div>
  );
}
function arrayToTable(data: (string | number)[][]): JSX.Element {
  return (
    <table>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}
