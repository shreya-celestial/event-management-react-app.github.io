import { useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { getSingleEvent, updateEvent, postNewEvent } from '../apis';
import FormContainer from './FormContainer'
import moment from 'moment';

const eventObject = {
    name: '',
    description: '',
    start: '',
    end: '',
    capacity: ''
}

const CreateUpdateEvent = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [isPending, setIsPending] = useState(true);
    const [eventDetails, setEventDetails] = useState(null);
    const [formDisable, setFormDisable] = useState(false);
    const [buttonText, setButtonText] = useState('');
    const nav = useNavigate();

    const match = useMatch('/:id/edit');
    useEffect(() => {
        if (match) {
            const id = match.params.id;
            setButtonText('Update Event');
            const data = async () => {
                const event = await getSingleEvent(user, id);
                setIsPending(false);
                const eventObject = {
                    name: event.name.text,
                    description: event.description.text,
                    start: moment(event.start.local).format('DD-MM-YYYY, LT'),
                    end: moment(event.end.local).format('DD-MM-YYYY, LT'),
                    capacity: event.capacity
                }
                setEventDetails(eventObject);
            }
            data();
        }
        else {
            setButtonText('Create Event')
            setEventDetails(eventObject);
        }
    }, [match])

    const handleChanges = (e, element) => {
        setEventDetails((prev) => {
            return {
                ...prev,
                [element]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormDisable(true);
        if (match) {
            setButtonText('Updating...');
            const id = match.params.id;
            const body = {
                event: {
                    name: {
                        html: `<p>${eventDetails.name}</p>`
                    },
                    description: {
                        html: `<p>${eventDetails.description}</p>`
                    },
                    capacity: eventDetails.capacity
                }
            };
            await updateEvent(user, id, body);
            nav(`/${id}`);
            return
        }
        setButtonText('Loading...');
        const body = {
            "event": {
                "name": {
                    "html": `<p>${eventDetails.name}</p>`
                },
                "description": {
                    "html": `<p>${eventDetails.description}</p>`
                },
                "start": {
                    "timezone": "UTC",
                    "utc": `${moment(eventDetails.start).utc().format()}`
                },
                "end": {
                    "timezone": "UTC",
                    "utc": `${moment(eventDetails.end).utc().format()}`
                },
                "currency": "USD",
                "capacity": eventDetails.capacity
            }
        };
        await postNewEvent(user, body);
        nav('/');
    }

    return (
        <FormContainer isMatch={match} isPending={isPending} eventDetails={eventDetails} formDisable={formDisable} handleSubmit={handleSubmit} handleChanges={handleChanges} buttonText={buttonText} />
    );
}

export default CreateUpdateEvent;