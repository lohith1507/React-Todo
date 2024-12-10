import React, { useEffect, useState } from 'react'
import TimeButtons from './TimeButtons';
import StartresetButtons from './Start-resetButtons';

export default function TimeDisplay() {

const [time, setTime] = useState(0);
const [runState , setRunState] = useState(false);

    useEffect(()=>{
        let timer = 0;
        if(runState && time > 0){
            timer = setInterval(()=>{
                setTime(prevTime => prevTime -1);
            }, 1000);
        }
        else if(time === 0){
            setRunState(false);
        }
        return () => clearInterval(timer);
    },[runState, time]);

    const addTime = (sec) => {
        setTime(prevTime=>prevTime + sec);
    }

    const formatTime = (sec) =>{
        const min = Math.floor(sec/60);
        const secsec = sec % 60;
        return `${min.toString().padStart(2, '0')} : ${secsec.toString().padStart(2, '0')}`
    }

    const handleStartStop = () =>{
        setRunState(!runState);
    }

    const handleReset = () =>{
        setTime(0);
        setRunState(false);
    }


  return (
    <>
        <h2 className='text-center'>TimerDisplay</h2>
        <div style={{textAlign:'center' ,padding:'10px'}}>
            Current Time : <span style={{fontWeight:'bold'}}>{formatTime(time)}</span>
        </div>

        <TimeButtons addTime={addTime} />

        <StartresetButtons handleStartStop={handleStartStop} handleReset={handleReset} runState={runState}/>

    </>
  )
}
