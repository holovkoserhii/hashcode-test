import * as _ from "lodash";

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

interface Pizza {
  id: number;
  ingredients: string[];
}

interface player1out {
  teamOf2Number: number;
  teamOf3Number: number;
  teamOf4Number: number;
  pizzas: Pizza[];
  pizzasCount: number;
}

interface Order {
  teamOf: number;
  pizzaIds: number[];
}

interface player2out {
  orders: Order[];
}

export const function2: (data: player1out) => player2out = (
  data: player1out
) => {
  const {
    teamOf2Number,
    teamOf3Number,
    teamOf4Number,
    pizzas,
    pizzasCount,
  } = data;
  let usedPizzaIds: number[] = [];

  const result: player2out = { orders: [] };
  const NEW_INGREDIENTS_THRESHOLD = 0.8;
  const orders = [
    ...new Array(teamOf4Number).fill(4),
    ...new Array(teamOf3Number).fill(3),
    ...new Array(teamOf2Number).fill(2),
  ];

  for (let ordersCount of orders) {
    // for each order
    const pizzaIds: number[] = [];
    let pizzaIngredientsUsed: { [key: string]: boolean } = {};
    if (ordersCount <= pizzasCount - usedPizzaIds.length) {
      for (let user = ordersCount; user > 0; user--) {
        let userHasHisPizza = false;
        // Get pizza for each user
        for (const pizza of pizzas) {
          // itterate over pizzas
          if (usedPizzaIds.includes(pizza.id)) {
            continue;
          }

          if (
            getIfIngredientsDoNotMatch(
              pizza.ingredients,
              pizzaIngredientsUsed,
              NEW_INGREDIENTS_THRESHOLD
            ) &&
            !userHasHisPizza
          ) {
            pizzaIngredientsUsed = addIngridientsUsed(
              pizza.ingredients,
              pizzaIngredientsUsed
            );
            userHasHisPizza = true;
            usedPizzaIds.push(pizza.id);
            pizzaIds.push(pizza.id);
            break;
          } else if (
            !userHasHisPizza &&
            pizzasCount - usedPizzaIds.length <= ordersCount
          ) {
            pizzaIngredientsUsed = addIngridientsUsed(
              pizza.ingredients,
              pizzaIngredientsUsed
            );
            userHasHisPizza = true;
            usedPizzaIds.push(pizza.id);
            pizzaIds.push(pizza.id);
            break;
          }
        }
      }
    }

    const isPizzaIds = !_.isEmpty(pizzaIds);
    if (isPizzaIds && pizzaIds.length === ordersCount) {
      result.orders.push({ pizzaIds, teamOf: ordersCount });
    } else if (isPizzaIds) {
      usedPizzaIds = usedPizzaIds.filter((id) => !pizzaIds.includes(id));
    }
  }
  return result;
};

const addIngridientsUsed = (
  ingredients: string[],
  obj: { [key: string]: boolean }
) => {
  for (let j = 0; j < ingredients.length; j++) {
    obj[ingredients[j]] = true;
  }
  return obj;
};

const getIfIngredientsDoNotMatch = (
  ingredients: string[],
  pizzaIngredientsUsed: { [key: string]: boolean },
  neededNewIngredientsThreshold: number = 0
): any => {
  const ingredentsTotal: number = ingredients.length;
  let newIngredients: number = 0;
  for (let i = 0; i < ingredients.length; i++) {
    if (pizzaIngredientsUsed[ingredients[i]]) {
      continue;
    } else {
      newIngredients++;
      const shareOfNewIngredients = newIngredients / ingredentsTotal;
      if (shareOfNewIngredients >= neededNewIngredientsThreshold) {
        return true;
      }
    }
  }
};
