const i0File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game3/inputs/a.txt";
const i1File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game3/inputs/b.txt";
const i2File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game3/inputs/c.txt";
const i3File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game3/inputs/d.txt";
const i4File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game3/inputs/e.txt";
const i5File =
  "https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/game3/inputs/f.txt";

const inputFiles = [i0File, i1File, i2File, i3File, i4File, i5File];

import * as _ from "lodash";
import { readFromFile, writeToFile } from "../utils/index";

const NEEDED_FILE_INDEX = 5;
readFromFile(inputFiles[NEEDED_FILE_INDEX]);

interface Street {
  name: string
  startIntersectionId: number
  endIntersectionId: number
  timeToCross: number
}

interface Car {
  streetNames: string[]
}
interface Input {
  gameLength: number
  intersectionsTotalNumber: number
  scorePerCar: number
  streets: Street[]
  cars: Car[]
}

interface ResultingStreetWithLength {
  streetName: string
  lengthWithGreen: number
}

interface Intersection {
  intersectionId: number
  incomingStreet: string[]
}
interface ResultingIntersection {
  intersectionId: number
  greenSettings: ResultingStreetWithLength[]
}

// MAIN FUNCTION WHERE EVERYTHING "GATHERS"
export const function1 = (textData: string) => {
  const parsed = parseFile(textData); 
  const result = function2(parsed);
  
  const rawStringResult = composeFinalString(result);
  // console.log(rawStringResult);
  writeToFile(rawStringResult, String(NEEDED_FILE_INDEX))
}

const parseStreet = (street) => {
 const [intIdStart, intIdEnd, name, lengthToGo] = street.split(' ');
 const formattedStreet: Street = {
  name,
  startIntersectionId: Number(intIdStart),
  endIntersectionId: Number(intIdEnd),
  timeToCross: Number(lengthToGo)
 }
 return formattedStreet
}
const parseCar = (car) => {
  const [a, ...streetNames] = car.split(' ');
  return streetNames
}

// THIS IS THE FUNCTION FOR SERHII
const parseFile = (rawText: string): any => {
  const elems = _.compact(rawText.split('\n'));
  // console.log(elems);
  const header = elems[0];
  const [gameLength, intersectionsTotalNumber, streetsTotalNumber, carsTotalNumber, scorePerSuccessfulCar] = header.split(' ').map(el => Number(el));
  // console.log({gameLength, intersectionsTotalNumber, streetsTotalNumber, carsTotalNumber, scorePerSuccessfulCar});
  const [a, ...restOfData] = elems
  // console.log(restOfData);
  const streets = _.take(restOfData, streetsTotalNumber)
  const cars = _.takeRight(restOfData, carsTotalNumber)
  // console.log({streets});
  // console.log({cars});
  const parsedStreets = streets.map(parseStreet)
  const parsedCars = cars.map(parseCar)
  // console.log({parsedStreets});
  // console.log({parsedCars});
  const inputString: Input = {
    gameLength,
    intersectionsTotalNumber,
    scorePerCar: scorePerSuccessfulCar,
    streets: parsedStreets,
    cars: parsedCars
  }
  return inputString
}

// THIS IS THE FUNCTION FOR SERHII
const composeFinalString = (mocked): string => {
  // const mocked: ResultingIntersection[] = [
  //   {
  //     intersectionId: 0,
  //     greenSettings: [
  //       {
  //         streetName: 'a',
  //         lengthWithGreen: 10
  //       },
  //       {
  //         streetName: 'b',
  //         lengthWithGreen: 20
  //       }
  //     ]
  //   }, {
  //     intersectionId: 7,
  //     greenSettings: [
  //       {
  //         streetName: 'aa',
  //         lengthWithGreen: 100
  //       },
  //       {
  //         streetName: 'bb',
  //         lengthWithGreen: 200
  //       },
  //       {
  //         streetName: 'cc',
  //         lengthWithGreen: 300
  //       }
  //     ]
  //   }
  // ];
  const TOTAL = mocked.length;
  const intersectionsString = mocked.map(el => {
    let result = `${el.intersectionId}\n${el.greenSettings.length}\n`
    const rest = el.greenSettings.map(greenSetting => `${greenSetting.streetName} ${greenSetting.lengthWithGreen}`).join('\n');
    return result + rest;
  }).join('\n');
  
  return TOTAL + '\n' + intersectionsString;
}

// YOU GUYS LIVE IN THIS FUNCTION - TO ACTUALLY CREATE AN ALGORITHM
const function2 = (data) => {

  let intersectionArr: Intersection[] = []
  for (let i =0 ; i < data.intersectionsTotalNumber; i++){
    intersectionArr.push({
      intersectionId:i,
    incomingStreet: data.streets.filter(street=> street.endIntersectionId === i).map(s=> s.name)})
  }
  // console.log(intersectionArr)

  interface ResultingStreetWithLength {
    streetName: string
    lengthWithGreen: number
  }
  interface ResultingIntersection {
    intersectionId: number
    greenSettings: ResultingStreetWithLength[]
  }

const intersactionArrHelper = (arr)=>{
  if(arr.length === 1){
      return {streetName:arr[0], lengthWithGreen: 1}
    }
}
interface Intersection {
  intersectionId: number
  incomingStreet: string[]
}
interface ResultingStreetWithLength {
  streetName: string
  lengthWithGreen: number
}
interface ResultingIntersection {
  intersectionId: number
  greenSettings: ResultingStreetWithLength[]
}


const resultingIntersection: Partial<ResultingIntersection> = {}



const fullIntersectionsArr: ResultingIntersection[] = intersectionArr.map((intersection: Intersection) => {
  // console.log(intersection);
  const fullIntersection = {
    intersectionId: intersection.intersectionId,
    greenSettings: intersection.incomingStreet.map(street => ({
      streetName: street,
      lengthWithGreen: 1
    }))

  }
  return fullIntersection;
})

// console.log(fullIntersectionsArr);
return fullIntersectionsArr


}
