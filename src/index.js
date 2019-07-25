import readlineSync from 'readline-sync';


export const greeting = () => {
  console.log('Welcome to the Brain Games!');
};
export const sayHello = () => {
  const userName = readlineSync.question('May I have your name? ');
  console.log(`Hello, ${userName}!\n`);
  return userName;
};

const rules = {
  even: 'Answer "yes" if number even otherwise answer "no".\n',
  calc: 'What is the result of the expression?\n',
};

const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min));
const ops = ['+', '-', '*'];
const actionMap = {
  '*': (n1, n2) => n1 * n2,
  '+': (n1, n2) => n1 + n2,
  '-': (n1, n2) => n1 - n2,
};

export default (gameType) => {
  greeting();
  console.log(rules[gameType]);
  const name = sayHello();
  const questions = (counter) => {
    if (counter > 3) {
      console.log(`Congratulations, ${name}!`);
      return undefined;
    }
    const firstNumber = getRandomInt(1, 10);
    const secontNumber = getRandomInt(1, 10);
    const operator = ops[getRandomInt(0, 2)];
    const question = {
      even: `${firstNumber}`,
      calc: `${firstNumber} ${operator} ${secontNumber}`,
    };
    const correctAnswer = {
      even: (question[gameType] % 2 === 0) ? 'yes' : 'no',
      calc: actionMap[operator](firstNumber, secontNumber),
    };
    console.log(`Question: ${question[gameType]}`);
    const answer = readlineSync.question('Your answer: ');
    if (String(answer) === String(correctAnswer[gameType])) {
      console.log('Correct!');
      return questions(counter + 1);
    }
    console.log(`"${answer}" is wrong answer ;(. Correct answer was "${correctAnswer[gameType]}".`);
    console.log(`Let's try again, ${name}!`);
    return undefined;
  };
  return questions(1);
};
