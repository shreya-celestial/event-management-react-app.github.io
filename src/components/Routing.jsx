import { Route, Routes } from 'react-router-dom';
import Event from './Event';
import CreateUpdateEvent from './CreateUpdateEvent';
import EventsList from './EventsList';

const Routing = ({ user }) => {
    return (
        <Routes>
            <Route exact path='/' element={<EventsList user={user} />} />
            <Route exact path='/create' element={<CreateUpdateEvent />} />
            <Route exact path='/:id' element={<Event />} />
            <Route exact path='/:id/edit' element={<CreateUpdateEvent />} />
        </Routes>
    );
}

export default Routing;