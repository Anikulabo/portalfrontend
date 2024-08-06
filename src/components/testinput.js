export const subjects = [
  { id: 1, name: "physics", teacher: "Mr.Lawal" },
  { id: 2, name: "chemistry", teacher: "Mrs.Ajibola" },
  { id: 3, name: "food&nut", teacher: "Miss.Dorcas" },
  { id: 4, name: "computer", teacher: "Mr.Dele" },
  { id: 5, name: "biology", teacher: "Mrs.Oluwole" },
  { id: 6, name: "agric", teacher: "Mr.Azeez" },
  { id: 7, name: "mathematics", teacher: "Mr.Adewale" },
  { id: 8, name: "phe", teacher: "Miss.Nike" },
  { id: 9, name: "history", teacher: "Miss.Esther" },
  { id: 10, name: "basic_electronics", teacher: "Mr.Ogunniran" },
  { id: 11, name: "Economics", teacher: "Mr.Fakuti" },
];
export const studentsession = [
  {
    sessionName: "2019/2020",
    term: "first term",
    categoryName: "junior",
    year: 2,
  },
  {
    sessionName: "2019/2020",
    term: "second term",
    categoryName: "junior",
    year: 2,
  },
  {
    sessionName: "2019/2020",
    term: "third term",
    categoryName: "junior",
    year: 2,
  },
  {
    sessionName: "2020/2021",
    term: "first term",
    categoryName: "junior",
    year: 3,
  },
  {
    sessionName: "2020/2021",
    term: "second term",
    categoryName: "junior",
    year: 3,
  },
  {
    sessionName: "2020/2021",
    term: "third term",
    categoryName: "junior",
    year: 3,
  },
  {
    sessionName: "2021/2022",
    term: "first term",
    categoryName: "senior",
    year: 1,
  },
  {
    sessionName: "2021/2022",
    term: "second term",
    categoryName: "senior",
    year: 1,
  },
  {
    sessionName: "2021/2022",
    term: "second term",
    categoryName: "senior",
    year: 1,
  },
];
export const teacherSubject = [
  { name: "mathematics", categoryName: "basic", year: 1 },
  { name: "mathematics", categoryName: "basic", year: 2 },
  { name: "mathematics", categoryName: "junior", year: 3 },
  { name: "mathematics", categoryName: "junior", year: 1 },
  { name: "basic_electronics", categoryName: "senior", year: 1 },
  { name: "chemistry", categoryName: "senior", year: 2 },
];
export const sessions = [
  { id: 1, sessionName: "2019/2020" },
  { id: 2, sessionName: "2020/2021" },
  { id: 3, sessionName: "2021/2022" },
  { id: 4, sessionName: "2022/2023" },
  { id: 5, sessionName: "2023/2024" },
];
export const all_students = [
  { id: 1, first_name: "kelvin", last_name: "Peters", regNo: "20190101" },
  { id: 2, first_name: "wilson", last_name: "Peters", regNo: "20190102" },
  { id: 3, first_name: "mary", last_name: "Johnson", regNo: "20190103" },
  { id: 4, first_name: "james", last_name: "Brown", regNo: "20190104" },
  { id: 5, first_name: "patricia", last_name: "Williams", regNo: "20190105" },
  { id: 6, first_name: "robert", last_name: "Jones", regNo: "20190106" },
  { id: 7, first_name: "jennifer", last_name: "Garcia", regNo: "20190107" },
  { id: 8, first_name: "micheal", last_name: "Miller", regNo: "20190108" },
  { id: 9, first_name: "linda", last_name: "Davis", regNo: "20190109" },
  { id: 10, first_name: "david", last_name: "Martinez", regNo: "20190110" },
];
export const classes = [
  { id: 1, name: "jSS1" },
  { id: 2, name: "jSS2" },
  { id: 3, name: "jSS3" },
  { id: 4, name: "SSS1A" },
  { id: 5, name: "SSS1B" },
  { id: 6, name: "SSS1C" },
  { id: 7, name: "SSS2A1" },
  { id: 8, name: "SSS2A2" },
  { id: 9, name: "SSS2B" },
  { id: 10, name: "SSS2c" },
];
export const all_teachers = [
  { id: 1, fname: "oladele", lname: "Godfrey", Staff_id: "20191" },
  { id: 2, fname: "agboke", lname: "Elizabeth", Staff_id: "20192" },
  { id: 3, fname: "samuel", lname: "Johnson", Staff_id: "20193" },
  { id: 4, fname: "grace", lname: "Smith", Staff_id: "20194" },
  { id: 5, fname: "christopher", lname: "Williams", Staff_id: "20195" },
  { id: 6, fname: "jessica", lname: "Brown", Staff_id: "20196" },
  { id: 7, fname: "daniel", lname: "Davis", Staff_id: "20197" },
  { id: 8, fname: "sophia", lname: "Martinez", Staff_id: "20198" },
  { id: 9, fname: "matthew", lname: "Garcia", Staff_id: "20199" },
  { id: 10, fname: "emma", lname: "Miller", Staff_id: "20200" },
];
export const categories = [
  { id: 1, categoryName: "Basic", years: 6 },
  { id: 2, categoryName: "Junior", years: 3 },
  { id: 3, categoryName: "Senior", years: 3 },
];
export const departments = [
  { id: 1, category_id: 3, name: "science" },
  { id: 2, category_id: 3, name: "art" },
  { id: 3, category_id: 3, name: "commercial" },
];
export const mockData = [
  {
    id: 1,
    first_name: "kelvin",
    last_name: "Peters",
    categoryName: "Senior",
    department: "Science",
    year: 2,
    sex: "Male",
    DOB: "2000-01-15",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, USA",
    class: "SS2A",
    session: "2019/2020",
  },
  {
    id: 2,
    first_name: "wilson",
    last_name: "Peters",
    categoryName: "Senior",
    department: "Art",
    year: 1,
    sex: "Male",
    DOB: "1999-05-22",
    email: "jane.smith@example.com",
    address: "456 Elm St, Othertown, USA",
    class: "SS1B",
    session: "2020/2021",
  },
  {
    id: 3,
    first_name: "mary",
    last_name: "Johnson",
    categoryName: "Senior",
    department: "Commercial",
    year: 1,
    sex: "Female",
    DOB: "2001-03-10",
    email: "alice.johnson@example.com",
    address: "789 Oak St, Sometown, USA",
    class: "SS1C",
    session: "2020/2021",
  },
  {
    id: 4,
    first_name: "james",
    last_name: "Brown",
    categoryName: "Junior",
    department: "All",
    year: 3,
    sex: "Male",
    DOB: "1998-12-05",
    email: "bob.brown@example.com",
    address: "101 Maple St, Anothertown, USA",
    class: "JSS3D",
    session: "2020/2022",
  },
  {
    id: 5,
    first_name: "patricia",
    last_name: "Williams",
    categoryName: "Senior",
    department: "Commercial",
    year: 1,
    sex: "Female",
    DOB: "2001-03-10",
    email: "alice.johnson@example.com",
    address: "789 Oak St, Sometown, USA",
    class: "SS1C",
    session: "2020/2021",
  },
  {
    id: 6,
    first_name: "robert",
    last_name: "Jones",
    categoryName: "Senior",
    department: "Commercial",
    year: 1,
    sex: "Male",
    DOB: "2001-03-10",
    email: "alice.johnson@example.com",
    address: "789 Oak St, Sometown, USA",
    class: "SS1C",
    session: "2020/2021",
  },
  {
    id: 7,
    first_name: "jennifer",
    last_name: "Garcia",
    categoryName: "Senior",
    department: "Commercial",
    year: 1,
    sex: "Female",
    DOB: "2001-03-10",
    email: "alice.johnson@example.com",
    address: "789 Oak St, Sometown, USA",
    class: "SS1C",
    session: "2020/2021",
  },
  {
    id: 8,
    first_name: "micheal",
    last_name: "Miller",
    categoryName: "Senior",
    department: "Commercial",
    year: 1,
    sex: "Male",
    DOB: "2001-03-10",
    email: "alice.johnson@example.com",
    address: "789 Oak St, Sometown, USA",
    class: "SS1C",
    session: "2020/2021",
  },
  {
    id: 9,
    first_name: "linda",
    last_name: "Davis",
    categoryName: "Senior",
    department: "Commercial",
    year: 1,
    sex: "Female",
    DOB: "2001-03-10",
    email: "alice.johnson@example.com",
    address: "789 Oak St, Sometown, USA",
    class: "SS1C",
    session: "2020/2021",
  },
  {
    id: 5,
    first_name: "patricia",
    last_name: "Williams",
    categoryName: "Senior",
    department: "Commercial",
    year: 1,
    sex: "Female",
    DOB: "2001-03-10",
    email: "alice.johnson@example.com",
    address: "789 Oak St, Sometown, USA",
    class: "SS1C",
    session: "2020/2021",
  },
  {
    id: 10,
    first_name: "david",
    last_name: "Martinez",
    categoryName: "Senior",
    department: "Commercial",
    year: 1,
    sex: "Female",
    DOB: "2001-03-10",
    email: "alice.johnson@example.com",
    address: "789 Oak St, Sometown, USA",
    class: "SS1C",
    session: "2020/2021",
  },
];
export const Teacher_mock_data = [
  {
    id: 1,
    teacherDetail: {
      fname: "oladele",
      lname: "Godfrey",
      email: "Godfrey@example.com",
      phoneNo: "08061283346",
      address: "789 Oak St, Sometown, USA",
    },
    subjects: 2,
    handling: "JSS1",
  },
  {
    id: 2,
    teacherDetail: {
      fname: "agboke",
      lname: "Elizabeth",
      email: "Elizabeth@example.com",
      phoneNo: "08061283346",
      address: "789 Oak St, Sometown, USA",
    },
    subjects: 1,
    handling: "JSS2",
  },
  {
    id: 3,
    teacherDetail: {
      fname: "samuel",
      lname: "Johnson",
      email: "Johnson@example.com",
      phoneNo: "08061283346",
      address: "789 Oak St, Sometown, USA",
    },
    subjects: 1,
    handling: "JSS3",
  },
  {
    id: 4,
    teacherDetail: {
      fname: "grace",
      lname: "Smith",
      email: "Smith@example.com",
      phoneNo: "08061283346",
      address: "789 Oak St, Sometown, USA",
    },
    subjects: 1,
    handling: "SSS1A",
  },
  {
    id: 5,
    teacherDetail: {
      fname: "christopher",
      lname: "Williams",
      email: "Williams@example.com",
      phoneNo: "08061283346",
      address: "789 Oak St, Sometown, USA",
    },
    subjects: 1,
    handling: "SSS1B",
  },
  {
    id: 6,
    teacherDetail: {
      fname: "jessica",
      lname: "Brown",
      email: "Brown@example.com",
      phoneNo: "08061283346",
      address: "789 Oak St, Sometown, USA",
    },
    subjects: 1,
    handling: "SSS1C",
  },
  {
    id: 7,
    teacherDetail: {
      fname: "daniel",
      lname: "Davis",
      email: "Davis@example.com",
      phoneNo: "08061283346",
      address: "789 Oak St, Sometown, USA",
    },
    subjects: 1,
    handling: "SSS2A1",
  },
  {
    id: 8,
    teacherDetail: {
      fname: "sophia",
      lname: "Martinez",
      email: "Martinez@example.com",
      phoneNo: "08061283346",
      address: "789 Oak St, Sometown, USA",
    },
    subjects: 1,
    handling: "SSS2A2",
  },
  {
    id: 9,
    teacherDetail: {
      fname: "matthew",
      lname: "Garcia",
      email: "Garcia@example.com",
      phoneNo: "08061283346",
      address: "789 Oak St, Sometown, USA",
    },
    subjects: 1,
    handling: "SSS2B",
  },
  {
    id: 10,
    teacherDetail: {
      fname: "emma",
      lname: "Miller",
      email: "Miller@example.com",
      phoneNo: "08061283346",
      address: "789 Oak St, Sometown, USA",
    },
    subjects: 3,
    handling: "SSS2C",
  },
];
// Logging the mock data to the console for verification
