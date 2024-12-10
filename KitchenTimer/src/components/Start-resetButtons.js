import React from 'react'

export default function StartresetButtons({handleStartStop,handleReset,runState}) {
  return (
    <div>

        <button onClick={handleStartStop} className='btn btn-primary timerbuttons'>
          {runState ? 'Stop' : 'Start'}
        </button>

        <button onClick={handleReset} className='btn btn-primary timerbuttons'>Reset</button>
    </div>
  )
}
