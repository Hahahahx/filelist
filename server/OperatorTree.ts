import { EventEmitter } from 'koa'
import { Operator } from '../types'

export const operatorList: Operator[] = []

class OperatorTree {
  max: number
  list: Operator[]
  event: EventEmitter

  // 需要确保已经删除了再添加新的操作等..
  state: 'Waiting' | 'Right'

  constructor(max?: number) {
    this.max = max || 100
    this.list = []
    this.event = new EventEmitter()
    this.state = 'Right'
    this.event.on('excess', this.excess.bind(this))
  }

  add(opt: Operator) {
    return new Promise<void>((res) => {
      const time = setInterval(
        (() => {
          if (this.state == 'Right') {
            this.list.push(opt)
            if (this.list.length > 100) {
              this.state = 'Waiting'
              this.event.emit('excess')
            }
            clearInterval(time)
            res()
          }
        }).bind(this)
      )
    })
  }

  excess() {
    const opt = this.list.shift()
    console.log(opt)
    this.state = 'Right'
    // 根据opt执行数据库操作
  }

  get() {
    return new Promise<Operator[]>((res) => {
      const time = setInterval(
        (() => {
          if (this.state == 'Right') {
            clearInterval(time)
            res(this.list)
          }
        }).bind(this)
      )
    })
  }
}

export default new OperatorTree()
