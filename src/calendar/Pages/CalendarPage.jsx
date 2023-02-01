import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer,getMessages } from '../../helpers'

import { calendarEvent, CalendarModal, FabAddNew, NavBar, FabDelete } from '../';
import { useEffect, useState } from 'react';
import { useUiStore,useCalendarStore, useAuthStore } from '../../hooks';
 
export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, hasEventSelected, startLoadingEventos } = useCalendarStore()
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView')|| 'week')
  const eventStyleGetter= (event, start, end, isSelected)=>{
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)
    console.log(isMyEvent);
    const style={
      backgroundColor: isMyEvent ? '#347CF7' :'#465660' ,
      borderRadius: '1px',
      opacity: 0.8,
      color:'white'
    }
    return {style}
  }

  const onDobleClick= (event)=>{ 
    openDateModal()

  }
  const onSelect= (event)=>{
    setActiveEvent(event)
  }
  const onViewChanged= (event)=>{
    localStorage.setItem('lastView',event)
    setLastView(event)
  }

  useEffect(() => {
    startLoadingEventos()
  }, [])
  

  return (
    <>
        <NavBar />
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages ={getMessages()}
          eventPropGetter = { eventStyleGetter }
          components= {{
            event: calendarEvent
          }}
          onDoubleClickEvent={onDobleClick}
          onSelectEvent={onSelect}
          onView={onViewChanged}
        />
        <CalendarModal />
        <FabAddNew />
        {
          hasEventSelected ? <FabDelete /> : ''
        }
    </>
  )
}
