import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer,getMessages } from '../../helpers'

import { calendarEvent, CalendarModal, FabAddNew, NavBar, FabDelete } from '../';
import { useState } from 'react';
import { useUiStore,useCalendarStore } from '../../hooks';
 
export const CalendarPage = () => {
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent,hasEventSelected } = useCalendarStore()
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView')|| 'week')
  const eventStyleGetter= (event, start, end, isSelected)=>{
    const style={
      backgroundColor:'#347CF7',
      borderRadius: '1px',
      opacity: 0.8,
      color:'white'
    }
    return style
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
          eventPropGetter = { eventStyleGetter}
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
