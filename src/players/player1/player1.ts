import * as _ from "lodash";
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
interface obj {
  time: number;
  price: number;
}
interface p12 {
  timeAvailable: number;
  materials: obj[];
}

const rawMaterials = `
  100
  2
  5 9
  7 11
  `;

export const function1: (materials: string) => p12 = (material: string) => {
  const rawArray = material.trim().split(/\r?\n/);
  const timeAvailable = +rawArray.shift();
  rawArray.shift();
  const materials = rawArray.reduce((accum, currentMaterial) => {
    const [t, p] = currentMaterial.trim().split(" ");
    const time = Number(t);
    const price = Number(p);
    return [...accum, { time, price }];
  }, []);

  return { timeAvailable, materials };
};
