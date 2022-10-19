import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Common/Header';
import ListTest from './pages/Student/listtest';
import ListMajor from './pages/Major/ListMajor';
import { LinkStudentList, LinkFacultyList, LinkMajorList } from "./Routes";

function App() {
  return (
    <div>
      <Header />
      <div className="content">
        <Routes>
          <Route path={LinkStudentList} element={<ListTest />} />
          <Route path={LinkMajorList} element={<ListMajor />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
