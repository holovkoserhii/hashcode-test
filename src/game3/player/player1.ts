const i0File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game2/inputs/a.txt";
const i1File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game2/inputs/b.txt";
const i2File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game2/inputs/c.txt";
const i3File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game2/inputs/d.txt";
const i4File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game2/inputs/e.txt";
const i5File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game2/inputs/f.txt";

const inputFiles = [i0File, i1File, i2File, i3File, i4File, i5File];

import * as _ from "lodash";
import { readFromFile, writeToFile } from "../utils/index";

const NEEDED_FILE_INDEX = 0;
readFromFile(inputFiles[NEEDED_FILE_INDEX]);

// MAIN FUNCTION WHERE EVERYTHING "GATHERS"
export const function1 = (textData: any) => {
  // const parsed = parseFile(textData);
  // const result = function2(parsed);
  // const rawStringResult = composeFinalString(result);
  // writeToFile(rawStringResult)
}

// THIS IS THE FUNCTION FOR SERHII
const parseFile = (rawText: any): any => {}

// THIS IS THE FUNCTION FOR SERHII
const composeFinalString = (input: any): string => {
  return 'result string to write to file'
}

// YOU GUYS LIVE IN THIS FUNCTION - TO ACTUALLY CREATE AN ALGORITHM
const function2 = () => {}