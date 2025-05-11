import { useRouter } from "next/navigation";

type User = {
    username: string
    password: string
}

export function useLogin(){
    const router = useRouter()
    function submitLogin(newUser: string, password: string, username: string){ //comparing information from the authorization form with newUserData
        const newUserData = JSON.parse(JSON.stringify(newUser))
        if(newUserData.username === username && newUserData.password === password){
            const userData:User = {
                username: username,
                password: password
            }
            localStorage.setItem('userData', JSON.stringify(userData)) //setting the logged-in user's data
            router.push('/')
        }
        else
            alert("Неправильный пароль или логин")
    }
    return {submitLogin}
} 

export function useRegistration(){
    const router = useRouter()
    function RegistrationSubmit(rePassword: string, password: string, username: string){ //establishing the data of the registered user
        if(rePassword === password){
            const userData:User ={
                username: username,
                password: password
            }
            localStorage.setItem("regUserData", JSON.stringify(userData))
            router.push('/auth/login')
        }
        else
            alert("Пароли не совпадают")
    }
    return {RegistrationSubmit}
}
