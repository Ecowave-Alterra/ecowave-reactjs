import { useObservable } from '@legendapp/state/react'

export default function getLoginData() {
    const loginData = useObservable("")

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
                loginData.set(json.Data)
            })
            .catch((e) => {
                console.error(e);
            });
    }
    return {loginData,postDataLogin}
}