import { function1 } from "./players/player1/player1";
import { function2 } from "./players/player2/player2";
import { function3 } from "./players/player3/player3";

const globalInput = `
100
2
5 9
7 11
`;

const player1result = function1(globalInput);
const player2result = function2(player1result);
const player3result = function3(player2result);

console.log('===global result===');
console.log(player3result);
