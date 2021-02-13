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
import { isEmpty } from "lodash";
import { readFromFile, writeToFile } from "../utils/index";

const NEEDED_FILE_INDEX = 1;
readFromFile(inputFiles[NEEDED_FILE_INDEX]);

export const function1 = (textData: any) => {
  const parsed = parseFile(textData);
  console.log(parsed);
  
  const city = buildCity(parsed); 
}
interface Residential { isResidential: boolean, height: number, width: number, residentsLiving: number, occupiedCells:number[][]}
interface Utility {isResidential: boolean, height: number, width: number, type: number,occupiedCells:number[][]}
interface Parsed {
 city: {rows: number, columns: number}
 residential: Residential[]
 utility: Utility[]
 maxWalkingDistance: number
 buildingPlansNumber: number
}

type project = number[]
interface Output {
  buildingsToBePlaced: number
  projects: project[]
}

const splitBy = (source: string, delimiter: string) => {
  const splitted = source.split(delimiter)
  let res = [splitted[0]]
  for (let i = 1; i < splitted.length; i++) {
    res.push(`${delimiter}${splitted[i]}`)
  }
  return res
}

const parseFile = (rawText: any) => {
  const firstRow = rawText
    .split("\n", 1)
    // console.log(firstRow);
    
    const [ cityRows, cityColumns, maxWalkingDistance, buildingPlan ] = firstRow[0].split(' ');
    console.log('asdgklhdfsgklh');
    
    console.log({cityRows, cityColumns, maxWalkingDistance, buildingPlan});
    

    const rest = rawText.substr(firstRow[0].length + 1)
    const splitByR = splitBy(rest, 'R');
    const splitByU: string[][] = splitByR.map(el => splitBy(el, 'U'));
    const blocks = _.flatten(splitByU).filter((el: any) => !_.isEmpty(el));

    const formatted = blocks.map(block => {
      const splittedBlock = block.split("\n").filter((el: any) => !_.isEmpty(el));
      const headerBlock = splittedBlock[0];
      const formattedHeaderBlock = headerBlock.split(' ')
      const formattedBlock: any = {}
      
      const type = formattedHeaderBlock[0];
      formattedBlock.height = formattedHeaderBlock[1];
      formattedBlock.width = formattedHeaderBlock[2];
      formattedBlock.isResidential = type === 'R'
      
      if (type === 'R') {
        formattedBlock.residentsLiving = formattedHeaderBlock[3];
      }
      if (type === 'U') {
        formattedBlock.type = formattedHeaderBlock[3];
      }
      formattedBlock.occupiedCells = []
      const [a, ...rest] = splittedBlock;     
      for (let i = 0; i < rest.length; i++) {
        for (let j = 0; j < rest[i].length; j++) {
          if (rest[i][j] === '#') {
            formattedBlock.occupiedCells.push([i, j]);
          }
        }
      }
      return formattedBlock
    })
  const [residential, utility] = _.partition(formatted, 'isResidential')
  return {
    city: {
      rows: cityRows,
      columns: cityColumns
    },
    residential,
    utility,
    maxWalkingDistance,
    buildingPlansNumber: buildingPlan
  }
  
}

const buildCity = (parsedInput: any): any=>{
  console.log(parsedInput);
  
  const city = new Array(parsedInput.city.rows).fill(new Array(parsedInput.city.columns).fill(0))
  // console.log(city, 'Its initial city')
  const building = 1
  const nearBuilding: null = null
  const project = []
  const buildingsToBePlaced = 0

  parsedInput.residential
  for(let i= 0;i<city.length; i+2){
    if(city[i] === 0){
      i--
    }
  }
  return {}
}
const mock = {
  city: {rows: 4, columns:7 },
  residential: [{ height: 2, width: 2, residentsLiving: 10, buildingPlan:[[0,1],[0,0],[1,1],[1,0]]} ],
  utility: [{ height: 2, width: 2, type: 1, buildingPlan:[[0,1],[0,0],[1,1],[1,0]]} ],
  maxWalkingDistance: 2,
  buildingPlansNumber: 2
}

// buildCity(mock)