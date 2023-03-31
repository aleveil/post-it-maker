import { useState } from 'react'
import PostIt from './components/PostIt'
import PostItForm from './components/PostItForm';
import './App.css'

function App() {

  const [postItIdCount, setPostItIdCount] = useState(0);
  const [postItArray, setPostItArray] = useState([]);

  function getNewId() {
    setPostItIdCount((prev) => prev + 1);
    return postItIdCount;
  }

  function addNewPostIt(titleText, tasks, e) {
    e.preventDefault();
    setPostItArray([...postItArray, { id: getNewId(), title: titleText, tasks: [...tasks] }]);
  }

  function toggleTask(postItId, taskId) {
    let copyPostItArray = [...postItArray];
    setPostItArray(copyPostItArray.map(postIt => {
      if (postIt.id === postItId) {
        let updatedTasks = postIt.tasks.map(task => {
          if (task.id === taskId)
            return { ...task, isDone: !task.isDone };
          else
            return task;
        });
        return {...postIt, tasks: updatedTasks};
      }
      else
        return postIt;
    }));
  }

  function removePostIt(id) {
    setPostItArray( postItArray.filter(postIt => postIt.id !== id) );
  }

  return (
    <div className="App">
      <PostItForm addNewPostIt={addNewPostIt} />
      <ul className='post-it-list'>
        {postItArray.map((postIt) => (
          <PostIt key={postIt.id} postIt={postIt} toggleTask={toggleTask} removePostIt={removePostIt} />
        ))}
      </ul>
    </div>
  )
}
export default App