import {
  Component,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  createUniqueId,
  For,
} from 'solid-js'
import { Files } from '../../types'
import { ActionOpt, Operation } from '../common/socket'
import { ColorBox } from '../components/ColorBox'
import { Edit, File, FileEdit, Floder, Trash } from '../components/Icon/icon'
import { useSocket } from '../components/Socket'
import { useStore } from '../components/Store'
import { Tree } from '../components/Tree'
import { Request } from '../utils/request'

const ROOTID = 1

export const WorkSpace = () => {
  const socket = useSocket()
  const { state, setState } = useStore()
  const [data, { mutate, refetch }] = createResource<Files[]>(async () => {
    var worker = new Worker('worker.js')

    worker.postMessage('Hello World')
    worker.onmessage = (e: any) => {
      console.log(e)
    }

    // worker.postMessage({ method: 'echo', args: state.opts.list })

    if (!state.files[ROOTID]) {
      let list = await Request.get<Files[]>('/v1/file/list/' + ROOTID)

      state.opts.list
        .filter((opt) => opt.parent === ROOTID)
        .forEach((o) => {
          switch (o.opt) {
            case Operation.INSTER:
              list.push(o.action.file)
              break
            case Operation.UPDATE:
              let i = list.findIndex((i) => i.id === o.action.file.id)
              if (i !== -1) {
                list.splice(i, 1, o.action.file)
              }
              break
            case Operation.DELETE:
              console.log('-------Delete', list, o)
              let j = list.findIndex((item) => item.id === o.action.file.id)

              console.log('-------', j)

              if (j !== -1) {
                list.splice(j, 1)
              }

              break
          }
        })

      console.log(list)

      setState('files', {
        [ROOTID]: list,
      })

      console.log(state.files)
    }
    return state.files[ROOTID]
  })

  const [select, setSelect] = createSignal<any>({
    id: ROOTID,
    parent: ROOTID,
  })

  const onFloder = () => {
    const parent = select().dir ? select().id : select().parent
    socket.emit(ActionOpt.Operator, {
      id: createUniqueId(),
      parent,
      opt: Operation.INSTER,
      action: {
        file: {
          id: null,
          name: 'test_dir',
          parent,
          dir: true,
          ctime: new Date(),
          mtime: new Date(),
        },
      },
      user: {
        id: socket.id,
        name: socket.id,
      },
      time: new Date(),
    })
  }

  const onEdit = () => {
    const newFile = { ...select() }
    newFile.name = newFile.dir ? 'update_dir' : 'update_file'
    console.log(newFile)
    socket.emit(ActionOpt.Operator, {
      id: createUniqueId(),
      parent: newFile.parent,
      opt: Operation.UPDATE,
      action: {
        file: newFile,
      },
      user: {
        id: socket.id,
        name: socket.id,
      },
      time: new Date(),
    })
  }

  const onFile = () => {
    const parent = select().dir ? select().id : select().parent

    socket.emit(ActionOpt.Operator, {
      id: createUniqueId(),
      parent,
      opt: Operation.INSTER,
      action: {
        file: {
          id: null,
          name: 'test',
          parent,
          dir: false,
          ctime: new Date(),
          mtime: new Date(),
        },
      },
      user: {
        id: socket.id,
        name: socket.id,
      },
      time: new Date(),
    })
  }

  const onTrash = () => {
    socket.emit(ActionOpt.Operator, {
      id: 0,
      parent: select().parent,
      opt: Operation.DELETE,
      action: {
        file: select(),
      },
      user: {
        id: socket.id,
        name: socket.id,
      },
      time: new Date(),
    })
  }

  return (
    <ColorBox className="w-full h-full flex flex-col">
      <div
        class="h-full overflow-auto "
        onClick={(e) => {
          setSelect({
            id: ROOTID,
            parent: ROOTID,
          })
        }}
      >
        <For each={state.files[ROOTID]}>
          {(item) => (
            <Tree<Files>
              data={item}
              select={select()}
              onSelect={(data: any) => {
                setSelect(data)
              }}
              getList={async (id: string | number) => {
                var worker = new Worker('worker.js')

                worker.postMessage('Hello World')
                if (!state.files[id]) {
                  let list = await Request.get<Files[]>('/v1/file/list/' + id)

                  let i
                  state.opts.list
                    .filter((opt) => opt.parent === id)
                    .forEach((o) => {
                      let i
                      switch (o.opt) {
                        case Operation.INSTER:
                          list.push(o.action.file)
                          break
                        case Operation.UPDATE:
                          i = list.findIndex((i) => i.id === o.action.file.id)
                          if (i !== -1) {
                            list.splice(i, 1, o.action.file)
                          }
                          break
                        case Operation.DELETE:
                          i = list.findIndex((i) => i.id === o.action.file.id)
                          if (i !== -1) {
                            list.splice(i, 1)
                          }

                          break
                      }
                    })

                  console.log(list)

                  setState('files', {
                    [id]: list,
                  })
                }

                return state.files[id]
              }}
            />
          )}
        </For>
      </div>
      <Toolbar
        disabled={select().id == ROOTID}
        onFloder={onFloder}
        onFile={onFile}
        onTrash={onTrash}
        onEdit={onEdit}
      />
    </ColorBox>
  )
}

export const Toolbar: Component<{
  disabled?: boolean
  onFloder?: () => void
  onFile?: () => void
  onTrash?: () => void
  onEdit?: () => void
}> = (props) => {
  let className = 'flex-1 border-cyan-50 border-opacity-20 cursor-pointer'

  return (
    <div className="rounded-lg flex divide-x p-4 text-center bg-blue-500 text-cyan-50 shadow-lg">
      <div className={className} onClick={props.onFloder}>
        <Floder />
      </div>
      <div className={className} onClick={props.onFile}>
        <File size={17} />
      </div>
      <div
        className={className}
        classList={{
          'opacity-30 cursor-not-allowed': props.disabled,
        }}
        onClick={() => !props.disabled && props.onEdit()}
      >
        <Edit size={17} />
      </div>
      <div
        className={className}
        classList={{
          'opacity-30 cursor-not-allowed': props.disabled,
        }}
        onClick={() => !props.disabled && props.onTrash()}
      >
        <Trash size={19} />
      </div>
    </div>
  )
}
