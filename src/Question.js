import React, { Component } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      contents: [],
      ans: [],
      score: 0,
      current_question: 0
    }
  }

  next = () => {
    // implement here
  }

  choose = () => {
    // implement here
  }

  getQuestions = () => {
    // implement here
  }

  componentDidMount() {
    this.getQuestions()
  }

  render() {
    const contents = this.state.contents
    const current = this.state.current_question
    const score = this.state.score
    const ans = this.state.ans

    return (
      <div id="quiz-container">
        {contents.length ?
          <React.Fragment>
            <div id="question-box">
              <div className="question-box-inner">

              </div>
            </div>

            <div id="question-title">
              
            </div>

            <div id="options">
              
            </div>
            
            <div id="actions" onClick={this.next}>
              NEXT
            </div>
          </React.Fragment>
          : <React.Fragment></React.Fragment>
        }
      </div>
    )
  }
}

export default Question
