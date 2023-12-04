import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from '../styleModules/UserPage.module.css';
import NavBar from './NavBar';
import Event from './Event';
import CreateUpdateEvent from './CreateUpdateEvent';
import EventsList from './EventsList';

const UserPage = ({ user }) => {
    return (
        <Router>
            <NavBar />
            <div className={styles.container}>
                <Routes>
                    <Route exact path='/' element={<EventsList user={user} />} />
                    <Route exact path='/create' element={<CreateUpdateEvent />} />
                    <Route exact path='/:id' element={<Event />} />
                    <Route exact path='/:id/edit' element={<CreateUpdateEvent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default UserPage;