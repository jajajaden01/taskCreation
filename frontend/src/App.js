import React from 'react';
import {
   BrowserRouter as Router,
   Routes,
   Route
} from 'react-router-dom';
import LoginPage from './components/Login/Login';
import NotFoundPage from './components/NotFound/Notfound';
import CreateTask from './components/CreateTask/CreateTask';
import Tasks from './components/Tasks/Tasks';
import './App.css';

export default function App() {
   return (
     <Router>
        <div className='container'>
          <div className="text-center mt-1">
            <h3 >Test</h3>
          </div>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/tasks" element={<Tasks/>} />
            <Route path="/create-task" element={<CreateTask/>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </div>
      </Router>
   );
 }
