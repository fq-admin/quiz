// src/Home.js

import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import GlobalContext from '../Contexts/GlobalContext';

function Home() {
    const navigate = useNavigate();
    const {sid,setSid} = useContext(GlobalContext)
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [topicSelected, setTopicSelected] = useState(-1);

  useEffect(() => {
    // Fetch topics from Strapi
    axios.get('http://localhost:1337/api/topics?populate=subtopics')
      .then(response => {
        setTopics(response.data.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the topics!', error);
      });
  }, []);

  const handleTopicClick = (i,id) => {
    const topic = topics[i];
    setTopicSelected(id);
    // console.log(topic.attributes.subtopics.data);
    setSubtopics(topic.attributes.subtopics.data)
  };

  const handleSub=(id)=>{
    setSid(id)
    console.log(id)
    navigate('/quiz')
  }

  return (
    <div>
      <h1>Topics</h1>
      <div>
        {topics.map((topic,i) => (
          <div key={topic.id}>
            <div onClick={() => handleTopicClick(i,topic.id)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              {topic.attributes.name}
            </div>
            {topic.id===topicSelected?(
              <ul>
                {subtopics.map(subtopic => (
                  <li key={subtopic.id} onClick={()=>handleSub(subtopic.id)}>
                   {subtopic.attributes.name}
                  </li>
                ))}
              </ul>
            ):null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
