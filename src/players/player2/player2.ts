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
  const teams: { [key: string]: number } = {
    2: teamOf2Number,
    3: teamOf3Number,
    4: teamOf4Number,
  };

  const result: player2out = { orders: [] };

  const orders = [];
  for (const [key, value] of Object.entries(teams)) {
    for (let i = 1; i <= value; i++) {
      orders.push(Number(key));
    }
  }

  for (let ordersCount of orders) {
    // for each order * optimise by reverting orders
    const pizzaIds: number[] = [];
    const pizzaIngredientsUsed: string[] = [];
    if (ordersCount <= pizzasCount - usedPizzaIds.length) {
      for (let user = 1; user <= ordersCount; user++) {
        let userHasHisPizza = false;
        // Get pizza for each user
        for (const pizza of pizzas) {
          // itterate over pizzas
          if (usedPizzaIds.includes(pizza.id)) {
            continue;
          }
          const uniqueIngridient = pizza.ingredients.find(
            // * we can try filter by more ingridients
            (ingredient) => !pizzaIngredientsUsed.includes(ingredient)
          );
          if (uniqueIngridient && !userHasHisPizza) {
            pizzaIngredientsUsed.push(...pizza.ingredients);
            userHasHisPizza = true;
            usedPizzaIds.push(pizza.id);
            pizzaIds.push(pizza.id);
            break;
          } else if (
            !userHasHisPizza &&
            pizzasCount - usedPizzaIds.length <= ordersCount
          ) {
            pizzaIngredientsUsed.push(...pizza.ingredients);
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

// const mockData: player1out = {
//   teamOf2Number: 1,
//   teamOf3Number: 2,
//   teamOf4Number: 1,
//   pizzas: [
//     { id: 0, ingredients: ["onion", "pepper", "olive"] },
//     { id: 1, ingredients: ["mushroom", "tomato", "basil"] },
//     { id: 2, ingredients: ["chicken", "mushroom", "pepper"] },
//     { id: 3, ingredients: ["tomato", "mushroom", "basil"] },
//     { id: 4, ingredients: ["chicken", "basil"] },
//   ],
//   pizzasCount: 5,
// };

// function2(mockData);
