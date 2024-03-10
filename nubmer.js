#!/usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const hiddenNumber = randomInteger(0, 100);

const checkNumber = (number) => {
    number = Number(number);
    if (number > hiddenNumber) {
        rl.setPrompt('Больше\n');
        rl.prompt()
    }
    if (number < hiddenNumber) {
        rl.setPrompt('Меньше\n');
        rl.prompt()
    }
    if (number === hiddenNumber) {
        console.log('Отгадано число ', hiddenNumber);
        rl.close();
    }
}

rl.question('Загадано число в диапазоне от 0 до 100.\n', (answer) => {
    checkNumber(answer);
})

rl.on('line', (input) => checkNumber(input));