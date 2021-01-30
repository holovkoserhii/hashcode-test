import serhiiFn from "./players/serhii";
import oleksandrFn from "./players/oleksandr";
import maksymFn from "./players/maksym";

/*
String:
`0 7 4 8
7 4 1
22`

1)
Transform to object: { lines: 3, averageNumber: 7, averageNumberPerLine: [5, 4, 22]}

2) 
Transform to multiple objects:
[{averageNumberPerLine: 5, sumOfOtherTwo: 10, day: 'M'}, {averageNumberPerLine: 4, sumOfOtherTwo: 10, day: 'T'}, ...]

3)
Transform to multiple string lines:
`M 15
T 14
...`
*/
