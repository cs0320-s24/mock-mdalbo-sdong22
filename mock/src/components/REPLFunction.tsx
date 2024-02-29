/**
 * A command-processor function for our REPL. The function returns an array. The array contains strings or string | number array.
 * The returned value is added to history in REPLInput when the command is finished executing.
 */
export interface REPLFunction {
  (args: Array<string>): string | (string | number)[][];
}
