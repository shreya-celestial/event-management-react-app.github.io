import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from '../styleModules/UserPage.module.css';
import NavBar from './NavBar';
import Home from './Home';

const UserPage = ({ user }) => {
    return (
        <Router>
            <NavBar />
            <div className={styles.container}>
                <Routes>
                    <Route exact path='/' element={<Home user={user} />} />
                    <Route exact path='/create' element={<>create</>} />
                    <Route exact path='/:id' element={<>details</>} />
                    <Route exact path='/:id/edit' element={<>edit</>} />
                </Routes>
            </div>
        </Router>
    );
}

export default UserPage;