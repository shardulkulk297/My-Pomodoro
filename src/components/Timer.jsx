import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
const Timer = () => {

    const [timeLeft, settimeLeft] = useState(1500);
    const [isRunning, setisRunning] = useState(false);

    useEffect(()=>{

        if(!isRunning) return;

        const interval = setInterval(()=>{
            settimeLeft((prevTime)=> {
                if(prevTime <= 1)
                {
                    setisRunning(false);
                    alert('Time is up');
                    return 0;
                }
                return prevTime - 1;
            })
        }, 1000)

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
    }

    return (
        <div>
            <Navbar/>
            <main className='container'>
                <div className="timer">
                    <h1>My-Pomodoro</h1>
                    <h2>{formatTime(timeLeft)}</h2>
                    <button onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
                    <button onClick={resetTimer}>Reset</button>
                </div>

            </main>

        </div>
    )
}

export default Timer
