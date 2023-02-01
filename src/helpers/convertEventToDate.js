import { parseISO } from "date-fns"



export const convertEventToDate = (eventos = []) => {

    return eventos.map(event =>{
        event.start = parseISO(event.start)
        event.end = parseISO(event.end)
        return event
    })

}
