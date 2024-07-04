
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '../styles/App.css';
import Home from './Home';
import AllTest from "../components/AllTest.js"
import Quiz from  './Quiz';
import Result from "./Result"
import CreateQuiz from './CreateQuiz';

const router=createBrowserRouter([
  {
    path:'/',
    element:<AllTest/>
  },
  {
    path:'/quiz/:quizCode',
    element:<Quiz />
  },
  {
    path:'/result',
    element:<Result/>
  },{
    path:'/createQuiz',
    element:<CreateQuiz/>
  }
])
function App() {
  return (
    <RouterProvider router={router}>
      <div className="App">
      React App
      </div>
    </RouterProvider>
  );
}

export default App;
