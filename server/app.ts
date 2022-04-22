import http from 'http'
import Koa, { Context } from 'koa'
import Cors from 'koa2-cors'
import AddressIP from 'ip'
import { Server, Socket } from 'socket.io'
import { ActionOpt, ActionUser, Operation } from '../src/common/socket'
import { cors, PORT } from './config'
import { mysql } from './data-source'
import { filesController } from './controller/filesController'
import { usersController } from './controller/usersController'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import OperatorTree from './OperatorTree'
import { optsController } from './controller/optsController'
import { v4, v5 } from 'uuid'

export const sockets: Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>[] = []

mysql
  .initialize()
  .then((datasource) => {
    const app = new Koa()
    const server = http.createServer(app.callback())
    app.use(Cors(cors))
    const io = new Server(server, { cors })

    const Files = filesController(datasource)
    app.use(Files.routes()).use(Files.allowedMethods())
    const Users = usersController(datasource)
    app.use(Users.routes()).use(Users.allowedMethods())
    const Opts = optsController(datasource)
    app.use(Opts.routes()).use(Opts.allowedMethods())

    io.on('connection', async (socket) => {
      console.log('用户连接', socket.id)
      sockets.push(socket)

      socket.on(ActionOpt.Operator, async function (data) {
        if (data.opt === Operation.INSTER) {
          data.action.file.id = v4()
        }
        await OperatorTree.add(data)

        sockets.forEach((all) => {
          all.emit(ActionOpt.Operator, data)
        })

        // const list = await OperatorTree.get()
        // sockets.forEach((all) => {
        //   all.emit(ActionOpt.OpertionTree, list)
        // })
      })

      sockets.forEach((s) => {
        s.emit(
          ActionUser.Users,
          sockets.map((s) => s.id)
        )
      })

      socket.on('disconnect', () => {
        console.log('断开连接', socket.id)
        const i = sockets.findIndex((s) => s.id == socket.id)
        sockets.splice(i, 1)

        sockets.forEach((s) => {
          s.emit(
            ActionUser.Users,
            sockets.map((s) => s.id)
          )
        })
      })
    })

    server.listen(PORT, () => {
      console.log(`http://${AddressIP.address()}:${PORT} 已启动`)
    })
  })
  .catch((err: string) => console.log('TypeORM connection error:', err))
