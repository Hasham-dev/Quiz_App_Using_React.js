import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails, Difficulty } from './services/quiz_service';
import { QuestionType } from '././Types/quiz_types'
import QuestionCard from './Components/QuestionCards';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init(
  {
    duration: 2000, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
  }
);

function App() {
  let [quiz, setQUiz] = useState<QuestionType[]>([])
  let [currentStep, setCurrentStep] = useState(0)
  let [score, setScore] = useState(0)
  let [showResult, setShowResult] = useState(false)


  useEffect(() => {
    async function fetchData() {
      const questions: QuestionType[] = await getQuizDetails(10, Difficulty.MEDIUM);
      // console.log(questions);
      setQUiz(questions);
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    const currentQuestion: QuestionType = quiz[currentStep];
    console.log("correct Ans:" + currentQuestion.correct_answer + " user selected: " + userAns);

    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }
    if (currentStep !== quiz.length - 1) {
      setCurrentStep(++currentStep);
    }
    else {
      setShowResult(true);
    }
  }

  if (!quiz.length)
    return <h3>Loading...</h3>

  if (showResult) {
    return (
      <Container maxWidth="sm" className="container">
        <div>
          <Paper elevation={3} className="Paper" data-aos="fade-up">
            <div className="result">
              <h1 data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine">Results</h1>
              <h2 data-aos="fade-left"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine">Your Final Score is</h2>
              <h3 data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"><b>{score}</b> Out Of <b>{quiz.length}</b></h3>
              <Button
                onClick={() => {
                  setCurrentStep(0)
                  setScore(0)
                  setShowResult(false)
                }}
                className="Button"
              >Reset</Button>
            </div>
          </Paper>
        </div>
      </Container>
    )
  }

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <h2>Question {currentStep + 1} out of {quiz.length}</h2>
      <QuestionCard
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />
    </div>
  );
}

export default App;
