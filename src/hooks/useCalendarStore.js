import { useSelector, useDispatch} from 'react-redux'
import { calendarApi } from '../api'
import Swal from 'sweetalert2'
import { convertEventToDate } from '../helpers'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store'


export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const {events, activeEvent} = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    const setActiveEvent = ( calendarEvent )=>{
        dispatch(onSetActiveEvent( calendarEvent ))
    }

    const startSavingEvent=async(calendarEvent)=>{

        try {
            
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}))
                return;
            }
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}))
            
        } catch (error) {
            console.log(error)
            Swal.fire('error a guardar', error.response.data.msg,'error')
        }


    }

    const  startDeleteEvent = async()=>{

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent())
            
        } catch (error) {
            console.log(error);
            Swal.fire('error a eliminar', error.response.data.msg,'error')
        }
    }

    const startLoadingEventos = async() => {

        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventToDate(data.eventos)
            dispatch(onLoadEvents(events))
            //console.log(events)

        } catch (error) {
            console.log('Error cargar eventos')
            console.log(error)
        }

    }

    return {
        //propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent, 

        //metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEventos,
    }
}
