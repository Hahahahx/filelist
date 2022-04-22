import {
  Accessor,
  Component,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from 'solid-js'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const SocketContext = createContext<
  Socket<DefaultEventsMap, DefaultEventsMap> & {
    connectWaiting: () => Promise<Socket<DefaultEventsMap, DefaultEventsMap>>
  }
>()

export const SocketProvider: Component<{
  url: string
}> = (props) => {
  const socket = io(props.url)

  const value = Object.assign(socket, {
    connectWaiting: () => {
      return new Promise<Socket<DefaultEventsMap, DefaultEventsMap>>(
        (res, rej) => {
          setInterval(() => {
            if (socket.connected) {
              res(socket)
            }
          }, 1000)
        }
      )
    },
  })

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  return useContext(SocketContext)
}
