import { REPLFunction } from "./REPLFunction";
import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";

/**
 * The commands function returns a map of each function name to the actual function that implements the REPLFunction interface.
 * This allows any other web developer to add their function to the map and thereforea allow input to be processed appropriately.
 * We pass in several of the states from REPLInput so that the function can change them accordingly. The standard functions already included
 * in the map consist of mode, view, and load.
 * @param isVerbose the isVerbose parameter is a boolean that represents whether all the commands are also going to be shown or just the result.
 * @param verboseSetter used to set the state of Verbose.
 * @param currentCSV a string that indicates which CSV is currently loaded. Is set during load and used for viewing
 * @param setCurrCSV sets the currrentCSV state.
 * @returns returns a map from string to REPLFunction
 */
export function commands(
  isVerbose: boolean,
  verboseSetter: Dispatch<SetStateAction<boolean>>,
  currentCSV: string,
  setCurrCSV: Dispatch<SetStateAction<string>>
): Map<string, REPLFunction> {
  /** Mock csv files that would ideally be handled by the back-end */
  const data1: (string | number)[][] = [
    [1, 2, 3, 4, 5],
    ["The", "song", "remains", "the", "same."],
  ];
  const data2: (string | number)[][] = [
    [10, 9, 8, 7],
    ["Second", "CSV", "file"],
    ["bka"],
  ];

  /** Map of CSV name to actual data */
  const nameToCSV: Map<string, (string | number)[][]> = new Map([
    ["csv1", data1],
    ["csv2", data2],
  ]);

  /**
   * mode is a REPLFunction that sets isVerbose to whatever it isn't
   * @returns says that it has changed the mode
   */
  const mode: REPLFunction = (): string | string[][] => {
    if (isVerbose == true) {
      verboseSetter(false);
    } else {
      verboseSetter(true);
    }
    return "succesfully changed the mode";
  };

  /**
   * load is a REPLFunction that takes in an array of strings where the first index is the file to be loaded.
   * It then makes sure that file name is in the dataset and sets the currCSV if it is.
   * @param args array of strings consisting of the commands passed in. We only care about the first index.
   * @returns the result message which should hopefully say that it has been succesfully loaded.
   */
  const load: REPLFunction = (
    args: Array<string>
  ): string | (string | number)[][] => {
    if (args.length < 1) {
      return "invalid arguments error: please specify a file to load";
    }
    if (nameToCSV.has(args[1])) {
      setCurrCSV(args[1]);
      return "succesfully loaded: " + args[1];
    } else {
      return "sorry" + args[1] + "does not exists in dataset";
    }
  };

  /**
   * view is a REPLFunction that given a file is loaded returns the mocked file
   * @returns 2d array of strings or numbers representing the mocked data.
   */
  const view: REPLFunction = (): string | (string | number)[][] => {
    if (nameToCSV.has(currentCSV)) {
      const output: (string | number)[][] | undefined =
        nameToCSV.get(currentCSV);
      return output!;
    } else {
      return "sorry data not loaded";
    }
  };

  /**
   * This is a mocked search function that simply returns mocked search data.
   * @param currentCSV the current csv: makes the mocked data seem personalized
   * @param column  the corresponding column: could be a number or string
   * @param value  the value to search for
   * @returns a mocked row of some file.
   */
  const mockSearch = (
    currentCSV: string,
    column: string,
    value: string
  ): string | (string | number)[][] => {
    if (column == "fifty") {
      return "column: " + column + " couldn't be found in " + currentCSV;
    } else if (value == "missing") {
      return "search value not found";
    } else {
      return [["searching", "for", currentCSV, column, value]];
    }
  };

  /**
   * search is a REPLFunction that returns the result of mocksearching the current csv for a column and value.
   * @param args the array of parsed commands. The first index should be the column to search for, and the second is the value.
   * @returns the result of mockSearch which is a 2d array representing a column given no errors.
   */
  const search: REPLFunction = (
    args: Array<string>
  ): string | (string | number)[][] => {
    if (args.length < 2) {
      return "please specify both a column and value";
    } else if (args.length < 3) {
      return "please specify a value to search for";
    } else if (currentCSV == "") {
      return "please load a valid CSV file";
    }
    return mockSearch(currentCSV, args[1], args[2]);
  };

  /**
   * Map connecting a command to its corresponding REPLFunction
   */
  const nameToFunction: Map<string, REPLFunction> = new Map([
    ["mode", mode],
    ["load", load],
    ["view", view],
    ["search", search],
  ]);

  return nameToFunction;
}
