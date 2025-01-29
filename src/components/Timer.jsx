import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar'
import toast from 'react-hot-toast';

const Timer = () => {

    const [timeLeft, settimeLeft] = useState(1500);
    const [isRunning, setisRunning] = useState(false);
    const [isWorkSession, setisWorkSession] = useState(true);
    const isWorkSessionRef = useRef(isWorkSession);
    const [sessionCount, setSessionCount] = useState(0);

    useEffect(() => {
        isWorkSessionRef.current = isWorkSession;

    }, [isWorkSession])


    useEffect(() => {

        if (!isRunning) return;

        const interval = setInterval(() => {
            settimeLeft((prevTime) => {
                if (prevTime <= 1) {


                    const nextSession = !isWorkSessionRef.current;
                    if (nextSession) {
                        setSessionCount((prevCount) => {
                            if (prevCount >= 3) return 1;
                            return prevCount + 1;
                        })
                    }

                    let nextTime
                    if (sessionCount >= 3 && !nextSession) {
                        nextTime = 15 * 60;
                        // alert("Great Work Take A long break!!")
                        toast.success("Great Work Take A long break!!")
                        setSessionCount(0);


                    }
                    else {
                        nextTime = nextSession ? 25 * 60 : 5 * 60;
                    }


                    setisWorkSession(nextSession)
                    setisRunning(false);
                    // alert(nextSession ? 'Start Working!!' : 'Break Time!!');
                    toast.success(nextSession ? 'Start Working!!' : 'Break Time!!')
                    return nextTime;
                }
                return prevTime - 1;
            })
        },1000)




        return () => clearInterval(interval);



    }, [isRunning])

    const toggleTimer = () => setisRunning(!isRunning)

    const formatTime = (sec) => {

        const mins = Math.floor(sec / 60).toString().padStart(2, '0');
        const secs = Math.floor(sec % 60).toString().padStart(2, '0');

        return `${mins}:${secs}`;



    }

    const resetTimer = () => {
        setisRunning(false);
        settimeLeft(1500);
        setSessionCount(0);
        setisWorkSession(true);
    }

    return (
        <>

            <div>
                <Navbar />


                <main className='container'>

                    <div className="timer">
                        <div className='text'>
                            <h1>My-Pomodoro</h1>
                            <div className='session-indicator indicator'>

                                <p className={isWorkSession ? 'work' : 'break'}>{isWorkSession ? 'Working Time' : 'Take a Break!'}</p>

                            </div>


                        </div>


                        <div className="progress-ring">
                            <svg width="220" height="220" viewBox="0 0 220 220">
                                <circle
                                    className="progress-circle"
                                    stroke={isWorkSession ? '#ffd700' : '#00ffaa'}
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    fill="transparent"
                                    r="95"
                                    cx="110"
                                    cy="110"
                                    style={{
                                        strokeDasharray: `${(timeLeft / (isWorkSession ? 1500 : 300)) * 597}`,
                                        strokeDashoffset: 0
                                    }}
                                />
                            </svg>
                            <h2 className="timer-text">{formatTime(timeLeft)}</h2>
                        </div>
                        <div>

                            {/* <h2>{formatTime(timeLeft)}</h2> */}
                            <button onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
                            <button onClick={resetTimer}>Reset</button>

                        </div>


                    </div>

                </main>

            </div>
        </>
    )
}

export default Timer
