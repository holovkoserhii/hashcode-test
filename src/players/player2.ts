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
7. MAKE SURE TO MAKE CHANGES ONLY WITHIN THIS FILE.
*/

export const function2: (name: string) => string = (name: string) => `I am ${name}`