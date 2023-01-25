
export const calendarEvent = ({event}) => {
  return (
    <>
        <strong>{event.title}</strong>
        <span>-{event.user.name}</span>
    </>
  )
}
