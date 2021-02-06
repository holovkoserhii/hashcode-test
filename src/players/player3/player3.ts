import * as _ from "lodash";

import { player1out, player2out } from './interface';

// console.log('lodash check');
// console.log(_.isEmpty([1, 2, 3])); // false
// console.log(_.isEmpty([])); // true

// Reference here: https://lodash.com/docs/4.17.15

/*
1. Create mocked data according to the incoming types contract.
2. Adjust incoming and outgoing types for your function.
3. Set up calling this function locally.
4. Run via npm start, open http://localhost:9000/
5. Make changes incrementally, check results via console.log.
6. If necessary, create additional helper functions within your file.
7. MAKE SURE TO MAKE CHANGES ONLY WITHIN THIS FOLDER.
*/

const sortPizzas = (pizzas: any, updatedArr: any, maxPizza: any): any => {
  const mostSaturatedPizza = {
    index: 0,
    pizza: maxPizza
  };
  let actions = 0;

  for (let i=0; i<pizzas.length; i++) {

    if (pizzas[i].ingredients.length >= mostSaturatedPizza.pizza.ingredients.length) {
      mostSaturatedPizza.pizza = pizzas[i];
      mostSaturatedPizza.index = i;
      actions++;
      console.log('TRIGGERED')
    }
  }

  if (actions > 0) {
    updatedArr.push(mostSaturatedPizza.pizza);
  }
  pizzas.splice(mostSaturatedPizza.index, 1);

  return actions === 0 
    ? updatedArr
    : sortPizzas(pizzas, updatedArr, mostSaturatedPizza.pizza)
}

const findMaxSaturatedPizzas = (pizzas: any, maxPizza: any): any => {
  const mostSaturatedPizza = {
    index: 0,
    pizza: maxPizza
  };

  for (let i=0; i<pizzas.length; i++) {

    if (pizzas[i].ingredients.length >= mostSaturatedPizza.pizza.ingredients.length) {
      mostSaturatedPizza.pizza = pizzas[i];
      mostSaturatedPizza.index = i;
    }
  }
  pizzas.splice(mostSaturatedPizza.index, 1);

  return {
    filteredpizzas: pizzas,
    maxPizza: mostSaturatedPizza.pizza
  }
}


export const function3 = (data: player1out): player2out => {
  console.log(data)
  let { teamOf2Number, teamOf3Number, teamOf4Number, pizzas } = data;

  const {filteredpizzas, maxPizza} = findMaxSaturatedPizzas(pizzas, pizzas[0]);

  const arr = sortPizzas(filteredpizzas, [], maxPizza);
  const { filteredpizzas: resultPizzas} = arr;
  // resultPizzas.reverse();
  console.log(arr)
  // arr.filteredpizzas.map( (item: any) => console.log(item) )


  return {
    orders: [
      {
        teamOf: teamOf2Number,
        pizzaIds: resultPizzas.splice(0, teamOf2Number)
      },
      {
        teamOf: teamOf3Number,
        pizzaIds: resultPizzas.splice(0, teamOf3Number)
      },
      {
        teamOf: teamOf4Number,
        pizzaIds: resultPizzas.splice(0, teamOf4Number)
      },
    ]
  }
};