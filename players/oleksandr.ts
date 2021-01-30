import { player3out, player2out } from '../interfaces';

const mockData: player2out = [
    {averageNumberPerLine: 5, sumOfOtherTwo: 10, day: 'M'},
    {averageNumberPerLine: 4, sumOfOtherTwo: 10, day: 'T'}
];

const handler = (inputData: player2out[]): player3out => {
    const output: Partial<player3out> = {};
    
    inputData.forEach( item => output[item.day] = 1 );

    return output as player3out;
}

export default handler;