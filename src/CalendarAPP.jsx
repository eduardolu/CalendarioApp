
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { APPRouter } from './routers'
import { store} from './store'

export const CalendarAPP = () => {
  return (
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <HashRouter>
          <APPRouter />
      </HashRouter>
      {/* </BrowserRouter> */}
    </Provider>
  )
}
