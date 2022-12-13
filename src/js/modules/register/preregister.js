const ENDPOINT = "https://revamp.casinobarcelona.es/servlet/PreRegisterServlet";

function setPreregisterUser() {
    const user = {
        nationality: document.querySelector("#nationality").value,
        name: document.querySelector("#name").value,
        surname: document.querySelector("#surname").value,
        middlename: document.querySelector("#middlename").value,
        nationalId: document.querySelector("#nationalId").value,
        e_mail: document.querySelector("#e_mail").value,
        phone: document.querySelector("#phone").value
    };
    return user;
}

export async function savePreregister() {
    const user = setPreregisterUser();
    user.delete = false;
    
    // const data = new FormData();
    // data.append("e_mail", user.e_mail);
    // data.append("name", user.name);
    // data.append("surname", user.surname);
    // data.append("middlename", user.middlename);
    // data.append("nationalId", user.nationalId);
    // data.append("nationality", user.nationality);
    // data.append("phone", user.phone);
    // data.append("delete", false);

    const fetchResponse =  await fetchApi(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(user)
    });
    console.log(fetchResponse);
}

export async function deletePreregister(dni) {
    const data = new FormData();
    data.append("nationalId", dni);
    data.append("delete", true);
    const fetchResponse = await fetchApi(ENDPOINT, {
        method: "POST",
        body: data
    });
    console.log(fetchResponse);
}

function fetchApi(url, options) {
    return fetch(url, options)
        .then(response => response.json())
        .then(response => response)
        .catch(error => error);
}
