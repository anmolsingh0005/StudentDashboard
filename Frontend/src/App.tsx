import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Course from './component/course/Courselisting';
import Home from './component/Home';
import CourseDetail from './component/course/CourseDetail';
import CourseIntro from './component/course/CourseIntro';

function App() {
  return (
    <Routes>
      <Route  path="/" element={<Dashboard />} >
        <Route index element={<Home/>} />
        <Route path="home" element={<Home/>} />
        <Route path="course" element={<CourseIntro/>} >
          <Route index element={<Course/>} />
          <Route path=":id" element={<CourseDetail/>} />
          </Route>
        </Route>
    </Routes>
  );
}

export default App;
