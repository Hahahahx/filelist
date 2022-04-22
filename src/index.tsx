import 'solid-js'
import { render } from 'solid-js/web'
import './style/index.css'
import App from './App'
// @ts-ignore
import * as serviceWorker from './serviceWorker'
import { SocketProvider } from './components/Socket'
import { StoreProvider } from './components/Store'

function Providers() {
  return (
    <StoreProvider>
      <SocketProvider url="ws://localhost:9090/">
        <App />
      </SocketProvider>
    </StoreProvider>
  )
}

render(Providers, document.getElementById('root') as Node)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
