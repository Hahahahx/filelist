import { Context } from 'koa'
import Router from 'koa-router'
import { DataSource } from 'typeorm'
import { sockets } from '../app'

export function usersController(mysql: DataSource) {
  const routerInit = new Router({ prefix: '/v1/user' })

  routerInit.get('/list', async (ctx: Context) => {
    const request: any = ctx.request.body
    ctx.status = 200
    ctx.body = sockets.map((s) => s.id)
  })

  return routerInit
}
