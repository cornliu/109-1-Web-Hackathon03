import Question from '../models/Question'
import Answer from '../models/Answer'
exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  Question.find().exec((err,qus)=>{
    if (err) res.send({'message': 'error', 'contents': []})
    res.send({'message': 'success', 'contents': qus})
  })
  
}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  Answer.find().exec((err,ans)=>{
    console.log(ans)
  })
}
