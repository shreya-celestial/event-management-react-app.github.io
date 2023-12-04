import { useEffect, useState } from 'react';
import cal from '../assets/cal.png';
import styles from '../styleModules/EventsList.module.css';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { allEvents } from '../apis.jsx';

const EventsList = ({ user }) => {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(true);
    const [events, setEvents] = useState(null);

    useEffect(() => {
        const data = async () => {
            const events = await allEvents(user);
            setIsPending(false);
            setEvents(events);
        }
        data();
    }, []);

    const handleClick = (id) => {
        navigate(`/event/${id}`);
    }

    return (
        <>
            {isPending && <h1 className={styles.loading}>Loading...</h1>}
            {events && <div className={styles.allEventsHere}>
                {!events.length && <h1 className={styles.noneShown}>NOTHING TO SHOW HERE</h1>}
                {events.map((event) => (
                    <div className={styles.eventTile} key={event.id} onClick={() => handleClick(event.id)}>
                        <div className={styles.calTile}>
                            <img src={cal} />
                            <h3>{event.name.text}</h3>
                        </div>
                        <p>Start: {moment(event.start.local).format('DD-MM-YYYY, LT')}</p>
                        <p className={styles.endDateEventTile}>End: {moment(event.end.local).format('DD-MM-YYYY, LT')}</p>
                    </div>
                ))}
                <div className={styles.eventTileExtra}></div>
            </div>}
        </>
    );
}

export default EventsList;