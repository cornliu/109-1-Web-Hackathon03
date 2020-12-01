import Question from '../models/Question'
import Answer from '../models/Answer'
// import router from '../server'
exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  Question.find().exec((err,qus)=>{
    if (err) res.status(403).send({message: 'error', contents: []})
    res.status(200).send({message: 'success', contents: qus})
  })
  
}


// router.post('/checkAns',(rq, rs)=>{
//     console.log(rs);
// })
exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  const answer = req.body.answer
  // console.log(answer);
  Answer.find().exec((err,ans)=>{
    // console.log(ans)
    let score = 0
    for (let i=0;i<answer.length;i++){
      if (answer[i] === ans[i]){
        score = score+1
      }
    }
    if (err) res.status(403).send({message: 'error', score: -1})
    res.status(200).send({message: 'success', score: score})
  })
  
  
}
