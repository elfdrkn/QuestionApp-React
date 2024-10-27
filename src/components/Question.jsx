import { useState, useEffect } from 'react';
import { questions } from '../data/questions.js';  //  Import questions

const Question = ({ onAnswerSelection, onFinishTest }) => {
    const [showOptions, setShowOptions] = useState(false); // We check whether the options are displayed or not
    const [currentQuestion, setCurrentQuestion] = useState(0); // Holds the displayed problem index (number)
    const [correctAnswers, setCorrectAnswers] = useState(0); // Counts the number of correct answers
    const [selectedOption, setSelectedOption] = useState(null); // It follows the option the user chooses
    const [timer, setTimer] = useState(30);  // It keeps track of the time the user has for each question

    useEffect(() => {
        const showOptionsTimeout = setTimeout(() => {
            setShowOptions(true); // After 4 second show the options
        }, 4000);

        // Sayaç her saniye bir azalacak
        const countdownInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer -1;
                } else {
                    goToNextQuestion();
                    return 30;
                }                
        });
     }, 1000);
        
         // Component cleaning: we stop timer and interval
        return () => {
            clearTimeout(showOptionsTimeout); 
            clearInterval(countdownInterval);
        };    
    }, [currentQuestion]);

        // // Function that updates the question and resets the timer
        const goToNextQuestion = () => {
            setSelectedOption(null);  // Clears the selected option
            setShowOptions(false); // Hides the options again
            setTimer(30);  // Sets the counter back to 30 for the new question
            if (currentQuestion < questions.length - 1){
                setCurrentQuestion((prev) => prev + 1); // Moves to the next question by incrementing the currentQuestion index by one
            } else {
                onFinishTest();
            }    
        };

        const handleOptionClick = (option) => {
            setSelectedOption(option);
            const isCorrect = option === questions[currentQuestion].answer;
            onAnswerSelection(isCorrect, option);
                       
            setTimeout(() => {
                goToNextQuestion();
            }, 1000); // We wait 1 second after user click
        };

        const question = questions[currentQuestion];  // We take the current question

    return (
        <div>
            <img
                src={`/pictures/${question.media}`} alt="Question Media"
                style={{ width: '400px%' , height:'300px', objectFit: 'cover', borderRadius:'8px'}}/>
            <h2> {question.question}</h2>
            <p>🕒 {timer} saniye</p> {/* We show the remaining time */}
            {showOptions && (
                <ul>
                    {question.options.map((option, index) => (
                        <li key={index} 
                        onClick={() => handleOptionClick(option)} style={{ cursor:'pointer'}} > 
                         {option}
                        </li>
                    ))}
                </ul>
            )}
            {selectedOption && (
                <p>
                    {selectedOption === question.answer ? "Doğru!" : "Yanlış!"}
                </p>
            )}
        </div>
    );
};

export default Question;