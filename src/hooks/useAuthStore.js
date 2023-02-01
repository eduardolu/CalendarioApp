import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api'
import { clearErrorMessage, onCheking, onLogin, onLogout, onLogoutCalendar } from '../store'


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin= async ({ email, passward }) =>{

        dispatch(onCheking());
        try {
            const { data } = await calendarApi.post('/auth', { email, passward })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( onLogin({ name: data.name, uid: data.uid }))
            
        } catch (error) {
            dispatch(onLogout('error de login'))
            setTimeout(()=>{
                dispatch(clearErrorMessage())
            },10);

        }
    }
    const startRegister = async ({ name, email, passward }) => {
        dispatch(onCheking());
        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, passward })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
            
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '---'))
            setTimeout(()=>{
                dispatch(clearErrorMessage())
            },10);

        }
    }
    const checkAuthToken = async() =>{
        const token = localStorage.getItem('token')
        if (!token ) return dispatch( onLogout() )

        try {
            const { data } = await calendarApi.post('/auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
            
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout()) 
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch ( onLogoutCalendar())
        dispatch ( onLogout())

    }

    return {
        //*propiedades
        status, 
        user, 
        errorMessage,

        //*metodos
        startLogin,
        startRegister,
        checkAuthToken, 
        startLogout
    }
}