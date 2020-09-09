import {Quiz, QuestionType} from './../Types/quiz_types';

const shuffleArray = (array: any[])=>[...array].sort(()=>Math.random() - 0.5);

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard" 
}

export const getQuizDetails = async(totalQuestions:number,defficulty:Difficulty):Promise<QuestionType[]>=>{
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${defficulty}&type=multiple`)
    let {results} = await res.json();

    // console.log(results);
    const quiz:QuestionType[] = results.map((questionObj: Quiz)=>{
        return{
            question: questionObj.question,
            answer: questionObj.correct_answer,
            correct_answer: questionObj.correct_answer,
            option: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
        }
    })
    return quiz;
}