import { TableHTMLAttributes } from "react";

export class Mock {
  csvData: { [key: string]: (string | number)[][] };
  currentCsv: [fileName: string, (string | number)[][]];

  constructor() {
    this.currentCsv = ["", []];
    this.csvData = {
      csv1: [
        [1, 2, 3, 4, 5],
        ["The", "song", "remains", "the", "same."],
      ],
      csv2: [[10, 9, 8, 7], ["Second", "CSV", "file"], ["bka"]],
    };
  }
  loadCsv(csvName: string): string {
    if (this.csvData[csvName]) {
      this.currentCsv = [csvName, this.csvData[csvName]];
      console.log(this.currentCsv);
      return "located file".concat(csvName);
    } else {
      return "sorry, couldn't locate CSV file";
    }
  }
  viewCsv(): {};
}
