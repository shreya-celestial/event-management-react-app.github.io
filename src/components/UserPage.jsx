import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from '../styleModules/UserPage.module.css';
import NavBar from './NavBar';

const UserPage = ({ user }) => {

    return (
        <Router>
            <NavBar />
            <div className={styles.container}>
                <Routes>
                    <Route exact path='/' element={<>hello</>} />
                    <Route exact path='/create' element={<>create</>} />
                </Routes>
            </div>
        </Router>
    );
}

export default UserPage;