import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Common/Header';
import ListStudent from './pages/Student/ListStudent';
import ListMajor from './pages/Major/ListMajor';
import ListFaculty from './pages/Faculty/ListFaculty';
import { LinkStudentList, LinkFacultyList, LinkMajorList } from './Routes';

function App() {
  return (
    <div>
      <Header />
      <div className="content">
        <Routes>
          <Route path={LinkStudentList.route} element={<ListStudent />} />
          <Route path={LinkMajorList.route} element={<ListMajor />} />
          <Route path={LinkFacultyList.route} element={<ListFaculty />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
