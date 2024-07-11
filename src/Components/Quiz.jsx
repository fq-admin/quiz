import {useEffect,useRef,useState,useContext} from 'react'
import axios from 'axios'
import './Quiz.css'
import GlobalContext from '../Contexts/GlobalContext'

function Quiz() {
  const {sid,setSid} = useContext(GlobalContext)
  const [did,setDid] = useState(1)
    const [index, setIndex] = useState(0)
    // const [question,setQuestion] = useState(null)
    const [questions, setQuestions] = useState([]);
    const [lock,setLock] = useState(false)
    let [score,setScore] = useState(0)
    let [result,setResult] = useState(false)

    let option1=useRef(null)
    let option2=useRef(null)
    let option3=useRef(null)
    let option4=useRef(null)

    let option_array=[option1,option2,option3,option4]

    const checkAns=(e,ans)=>{
        if(lock===false){
            if(parseInt(questions[index].attributes.answer) === ans){
                e.target.classList.add('correct')
                setScore(score+1)
            }   
            else{
                e.target.classList.add('wrong')
                option_array[parseInt(questions[index].attributes.answer)-1].current.classList.add('correct')
            }
            setLock(true)
        }
    }

    const next=()=>{
        if(lock===true){
            if(index+1 === questions.length){
                setResult(true)
                return
            }
            setIndex(index+1)
            setLock(false)
            option_array.forEach((option)=>{
                option.current.classList.remove('correct')
                option.current.classList.remove('wrong')
            })
        }
    }

  
// useEffect(() => {
//   axios.get('http://localhost:1337/api/questions')
//     .then(response => {
//       console.log(response.data.data)
//       const d = response.data.data;
//       console.log(d[0].attributes.option1);
//       setQuestions(d);
//     });
// }, []);

//   if(index >= questions.length) return <div>Quiz Completed</div>

const reset=()=>{
  setIndex(0)
  setScore(0)
  setResult(false)
  setLock(false)
}

  const handleLevel=(e)=>{
    const id=e.target.value
    console.log(e.target.value)
    setDid(id)
  }

  const handleStart=()=>{
    console.log(sid)
    axios.get(`http://localhost:1337/api/questions?filters[subtopic][id][$eq]=${sid}&filters[level][id][$eq]=${did}`)
    .then(response => {
      console.log(response.data.data)
      const d = response.data.data;
      setQuestions(d);
    })
    .catch(error => {
      console.error('There was an error fetching the topics!', error);
    });
  }

  if(questions.length==0) return(
    <div>
      <h3>set difficulty</h3>
      <select onChange={handleLevel}>
        <option value={1}>easy</option>
        <option value={2}>medium</option>
        <option value={3}>hard</option>
      </select>
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  )

  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        {result?<>
            <h2>You Scored {score} out of {questions.length}</h2>
            <button onClick={reset}>Reset</button>
        </>:<>
        <h3>{index+1}. {questions[index].attributes.q}</h3>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{questions[index].attributes.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{questions[index].attributes.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{questions[index].attributes.option3}</li>
            <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{questions[index].attributes.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className='index'>{index+1} of {questions.length} questions</div>
        </>
        }
    </div>
  )
}

export default Quiz