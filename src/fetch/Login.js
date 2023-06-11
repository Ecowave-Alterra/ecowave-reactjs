import { useState } from "react";

export default function getLoginData() {
    const [data,setData] = useState([])

    const postDataLogin = async (data) => {
        await fetch("https://ecowave-h64wmjjkza-uc.a.run.app/admin/login", {
            method: 'POST',
            mode:"cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(async(response) => {
                const json = await response.json();
                setData(json.Data)
            })
            .catch((e) => {
                console.error(e);
            });
    }
    return [data,postDataLogin]
}