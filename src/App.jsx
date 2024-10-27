import { useState } from 'react';
import './App.css';
import Question from './components/Question';
import ResultScreen from './components/ResultScreen';
import { questions } from './data/questions';


function App() {
  const [isTestStarted, setIsTestStarted] = useState(false); //Since the initial value is false, when the page first loads the user sees the login screen to start the test.
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleStartTest = () => {
    setIsTestStarted(true); // Starts the test when the button is pressed
  };

  const handleAnswerSelection = (isCorrect, selectedOption) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedOption]);
    if (isCorrect) {
        setCorrectAnswers((prevCorrect) => prevCorrect + 1);
    }
};

  const handleFinishTest = () => {
    setIsTestFinished(true);
};

  return (
    <div className='App'>
      {!isTestStarted ? (
        <div>
          <h1>Teste Hoş Geldiniz!</h1>
          <p>Sizi 10 soruluk bir test bekliyor. Başlamak için 'Teste Başla' butonuna tıklayın.Unutmayın, her soru için yalnızca 30 saniyeniz var! ⏳</p>
          <button id="start" onClick={handleStartTest}>Teste Başla</button>
        </div>
      ) : isTestFinished ? (
        <ResultScreen
          questions={questions}
          correctAnswers={correctAnswers}
          userAnswers={userAnswers}
          />
      ) : (
        <Question
          onAnswerSelection={handleAnswerSelection} 
          onFinishTest={handleFinishTest} 
          />
      )}
    </div>
  );
}

export default App
