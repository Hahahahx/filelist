import { Component } from 'solid-js'

export const ColorBox: Component<{
  className?: string
}> = (props) => {
  return (
    <div class="content-center box-border backdrop-filter backdrop-blur-lg overflow-auto bg-black bg-opacity-30 h-full ml-5 mr-5 p-4 shadow-xl  divide-y rounded-lg ">
      <div class={`${props.className} p-4`}>{props.children}</div>
    </div>
  )
}
