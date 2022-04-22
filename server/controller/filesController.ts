import { Context } from 'koa'
import Router from 'koa-router'
import { DataSource } from 'typeorm'
import { redis } from '../data-source'
import { Files } from '../entiry/Files'

export function filesController(mysql: DataSource) {
  const routerInit = new Router({ prefix: '/v1/file' })

  routerInit.get('/list/:id', async (ctx: Context) => {
    // const request: any = ctx.request.body
    // const files = new Files()

    let filesRepository = mysql.getRepository(Files)

    const files = await filesRepository.findBy({
      parent: ctx.params.id,
    })

    ctx.status = 200
    ctx.body = files
  })

  return routerInit
}
