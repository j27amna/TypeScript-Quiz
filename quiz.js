#! usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs/promises";
console.log(chalk.bold.overline.bgCyanBright("\n\t\t\tTypeScript QUIZ\n"));
console.log("-".repeat(75));
let data = await fs.readFile("data.json", 'utf-8');
const quesObject = JSON.parse(data);
let loop = 1;
let quesArr = quesObject.map((item) => {
    let singleQues = {
        name: "Ques #" + loop,
        type: "list",
        choices: item.answers,
        message: item.question
    };
    loop++;
    return singleQues;
});
quesObject.forEach((item, index) => {
    let singleQues = {
        name: "Ques #" + index,
        type: "list",
        choices: item.answers,
        message: item.question
    };
    quesArr.push(singleQues);
});
let answers1 = await inquirer.prompt(quesArr);
let answersArr = Object.values(answers1);
quesObject.forEach((item, index) => {
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
