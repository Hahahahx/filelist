import { Context } from 'koa'
import Router from 'koa-router'
import { DataSource } from 'typeorm'
import OperatorTree from '../OperatorTree'

export function optsController(mysql: DataSource) {
  const routerInit = new Router({ prefix: '/v1/opt' })

  routerInit.get('/list', async (ctx: Context) => {
    const request: any = ctx.request.body
    const list = await OperatorTree.get()
    ctx.status = 200
    ctx.body = list
  })

  return routerInit
}
