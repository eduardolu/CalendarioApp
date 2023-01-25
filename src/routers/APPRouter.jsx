import { Navigate, Route, Routes} from 'react-router-dom'
import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'


export const APPRouter = () => {

    const authStarus= 'authentificated'//'no-authentificated' 'authe';

    return (
        
        <Routes>
            {
                (authStarus == 'no-authentificated')
                ? <Route path='/auth/*' element={<LoginPage />} />
                : <Route path='/*' element={<CalendarPage />} /> 

            }  
                <Route path='/*' element={ <Navigate to='/auth/login'/>} />
                
            
        </Routes>
    )
}
