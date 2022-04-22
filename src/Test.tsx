import { useSocket } from './components/Socket'

export function Test() {
  const socket = useSocket()

  socket.on('connect', () => {
    socket.emit('msg', { rp: 'connection client' }) //向服务器发送消息
    console.log(socket.connected) // true
  })

  socket.on('files', function (data) {
      
    console.log(data)
  })

  
  socket.on('msg', function (data) {
      
    console.log(data)
  })
 

  return <></>
}
