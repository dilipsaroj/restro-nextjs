import axios from 'axios';
import { useContext } from 'react';
import { AuthenticationContext } from '../app/context/AuthContext';
import { deleteCookie } from 'cookies-next';


const useAuth = () => {

    const { data, loading, error, setAuthState } = useContext(AuthenticationContext);

    const signin = async ({ email, password }: { email: string; password: string }, handleClose = () => { }) => {
        setAuthState({
            data: null,
            error: null,
            loading: true
        })
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signin',
                { email, password })

            //console.log("res", response)
            setAuthState({
                data: response.data,
                error: null,
                loading: false
            })
            handleClose();
        } catch (err: any) {
            setAuthState({
                data: null,
                error: err.response.data.errorMessage,
                loading: false
            })
        }
    }
    const signup = async (
        { email, password, firstName, lastName, city, phone }
            : { email: string; password: string, firstName: string, lastName: string, phone: string, city: string }, handleClose = () => { }) => {

        setAuthState({
            data: null,
            error: null,
            loading: true
        })
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup',
                {
                    email, password, firstName, lastName, city, phone
                })

            console.log("res", response)
            setAuthState({
                data: response.data,
                error: null,
                loading: false
            })
            handleClose();
        } catch (err: any) {
            setAuthState({
                data: null,
                error: err.response.data.errorMessage,
                loading: false
            })
        }
    }

    const logout = async()=>{
        deleteCookie("jwt");
        setAuthState({
            data: null,
            error: null,
            loading: false
        })
    }
    return {
        signin,
        signup,
        logout
    }
}

export default useAuth;