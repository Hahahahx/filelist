import { For } from 'solid-js'
import { ColorBox } from '../components/ColorBox'
import { useStore } from '../components/Store'

export const OperSpace = () => {
  const { state, setState } = useStore()

  return (
    <ColorBox>
      <For each={state.opts.list}>
        {(item, i) => (
          <div className=" p-4 text-white border-purple-600 border-opacity-10 text-center">
            <div className="flex">
              <div className="flex-grow font-mono">{item.opt}</div>
              <div className="flex-grow font-mono">{item.user.name}</div>
            </div>

            <div className=" font-mono">
              {new Date(item.time).toISOString()} -{i}
            </div>
          </div>
        )}
      </For>
    </ColorBox>
  )
}
