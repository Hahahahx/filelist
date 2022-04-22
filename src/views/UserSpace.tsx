import { createEffect, createMemo, createSignal, For } from 'solid-js'
import { ColorBox } from '../components/ColorBox'
import { User } from '../components/Icon/icon'
import { useSocket } from '../components/Socket'
import { useStore } from '../components/Store'
import { Tree } from '../components/Tree'
import { randomColor } from '../utils/color'
import { Request } from '../utils/request'

export const UserSpace = () => {
  const { state, setState } = useStore()
  const [userId, setUserId] = createSignal('')
  const socket = useSocket()

  socket.connectWaiting().then((s) => {
    setUserId(s.id)
  })

  const list = createMemo(() => {
    let l = [...state.users.list]
    if (userId()) {
      l = state.users.list.filter((i) => i != userId())
      l.unshift(userId() + '(我)')
    }
    return l
  })

  

  return (
    <ColorBox>
      <For each={list()}>
        {(item) => (
          <div className="flex p-4 text-white border-purple-600 border-opacity-10 text-center">
            <User className="flex-0 mr-2" color={randomColor()} />
            <div className="flex-grow font-mono">{item}</div>
          </div>
        )}
      </For>
    </ColorBox>
  )
}
