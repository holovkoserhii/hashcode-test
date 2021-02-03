import * as _ from "lodash";

import { ChosenProducts } from './interface';

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

const mockedInput: ChosenProducts = {
    materials: [5, 10]
};
const paperCost = 9;
const plasticCost = 11;

export const function3 = (data: ChosenProducts): string => {
    const temp = data.materials.reduce( (acc, el, _i) => _i === 0
        ? acc + el*paperCost
        : acc + el*plasticCost
    , 0);
    const materialsResult = data.materials.join(' ');
    
    return `
        ${temp}
        ${materialsResult}
    `
};