export const tokenRequest = async (inputText) => {
    const config = {
        method: "GET"
    };
    const url = `https://www.eventbriteapi.com/v3/users/me/?token=${inputText}`;
    const response = await fetch(url, config);
    return response.json();
}

export const orgRequest = async (user) => {
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