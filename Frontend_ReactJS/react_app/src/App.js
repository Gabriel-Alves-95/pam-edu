import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const Home = lazy(() => import("./pages/Home/Home"));
const CreateProfile = lazy(() => import("./pages/CreateProfile/CreateProfile"));
const CreateCourse = lazy(() => import("./pages/CreateCourse/CreateCourse"));
const ListTeachers = lazy(() => import("./pages/ListTeachers/ListTeachers"));
const ListStudents = lazy(() => import("./pages/ListStudents/ListStudents"));
const ListAdults = lazy(() => import("./pages/ListAdults/ListAdults"));
const ListCourses = lazy(() => import("./pages/ListCourses/ListCourses"));

function App() {
  
  return(
    <Router>
      <CustomNavbar />
      <Suspense fallback={"Carregando..."}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create/:endpoint" element={<CreateProfile />} />
          <Route path="/create/courses" element={<CreateCourse />} />
          <Route path="/list/teachers" element={<ListTeachers />} />      
          <Route path="/list/adults" element={<ListAdults />} />
          <Route path="/list/students" element={<ListStudents />} />
          <Route path="/list/courses" element={<ListCourses />} />
        </Routes>
      </Suspense>
    </Router>

  )

}

export default App;