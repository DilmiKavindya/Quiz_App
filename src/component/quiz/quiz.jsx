import React, { useState, useRef } from "react";
import "./quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [lock, setLocked] = useState(false);
    const [score, setScore] = useState(0);

    const question = data[index];

    const optionListRef = useRef(null);

    const checkAns = (e, ans) => {
        if (lock) return;

        const options = optionListRef.current.querySelectorAll("li");

        if (question.ans === ans) {
            e.target.classList.add("correct");
            setScore(prev => prev + 1);
        } else {
            e.target.classList.add("incorrect");
            options[question.ans - 1].classList.add("correct");
        }

        setLocked(true);
    };

    const handleNext = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);

            const options = optionListRef.current.querySelectorAll("li");
            options.forEach((li) => {
                li.classList.remove("correct");
                li.classList.remove("incorrect");
            });

            setLocked(false);
        } else {
            setIndex(index + 1); // move past last question to show score
        }
    };

    const handleReset = () => {
        setIndex(0);
        setScore(0);
        setLocked(false);

        const options = optionListRef.current?.querySelectorAll("li");
        options?.forEach((li) => {
            li.classList.remove("correct");
            li.classList.remove("incorrect");
        });
    };

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />

            {index < data.length ? (
                <>
                    <h2>{index + 1}. {question.question}</h2>

                    <ul ref={optionListRef}>
                        <li onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>

                    <button onClick={handleNext}>Next</button>

                    <div className="index">
                        {index + 1} of {data.length} questions
                    </div>

                    <div className="current-score">
                        Current Score: {score} / {data.length}
                    </div>
                </>
            ) : (
                <div className="score">
                    <h2>Quiz Completed!</h2>
                    <p>Your Score: {score} / {data.length}</p>
                    <button className="reset-btn" onClick={handleReset}>Reset</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
