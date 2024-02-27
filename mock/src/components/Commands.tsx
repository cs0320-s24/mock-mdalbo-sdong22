import { REPLFunction } from "./REPLFunction";
import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface CommandsProps {
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
export function Commands(props: CommandsProps) {
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
  const mode: REPLFunction = (args: Array<string>): string | string[][] => {
    if (props.isVerbose == true) {
      props.setVerbose(false);
    } else {
      props.setVerbose(true);
    }
    return "mode";
  };

  const load: REPLFunction = (args: Array<string>): String | String[][] => {
    return "error go away";
  };

  const view: REPLFunction = (args: Array<string>): String | String[][] => {
    return "error go away";
  };
  return <p></p>;
}
