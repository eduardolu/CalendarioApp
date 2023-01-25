
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { APPRouter } from './routers'
import { store} from './store'

export const CalendarAPP = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <APPRouter />
      </BrowserRouter>
    </Provider>
  )
}
