import { useRouter } from "next/navigation";

type User = {
	username: string;
	password: string;
};

/*
    An add-on in the form of a useLogin custom hook that allows you to use the useRouter hook inside the submitLogin
*/
export const useLogin = () => {
	const router = useRouter();
	/*
        The function processes the user's request to log in to their registered account.
        The function accepts the following parameters:
        @newUser - data of an already registered user account 
        @password - the password entered by the user in the authorization form 
        @username - username entered by the user in the authorization form
    */
	function submitLogin(
		newUser: object | string,
		password: string,
		username: string,
	) {
		//comparing information from the authorization form with newUserData
		const newUserData = JSON.parse(JSON.stringify(newUser));
		if (
			newUserData.username === username &&
			newUserData.password === password
		) {
			const userData: User = {
				username: username,
				password: password,
			};
			localStorage.setItem("userData", JSON.stringify(userData)); //setting the logged-in user's data
			router.push("/");
		} else alert("Неправильный пароль или логин");
	}
	return { submitLogin };
};

/*
    An add-on in the form of a useRegistration custom hook that allows you to use the useRouter hook inside the RegistrationSubmit
*/
export const useRegistration = () => {
	const router = useRouter();
	/*
        The function processes the user's request to registration.
        The function accepts the following parameters:
        @rePassword - the second password entered by the user in the registration form, which have to be the same with first, basic password
        @password - the password entered by the user in the registration form 
        @username - username entered by the user in the registration form
    */
	function RegistrationSubmit(
		rePassword: string,
		password: string,
		username: string,
	) {
		//establishing the data of the registered user
		if (rePassword === password) {
			const userData: User = {
				username: username,
				password: password,
			};
			localStorage.setItem("regUserData", JSON.stringify(userData));
			router.push("/auth/login");
		} else alert("Пароли не совпадают");
	}
	return { RegistrationSubmit };
};
