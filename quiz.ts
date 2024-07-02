#! usr/bin/env node

import inquirer, { Answers } from "inquirer";
import chalk from "chalk";
import fs from "fs/promises";
import Choices from "inquirer/lib/objects/choices.js";

console.log(chalk.bold.overline.bgCyanBright("\n\t\t\tTypeScript QUIZ\n"));
console.log("-".repeat(75));

let data : string = await fs.readFile("data.json", 'utf-8');
const quesObject : any[] = JSON.parse(data);

let loop : number = 1;

let quesArr : Answers[] = quesObject.map( (item) => {
    let singleQues : Answers = {
        name:"Ques #" + loop,
        type:"list",
        choices: item.answers,
        message: item.question 
    }
    loop++;
    return singleQues
})

quesObject.forEach((item, index) => {
    let singleQues : Answers = {
        name:"Ques #" + index,
        type:"list",
        choices: item.answers,
        message: item.question 
    }
    quesArr.push(singleQues)
});

let answers1 = await inquirer.prompt (quesArr);

let answersArr = Object.values(answers1);

quesObject.forEach( (item, index) => {

    if (answersArr[index] == item.correctAnswer) {
        console.log(`Question: ${item.question}\n`);
        console.log(chalk.greenBright(`Correct: ${item.answers}`));
    }

    else {
        console.log(`Question: ${item.question}\n`);
        console.log(chalk.redBright(`Wrong\t The correct answer is ${item.answers} `));
        console.log(`Your Answer was: ${answersArr[index]}`);
    }
});


