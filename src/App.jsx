import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import React from 'react';

const sessionUser = sessionStorage.getItem('user');
const currUser = sessionUser ? JSON.parse(sessionUser) : null;

const App = () => {
    const [user, setUser] = useState(currUser);
    let contents;

    if (!user) {
        contents = <Login setUser={setUser} />
    }
    else {
        contents = <Home user={user} />
    }

    return (
        <div className="container">
            {contents}
        </div>
    );
}

export default App;