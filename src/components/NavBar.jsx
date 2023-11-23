import { Link } from 'react-router-dom';
import styles from '../styleModules/NavBar.module.css';
import { useRef } from 'react';

const NavBar = () => {

    const events = useRef();
    const create = useRef();

    const handleClick = (e) => {
        e.target.className = styles.active;
        if (events.current === e.target) {
            create.current.className = '';
        }
        else {
            events.current.className = '';
        }
    }

    return (
        <nav>
            <div className={styles.nav}>
                <h1>Event Organizee</h1>
                <div className={styles.details}>
                    <p>Shreya Garg</p>
                    <p>gargshreya122@gmail.com</p>
                </div>
            </div>
            <div className={styles.buttonsMargin}>
                <div className={styles.buttons}>
                    <Link to='/' ref={events} className={styles.active} onClick={handleClick}>All Events</Link>
                    <Link to='/create' ref={create} onClick={handleClick}>Create Event</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;