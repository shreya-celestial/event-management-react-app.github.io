import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const UserPage = ({ user }) => {
    console.log(user);
    return (
        <Router>
            <>Navbar</>
            <Routes>
                <Route exact path='/' element={<>hello</>} />
                <Route exact path='/create' element={<>create</>} />
            </Routes>
        </Router>
    );
}

export default UserPage;