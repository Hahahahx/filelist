import {
  Component,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  For,
  onMount,
  Show,
} from 'solid-js'
import { Transition, TransitionGroup } from 'solid-transition-group'
import { Files } from '../../../types'
import { Arrow, File, Floder, Loadding } from '../Icon/icon'
import { useStore } from '../Store'

function Test({}: Component<{ ss: string }>) {}

interface TreeProps<T> {
  className?: string
  data: T
  getList: (id: string | number) => Promise<any>
  onSelect: (data: T) => void
  select: T
  //   list: Files[]
}

export function Tree<T extends { id: number; name: string; [k: string]: any }>(
  props: TreeProps<T>
) {
  const [open, setOpen] = createSignal(false)
  const { state } = useStore()

  const toggleOpen = () => {
    props.data.dir && setOpen(!open())
  }

  const [list, { mutate, refetch }] = createResource(open, () =>
    props.getList(props.data.dir ? props.data.id : props.data.parent)
  )

  const show = createMemo(() => open() && !list.loading)

  return (
    <div className={`  hover:bg-blue-300 hover:bg-opacity-5`}>
      <div
        onClick={(e) => {
          e.stopPropagation()
          toggleOpen()
          props.onSelect(props.data)
        }}
        className={`
        ${props.select.id === props.data.id ? 'bg-blue-100 bg-opacity-5' : ''}
        flex p-4 text-white border-purple-600 border-opacity-10 cursor-pointer hover:bg-blue-400 hover:border-transparent hover:shadow-lg hover:text-cyan-100`}
      >
        <Show when={!list.loading && props.data.dir}>
          <Arrow
            className="flex-grow-0 mr-2"
            rotate={show() ? 180 : 90}
            size={18}
          />
        </Show>
        <Show when={list.loading}>
          <Loadding className="flex-grow-0" spin={true} size={18} />
        </Show>
        <div className="flex-grow font-mono pl-6">{props.data.name}</div>

        <Show when={props.data.dir}>
          <Floder size={16} />
        </Show>
        <Show when={!props.data.dir}>
          <File size={15} />
        </Show>
      </div>
      <Show when={show()}>
        <For each={state.files[props.data.id]}>
          {(item: any) => (
            <Tree
              select={props.select}
              onSelect={props.onSelect}
              data={item}
              className="pl-6"
              getList={(id) => {
                return props.getList(id)
              }}
            />
          )}
        </For>
      </Show>
    </div>
  )
}
