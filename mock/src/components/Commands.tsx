import { REPLFunction } from "./REPLFunction";
import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

// function that takes in different props of REPLInput and makes map
export function commands(
  isVerbose: boolean,
  verboseSetter: Dispatch<SetStateAction<boolean>>,
  currentCSV: string,
  setCurrCSV: Dispatch<SetStateAction<string>>
): Map<string, REPLFunction> {
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

  const mode: REPLFunction = (): string | string[][] => {
    if (isVerbose == true) {
      verboseSetter(false);
    } else {
      verboseSetter(true);
    }
    return "mode";
  };

  const load: REPLFunction = (
    args: Array<string>
  ): string | (string | number)[][] => {
    if (nameToCSV.has(args[1])) {
      setCurrCSV(args[1]);
      return "succesfully loaded: " + args[1];
    } else {
      return "sorry file does not exists in map";
    }
  };

  const view: REPLFunction = (): string | (string | number)[][] => {
    if (nameToCSV.has(currentCSV)) {
      const output: (string | number)[][] | undefined =
        nameToCSV.get(currentCSV);
      return output!;
    } else {
      return "sorry data not loaded";
    }
  };

  const mockSearch = (
    currentCSV: string,
    column: string,
    value: string
  ): (string | number)[][] => {
    return [["searching for", currentCSV, column, value]];
  };

  const search: REPLFunction = (
    args: Array<string>
  ): string | (string | number)[][] => {
    return mockSearch(currentCSV, args[1], args[2]);
  };

  const nameToFunction: Map<string, REPLFunction> = new Map([
    ["mode", mode],
    ["load", load],
    ["view", view],
    ["search", search],
  ]);

  return nameToFunction;
}
