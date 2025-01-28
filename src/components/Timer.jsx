import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar'
const Timer = () => {

    const [timeLeft, settimeLeft] = useState(1500);
    const [isRunning, setisRunning] = useState(false);
    const [isWorkSession, setisWorkSession] = useState(true);
    const isWorkSessionRef = useRef(isWorkSession);

    useEffect(()=>{
        isWorkSessionRef.current = isWorkSession;
    }, [isWorkSession])

    
    useEffect(()=>{

        if(!isRunning) return;

        const interval = setInterval(()=>{
            settimeLeft((prevTime)=> {
                if(prevTime <= 1)
                {

                    const nextSession = !isWorkSessionRef.current;
                    const nextTime = nextSession ? 25 * 60 : 5*60;
                    setisWorkSession(nextSession)
                    setisRunning(false);
                    alert(nextSession ? 'Start Working!!' : 'Break Time!!');
                    return nextTime;
                }
                return prevTime - 1;
            })
        }, )

        
        

        return ()=> clearInterval(interval);

        

    }, [isRunning])

    const toggleTimer = ()=> setisRunning(!isRunning)

    const formatTime = (sec)=>{

        const mins = Math.floor(sec / 60).toString().padStart(2, '0');
        const secs = Math.floor(sec % 60).toString().padStart(2, '0');

        return `${mins} : ${secs}`;



    }

    const resetTimer = ()=>{
        setisRunning(false);
        settimeLeft(1500);
        setisWorkSession(true);
    }

    return (
        <div>
            <Navbar/>
            <main className='container'>
                <div className="timer">
                    <h1>My-Pomodoro</h1>
                    <p>{isWorkSession ? 'Working Time' : 'Take a Break!'}</p>
                    <h2>{formatTime(timeLeft)}</h2>
                    <button onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
                    <button onClick={resetTimer}>Reset</button>
                    
                </div>

            </main>

        </div>
    )
}

export default Timer
