import { useState } from 'react';
import login from '../assets/login.png';
import styles from '../styleModules/Login.module.css'

const error = {
    status: false,
    msg: ''
}

const Login = ({ setUser }) => {
    const [buttonText, setButtonText] = useState('Submit');
    const [formDisable, setFormDisable] = useState(false);
    const [isError, setIsError] = useState(error);

    const tokenRequest = async (inputText) => {
        const config = {
            method: "GET"
        };
        const url = `https://www.eventbriteapi.com/v3/users/me/?token=${inputText}`;
        const response = await fetch(url, config);
        return response.json();
    }

    const orgRequest = async (user) => {
        const config = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        const url = `https://www.eventbriteapi.com/v3/users/${user.id}/organizations/`;
        const response = await fetch(url, config);
        const data = await response.json();
        return data.organizations[0].id;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.elements.token.value) {
            setIsError({
                msg: 'Please provide with a token',
                status: true
            });
            return;
        }
        setFormDisable(true);
        setButtonText('Validating...')
        const token = await tokenRequest(e.target.elements.token.value);
        if (token?.error) {
            setFormDisable(false);
            setButtonText('Submit');
            setIsError({
                msg: 'Please provide with a valid token',
                status: true
            });
            return
        }
        token["token"] = e.target.elements.token.value;
        const orgId = await orgRequest(token);
        token["orgId"] = orgId;
        sessionStorage.setItem('user', JSON.stringify(token));
        setUser(token);
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={formDisable} className={styles.login} >
                <h4>Login with private token</h4>
                <div>
                    <img src={login} />
                    <input type="text" name="token" placeholder='Token' onChange={() => setIsError(error)} />
                </div>
                {isError.status && <p>{isError.msg}</p>}
                <button>{buttonText}</button>
            </fieldset>
        </form>
    );
}

export default Login;