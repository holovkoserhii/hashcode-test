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
import { isEmpty, method } from "lodash";
import { readFromFile, writeToFile } from "../utils/index";

const NEEDED_FILE_INDEX = 0;
readFromFile(inputFiles[NEEDED_FILE_INDEX]);

export const function1 = (textData: any) => {
  const parsed = parseFile(textData);
  
  const city = buildCity(parsed); 
}
interface Residential {
  isResidential: boolean,
  id: number,
  height: number,
  width: number,
  residentsLiving: number,
  occupiedCells:number[][]
}
interface Utility {
  isResidential: boolean,
  id: number,
  height: number,
  width: number,
  type: number,
  occupiedCells:number[][]
}
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

const parseFile = (rawText: any): Parsed => {
  const firstRow = rawText
    .split("\n", 1)
    const [ cityRows, cityColumns, maxWalkingDistance, buildingPlan ] = firstRow[0].split(' ');
    
    const rest = rawText.substr(firstRow[0].length + 1)
    const splitByR = splitBy(rest, 'R');
    const splitByU: string[][] = splitByR.map(el => splitBy(el, 'U'));
    const blocks = _.flatten(splitByU).filter((el: any) => !_.isEmpty(el));

    const formatted = blocks.map((block, index) => {
      const splittedBlock = block.split("\n").filter((el: any) => !_.isEmpty(el));
      const headerBlock = splittedBlock[0];
      const formattedHeaderBlock = headerBlock.split(' ')
      const formattedBlock: any = {}
      
      const type = formattedHeaderBlock[0];
      formattedBlock.height = Number(formattedHeaderBlock[1]);
      formattedBlock.width = Number(formattedHeaderBlock[2]);
      formattedBlock.isResidential = type === 'R';
      formattedBlock.id = index;
      
      if (type === 'R') {
        formattedBlock.residentsLiving = Number(formattedHeaderBlock[3]);
      }
      if (type === 'U') {
        formattedBlock.type = Number(formattedHeaderBlock[3]);
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
      rows: Number(cityRows),
      columns: Number(cityColumns)
    },
    residential,
    utility,
    maxWalkingDistance: Number(maxWalkingDistance),
    buildingPlansNumber: Number(buildingPlan)
  }
  
}

const getBlock = arr => arr[Math.floor(Math.random() * arr.length)]

const maybeAddBlockToCity = (city, {row, col}, block: Residential | Utility) => {
  const occupied = block.occupiedCells; // [[0,1], [1,2]]
  // console.log(occupied);
  
  let updatedCity = JSON.parse(JSON.stringify(city))
  for (let i = 0; i < occupied.length; i++) {
    const [occupiedRowViaBlock, occupiedColumnViaBlock] = occupied[i]
    // console.log('before');
    // console.log(updatedCity);
    
    const cityCell = city[row + occupiedRowViaBlock][col + occupiedColumnViaBlock]
    // console.log(cityCell);
    
    if( cityCell !== 0 ) return false
    // console.log('going to register...');
    // console.log(`row ${row + occupiedRowViaBlock}, column ${col + occupiedColumnViaBlock}`);
    // console.log(`before`);
    // console.log({updatedCity});
    updatedCity[row + occupiedRowViaBlock][col + occupiedColumnViaBlock] = block.id
    // console.log(updatedCity);
    console.log(`end of cycle ${i}`);
    console.log({updatedCity});
    
    
  }
  console.log({updatedCity});
  
  return updatedCity
}

const buildCity = (parsedInput: Parsed): any=>{
  console.log(parsedInput.city.rows);
  console.log(parsedInput.city.columns);
  
  
  let city = new Array(parsedInput.city.rows).fill(new Array(parsedInput.city.columns).fill(0))
  console.log(city);
  
  // const building = 1;
  // const nearBuilding: null = null;
  // const project = [];
  // const buildingsToBePlaced = 0;
  const registeredBlocks = []

  // parsedInput.residential

const TRYING_STEP = 2;
let shouldUseResidential = false;

  for(let i= 0;i<city.length; i = i+TRYING_STEP){
    for (let j = 0; j < city[i].length; j = j + TRYING_STEP) {
      // console.log({i, j});
      
      
      if (city[i][j] === 0) {
        const block: Residential | Utility = getBlock(shouldUseResidential ? parsedInput.residential : parsedInput.utility);
        // console.log({block});
        
        
        if (block.width + j <= city[i].length && block.height + i <= city.length) {
          // console.log('here');
          // console.log('before calling');
          // console.log(city);
          
          
          console.log('calling maybeAddBlockToCity');
          console.log(i,j);
          
          const updatedCity = maybeAddBlockToCity(city, {row: i, col: j}, block)
          if (!updatedCity) {
            continue;
          }
          city = updatedCity;
          registeredBlocks.push({
            id: block.id,
            topLeftCoords: {
              row: i,
              col: j
            }
          })
          // console.log(city);
          // debugger;
          

        }
  
      }

    }
      
  }
  // console.log(city);
  
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