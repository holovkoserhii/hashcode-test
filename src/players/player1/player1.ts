import * as _ from "lodash";
import { isEmpty } from "lodash";
import {readFromFile} from "../../utils/index";

// console.log('lodash check');
// console.log(_.isEmpty([1, 2, 3])); // false
// console.log(_.isEmpty([])); // true

// Reference here: https://lodash.com/docs/4.17.15

/*
  1. Take real input data (small or mid-size).
  2. Adjust incoming and outgoing types for your function.
  3. Set up calling this function locally.
  4. Run via npm start, open http://localhost:9000/
  5. Make changes incrementally, check results via console.log.
  6. If necessary, create additional helper functions within your file.
  7. MAKE SURE TO MAKE CHANGES ONLY WITHIN THIS FOLDER.
  */

  const i1File = 'https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/inputs/a_example.txt';
  const i2File = 'https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/inputs/b_little_bit_of_everything.txt';
  const i3File = 'https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/inputs/c_many_ingredients.txt';
  const i4File = 'https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/inputs/d_many_pizzas.txt';
  const i5File = 'https://raw.githubusercontent.com/holovkoserhii/hashcode-test/main/src/inputs/e_many_teams.txt';

 interface Pizza {
  id: number
  ingredients: string[]
}

interface player1out {
  teamOf2Number: number
  teamOf3Number: number
  teamOf4Number: number
  pizzas: Pizza[]
  pizzasCount: number
}

const inputString = readFromFile(i1File) // switch between different files

export const function1: (inputString: string) => player1out = (inputString: string) => {
  const splittedString = inputString.split('\n').map(el => _.compact(el.split(' '))).filter(el => !_.isEmpty(el));
  const pizzas = splittedString.map(([_, ...ingredients], id) => ({
      id: id - 1,
      ingredients
    })
  )
  const result = {
    pizzasCount: Number(splittedString[0][0]),
    teamOf2Number: Number(splittedString[0][1]),
    teamOf3Number: Number(splittedString[0][2]),
    teamOf4Number: Number(splittedString[0][3]),
    pizzas
  }

  return result
};
