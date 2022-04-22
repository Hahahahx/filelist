// 基本操作元（移动可以视作为Delete和Insert的组合，复制也是）
export enum Operation {
  DELETE = 'DELETE',
  INSTER = 'INSTER',
  UPDATE = 'UPDATE',
}

export interface User {
  name: string
  id: ID
}

export interface Operator {
  id: ID
  opt: Operation // 执行的元操作
  parent: number // 父级文件夹ID
  action: any   // 数据
  user: User // 执行用户
  time: Date
}

export interface Action {
  type: string
  data: any
}

type ID = string | number

export interface Files {
  id: number
  name: string
  parent: number
  dir: boolean
  ctime: Date
  mtime: Date
}
