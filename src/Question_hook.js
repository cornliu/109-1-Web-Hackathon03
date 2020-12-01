import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [currentans, setcurrentans] = useState(0)
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question
  const [ansNum, setansNum] = useState(0)
  const [option, setoption] = useState([])
  const [checks, setchecks] = useState([false, false, false, false])
  const next = async () => {
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
    if (current_question !== contents.length-1) setCurrentQuestion(current_question+1)
    let _ans = ans 
    _ans.push(currentans)
    setAns(_ans)
    setchecks([false, false, false, false])
    if (current_question === contents.length){
      const {
        data: { score }
      } = await instance.post('/checkAns', { answer: ans })
    }
  }

  const choose = () => {
    // TODO : update 'ans' for the option you clicked
  }
  const getQuestions = async () => {
    // TODO : get questions from backend
    const {data: {message, contents}} = await instance.get('/getContents')
    // console.log(contents)
    let qlist = []
    let optlist = []
    contents.forEach(element => {
      qlist.push(element.question)
      optlist.push(element.options)
    });
    setoption(optlist)
    setContents(qlist)
    setansNum(qlist.length)
  }



  useEffect(() => {
    if (!contents.length)
      getQuestions()
  })

  // TODO : fill in the rendering contents and logic
  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
              Question {current_question+1} of {ansNum}
            </div>
          </div>

          <div id="question-title">
            {contents[current_question]}
          </div>

          <div id="options">
            <>
            {
              option[current_question].map((task)=>{
                let nameid = option[current_question].indexOf(task)
                let _name = 'q'+String(current_question+1)+'_'+String(nameid+1)
                return <div className="each-option">
                  <input 
                    type="radio" 
                    name={_name} 
                    id={nameid+1}
                    key={nameid+1}
                    checked={checks[nameid]}
                    onChange={()=>{
                      let a = checks
                      a[nameid] = !a[nameid]
                      setchecks(a)
                      setcurrentans(nameid+1)
                    }}
                  /><span>{task}</span></div>
              }
              
              )
            }
            </>
          </div>
          
          <div id="actions" onClick={next}>
            NEXT
          </div>
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
