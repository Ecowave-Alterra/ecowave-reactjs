import { useObservable } from "@legendapp/state/react";

export default function getLoginData() {
  const loginData = useObservable("");

  const postDataLogin = async (data) => {
    try {
      const response = await fetch(
        "https://ecowave-h64wmjjkza-uc.a.run.app/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      loginData.set(responseData.Data);
      return responseData;
    } catch (error) {
      return error.response;
    }
  };
  return { loginData, postDataLogin };
}
