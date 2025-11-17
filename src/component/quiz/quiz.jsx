import React, { useState, useRef } from "react";
import "./quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [lock, setLocked] = useState(false);

    const question = data[index];

    // To limit DOM selection to only this quiz
    const optionListRef = useRef(null);

    const checkAns = (e, ans) => {
        if (lock) return; // stop clicking more

        const options = optionListRef.current.querySelectorAll("li");

        if (question.ans === ans) {
            e.target.classList.add("correct");
        } else {
            e.target.classList.add("incorrect");

            // Highlight correct answer
            options[question.ans - 1].classList.add("correct");
        }

        setLocked(true);
    };

    const handleNext = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);

            const options = optionListRef.current.querySelectorAll("li");

            // Reset styles
            options.forEach((li) => {
                li.classList.remove("correct");
                li.classList.remove("incorrect");
            });

            setLocked(false);
        }
    };

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />

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
        </div>
    );
};

export default Quiz;
