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
import { createStore, SetStoreFunction } from 'solid-js/store'
import { Files, Operator } from '../../../types'

type State = {
  files: Readonly<{
    [key: string | number]: Files[]
  }>
  opts: Readonly<{
    list: Readonly<(Operator & { error?: boolean })[]>
  }>
  users: Readonly<{
    list: Readonly<string[]>
  }>
}

const StoreContext = createContext<{
  state: Readonly<State>
  setState: SetStoreFunction<Readonly<State>>
}>()

export const StoreProvider: Component = (props) => {
  const [state, setState] = createStore({
    files: {},
    opts: {
      list: [],
      get opts() {
        return this.list
      },
    },
    users: {
      list: [],
      get users() {
        return this.list
      },
    },
  })

  const value = {
    state,
    setState,
  }

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
