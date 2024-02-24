import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  isVerbose: boolean;
  history: [string, string][];
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
                {index === 0 ? "result: " : "command: "}
                {e}
              </p>
            ))
          ) : (
            <p key={i}>{elem[0]}</p>
          )
      )}
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
    </div>
  );
}
