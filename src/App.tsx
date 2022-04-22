import { createEffect, createResource, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useSocket } from './components/Socket'
import { Operator } from '../types'
import { ActionOpt, ActionUser, Operation } from './common/socket'
import { WorkSpace } from './views/WorkSpace'
import { useStore } from './components/Store'
import { UserSpace } from './views/UserSpace'
import { OperSpace } from './views/OperSpace'
import { ColorBox } from './components/ColorBox'
import { Request } from './utils/request'

function App() {
  const socket = useSocket()
  const { state, setState } = useStore()

  socket.connectWaiting().then((s) => {
    s.on(ActionOpt.Operator, (data: Operator) => {
      console.log(data)

      if (state.files[data.parent]) {
        const list = [...state.files[data.parent]]

        let i
        switch (data.opt) {
          case Operation.INSTER:
            list.push(data.action.file)
            break
          case Operation.UPDATE:
            i = list.findIndex((i) => i.id === data.action.file.id)
            if (i !== -1) {
              list.splice(i, 1, data.action.file)
            }
            break
          case Operation.DELETE:
            i = list.findIndex((i) => i.id === data.action.file.id)
            if (i !== -1) {
              list.splice(i, 1)
            }
            break
        }

        console.log(data.parent, list)

        setState('files', { [data.parent]: list })
      }

      setState('opts', 'list', [...state.opts.list, data])
    })
  })
  socket.on(ActionUser.Users, (data) => {
    setState('users', 'list', new Array(...data).reverse())
  })

  const [data, { mutate, refetch }] = createResource<Operator[]>(() =>
    Request.get('/v1/opt/list/')
  )

  createEffect(() => {
    !data.loading && setState('opts', 'list', data())
  })

  return (
    <div class="App h-screen w-screen p-5 bg-gradient-to-tr from-purple-400 via-pink-400 to-blue-500 flex items-center justify-center">
      <div className=" h-3/4 w-4/5">
        <ColorBox className="flex h-full">
          <div className="flex-1 h-full">
            <UserSpace />
          </div>
          <div className="flex-1 h-full">
            <WorkSpace />
          </div>
          <div className="flex-1 h-full">
            <OperSpace />
          </div>
        </ColorBox>
      </div>
    </div>
  )
}

export default App
