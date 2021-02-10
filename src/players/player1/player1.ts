import * as _ from "lodash";
import { isEmpty } from "lodash";
import { readFromFile, writeToFile } from "../../utils/index";
import { function2 } from "../player2/player2";

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

 const pizzasMocked = {
  teamOf2Number: 1,
  teamOf3Number: 2,
  teamOf4Number: 1,
  pizzas: [
    { id: 0, ingredients: ["onion", "pepper", "olive"] },
    { id: 1, ingredients: ["mushroom", "tomato", "basil"] },
    { id: 2, ingredients: ["chicken", "mushroom", "pepper"] },
    { id: 3, ingredients: ["tomato", "mushroom", "basil"] },
    { id: 4, ingredients: ["chicken", "basil"] },
  ],
  pizzasCount: 5,
};

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

interface Order {
  teamOf: number
  pizzaIds: number[]
}

interface player2out {
  orders: Order[]
}

const calculatePoints: (data: player2out, pizzas: player1out) => number = (data, pizzas) => {
  const orders = data.orders
  const points = orders.map(order => {
    const ingredients = order.pizzaIds.map(id => pizzas.pizzas.find(pizzaItem => {
      
      return pizzaItem.id === id
    }).ingredients)
    
    return Math.pow(_.uniq(_.flattenDeep(ingredients)).length, 2)
    
    
  })
  return _.sum(points);
}

const inputString = readFromFile(i1File) // switch between different files

export const function1: (inputString: string) => player1out = (inputString: string) => {
  const splittedString = inputString.split('\n').map(el => _.compact(el.split(' '))).filter(el => !_.isEmpty(el));
  const pizzas = splittedString.map(([_, ...ingredients], id) => ({
      id: id - 1,
      ingredients
    })
  )
  pizzas.shift()
  const result = {
    pizzasCount: Number(splittedString[0][0]),
    teamOf2Number: Number(splittedString[0][1]),
    teamOf3Number: Number(splittedString[0][2]),
    teamOf4Number: Number(splittedString[0][3]),
    pizzas
  }

writeToFile(composeFinalString(function2(result)), 'player2Result')
// writeToFile(omposeFinalString(function3(result)), 'player3Result')
  console.log('player2 points: ', calculatePoints(function2(result), result));
  // console.log('player3 points: ', calculatePoints(function3(result)), result));
  return result
};


const composeFinalString: (data: player2out) => string = (data) => {
  let result = `${data.orders.length}\n`
  data.orders.forEach((element) => {
    result += `${element.teamOf} ${element.pizzaIds.join(' ')}\n`
  })
  return result
}