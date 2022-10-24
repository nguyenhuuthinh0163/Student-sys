interface pageInterface {
  name: string;
  route: string;
}

// Student list
const LinkStudentList: pageInterface = {
  name: 'Students',
  route: '/',
};
const LinkStudentAdd: string = '/add/student/';
const LinkStudentEdit: string = '/edit/student/:studentId';

// Faculty list
const LinkFacultyList: pageInterface = {
  name: 'Faculties',
  route: '/faculties',
};
const LinkFacultyAdd: string = '/add/faculty/';
const LinkFacultyEdit: string = '/edit/faculty/:facultyId';

// Major list
const LinkMajorList: pageInterface = {
  name: 'Majors',
  route: '/majors',
};
const LinkMajorAdd: string = '/add/major/';
const LinkMajorEdit: string = '/edit/major/:majorId';

// Profile
const Profile: pageInterface = {
  name: 'Profile',
  route: '/profile',
};

//Logout
const Logout: pageInterface = {
  name: 'Logout',
  route: '/logout',
};

export {
  pageInterface,
  LinkStudentList,
  LinkStudentAdd,
  LinkStudentEdit,
  LinkFacultyList,
  LinkFacultyAdd,
  LinkFacultyEdit,
  LinkMajorList,
  LinkMajorAdd,
  LinkMajorEdit,
  Profile,
  Logout,
};
