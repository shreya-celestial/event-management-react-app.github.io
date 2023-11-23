import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleEvent } from '../apis';
import styles from '../styleModules/Event.module.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Event = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { id } = useParams();
    const [isPending, setIsPending] = useState(true);
    const [eventDetails, setEventDetails] = useState(null);
    const nav = useNavigate();

    const handleUpdate = () => {
        nav(`/${id}/edit`);
    }

    useEffect(() => {
        const data = async () => {
            const event = await getSingleEvent(user, id);
            setIsPending(false);
            setEventDetails(event);
        }
        data();
    }, [])

    return (
        <>
            {isPending && <h1 className={styles.loading}>Loading...</h1>}
            {eventDetails && <div className={styles.eventSpecificDiv}>
                <h2>Event Details</h2>
                <ul>
                    <li>
                        <div className={styles.headingTitle}>
                            <h5>Event Name</h5>
                        </div>
                        <div>
                            <p>{eventDetails.name.text}</p>
                        </div>
                    </li>
                    <li>
                        <div className={styles.headingTitle}>
                            <h5>Event Detail</h5>
                        </div>
                        <div>
                            <p>{eventDetails.description.text}</p>
                        </div>
                    </li>
                    <li>
                        <div className={styles.headingTitle}>
                            <h5>Start Date</h5>
                        </div>
                        <div>
                            <p>{moment(eventDetails.start.local).format('DD-MM-YYYY, LT')}</p>
                        </div>
                    </li>
                    <li>
                        <div className={styles.headingTitle}>
                            <h5>End Date</h5>
                        </div>
                        <div>
                            <p>{moment(eventDetails.end.local).format('DD-MM-YYYY, LT')}</p>
                        </div>
                    </li>
                    <li>
                        <div className={styles.headingTitle}>
                            <h5>Capacity</h5>
                        </div>
                        <div>
                            <p>{eventDetails.capacity}</p>
                        </div>
                    </li>
                </ul>
                <div className={styles.eventButtons}>
                    <button onClick={handleUpdate}>Update</button>
                    <button>Delete</button>
                </div>
            </div>}
        </>
    );
}

export default Event;