import { CARDS } from "./constants";

export const getNewCardValues = () => {
  const valueDistributionSetOne = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
  const valueDistributionSetTwo = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
  const newValuesArr: Array<number> = [];
  for(let i = 0; i < 8; i++) {
    let randomNumOne = 0;
    let randomNumTwo = 0;
    while(!valueDistributionSetOne.has(randomNumOne)){
      randomNumOne = Math.floor(Math.random() * 9);
    }
    newValuesArr.push(randomNumOne);
    valueDistributionSetOne.delete(randomNumOne);
    while(!valueDistributionSetTwo.has(randomNumTwo)) {
      randomNumTwo = Math.floor(Math.random() * 9);
    }
    newValuesArr.push(randomNumTwo);
    valueDistributionSetTwo.delete(randomNumTwo);
  }
  return newValuesArr;
};

export const shuffleCards = () => {
  const shuffled = [...CARDS].sort(() => 0.5 - Math.random());
  return shuffled.map((card, index) => ({ ...card, id: index }));
};