import { useEffect } from 'react'
import { Navigate, Route, Routes} from 'react-router-dom'
import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import { getEnvVariables } from '../helpers'
import { useAuthStore } from '../hooks'


export const APPRouter = () => {

    //const authStarus= 'no-authentificated'//'no-authentificated' 'authentificated';

    const { status, checkAuthToken } = useAuthStore();
    //console.log(getEnvVariables())
    useEffect(() => {
        checkAuthToken()
    }, []);
    

    if (status === 'cheking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        
        <Routes>
            {
                (status == 'no-authentificated')
                ? (
                    <>
                        <Route path='/auth/*' element={<LoginPage />} />
                        <Route path='/*' element={ <Navigate to='/auth/login'/>} />
                    </>
                )
                : (
                    <>
                        <Route path='/' element={<CalendarPage />} /> 
                        <Route path='/*' element={ <Navigate to='/'/>} />
                    </>
                )

            }  
                
            
        </Routes>
    )
}
