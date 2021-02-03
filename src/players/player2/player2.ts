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

interface obj {
    time: number
    price: number
}
 
interface p12 {
    timeAvailable: number,
    materials: obj[]
}

interface p23 {
    materials: number[]
}

// const mockedData = {
//     timeAvailable: 44,
//     materials: [{
//         time: 5, price: 8
//     }, {
//         time: 7, price: 10
//     }]
// }

export const function2: (data: p12) => p23 = (data: p12) => {
    console.log('mockedData');
    // console.log(data);

    const efficiencies = data.materials.map(el => _.divide(el.price, el.time))
    // console.log(efficiencies);
    
    const products = efficiencies.map(el => _.divide(el, _.max(efficiencies))).map(el => _.round(el, 3) === 1).map((el, index) => {
        if (!el) return 0
        return _.floor(_.divide(data.timeAvailable, data.materials[index].time))
    });
    
    return {
        materials: products
    }
}

// function2(mockedData)