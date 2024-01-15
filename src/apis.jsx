// const baseUrl = "https://www.eventbriteapi.com/v3";

export const tokenRequest = async (inputText) => {
    const config = {
        method: "GET"
    };
    const url = `/api/users/me/?token=${inputText}`;
    try {
        const response = await fetch(url, config);
        return response.json();
    } catch (err) {
        console.log(err)
        return
    }
}

export const orgRequest = async (user) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `/api/users/${user.id}/organizations/`;
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        return data.organizations[0].id;
    } catch (err) {
        console.log(err);
        return
    }
}

export const allEvents = async (user) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `/api/organizations/${user.orgId}/events/`;
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        return data.events;
    } catch (err) {
        console.log(err)
        return
    }
}

export const postNewEvent = async (user, body) => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(body)
    };
    const url = `/api/organizations/${user.orgId}/events/`;
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        return data.id;
    } catch (err) {
        console.log(err)
        return
    }
}

export const getSingleEvent = async (user, id) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `/api/events/${id}/`;
    try {
        const response = await fetch(url, config);
        return response.json();
    } catch (err) {
        return null;
    }
}

export const updateEvent = async (user, id, body) => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(body)
    };
    const url = `/api/events/${id}/`;
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        return data.id;
    } catch (err) {
        console.log(err)
        return
    }
}

export const deleteEvent = async (user, id) => {
    const config = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const url = `/api/events/${id}/`;
    try {
        const response = await fetch(url, config);
        return response.json();
    } catch (err) {
        console.log(err)
        return
    }
}