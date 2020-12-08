import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  const [posts, setPosts] = useState();

  const getPosts = async () => {
    await runScrapeInterval()
    if(posts === undefined){
      const {data} = await axios.get('/api/posts/all');
      setPosts(data)
    }
    const timeout = setInterval(runScrapeInterval, 1500);
    setTimeout(()=>{
      clearInterval(timeout)
    },10000)
    
  }

  const runScrapeInterval = async () => {
      const {data} = await axios.get('/api/posts/scrape');
      console.log(data);
    }
  useEffect(()=>{
    getPosts();
  },[])
  return (
    <div className="App">
      {posts ? console.log(posts): <></>}
    </div>
  );
}

export default App;
