import React from 'react'
import '../App.css';

export default function TimeButtons({addTime}) {
  return (
    <>
        <button className='btn btn-primary timerbuttons' onClick={()=>addTime(1)}>Add 1Sec</button>
        <button className='btn btn-primary timerbuttons' onClick={()=>addTime(10)}>Add 10Sec</button>
        <button className='btn btn-primary timerbuttons' onClick={()=>addTime(60)}>Add 1Min</button>
    
    </>
  )
}
