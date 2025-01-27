import React from 'react'
import Navbar from './Navbar'
const Timer = () => {
    return (
        <div>
            <Navbar/>
            <main className='container'>
                <div className="timer">
                    <h1>My-Pomodoro</h1>
                    <p>25:00</p>
                </div>

            </main>

        </div>
    )
}

export default Timer
