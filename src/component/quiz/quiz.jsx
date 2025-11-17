import React from "react";
import "./quiz.css";

const Quiz = () => {
    return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr/>
        <h2>Which device is required for the Internet connection?</h2>
        <ul>
            <li>Router</li>
            <li>Pen Drive</li>
            <li>Modem</li>
            <li>Hotspot</li>
        </ul>
        <button>Next</button>
        <div className="index">1 of 5 questions</div>
    </div>
    );
}

export default Quiz;