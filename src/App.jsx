import { useEffect, useState } from 'react'
import './App.css'
import * as tf from '@tensorflow/tfjs'
import * as speech from '@tensorflow-models/speech-commands'

function App() {
  const [model, setModel] = useState(null);
  const [action, setAction] = useState(null);
  const [labels, setLabels] = useState(null);

  const loadModel = async()=>{

    const recognizer = await speech.create("BROWSER_FFT");
    console.log('Model Loaded');

    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
    
    setModel(recognizer);
    setLabels(recognizer.wordLabels());1
  }

  const recognizerCommands = async()=>{
    console.log('Listening for commands');
    
    model.listen(result =>{

      console.log(result.spectrogram);
      
      setAction(labels[argMax(Object.values(result.scores))])

    }, {includeSpectogram: true, probabilityThreshold: 0.9 })
    
    setTimeout(()=>model.stopListening(), 10e3)
  }

  useEffect(()=>{loadModel()},[])

  function argMax(arr){
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

  return (
    <> 
      <div className={`cuadrado ${action==='down'?'active':''}`}>down</div>
      <div className={`cuadrado ${action==='eight'?'active':''}`}>eight</div>
      <div className={`cuadrado ${action==='five'?'active':''}`}>five</div>
      <div className={`cuadrado ${action==='four'?'active':''}`}>four</div>
      <div className={`cuadrado ${action==='go'?'active':''}`}>go</div>
      <div className={`cuadrado ${action==='left'?'active':''}`}>left</div>
      <div className={`cuadrado ${action==='nine'?'active':''}`}>nine</div>
      <div className={`cuadrado ${action==='no'?'active':''}`}>no</div>
      <div className={`cuadrado ${action==='one'?'active':''}`}>one</div>
      <div className={`cuadrado ${action==='right'?'active':''}`}>right</div>
      <div className={`cuadrado ${action==='seven'?'active':''}`}>seven</div>
      <div className={`cuadrado ${action==='six'?'active':''}`}>six</div>
      <div className={`cuadrado ${action==='stop'?'active':''}`}>stop</div>
      <div className={`cuadrado ${action==='three'?'active':''}`}>three</div>
      <div className={`cuadrado ${action==='two'?'active':''}`}>two</div>
      <div className={`cuadrado ${action==='up'?'active':''}`}>up</div>
      <div className={`cuadrado ${action==='yes'?'active':''}`}>yes</div>
      <div className={`cuadrado ${action==='zero'?'active':''}`}>zero</div>
      <div>
        <button onClick={()=>recognizerCommands()}>Command</button>
        {action ? <div>{action}</div>:<div>No Action Detected</div> }
      </div>
    </>
  )
}

export default App
