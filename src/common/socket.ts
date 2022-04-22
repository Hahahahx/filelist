// Socket通信
export enum ActionOpt {
  Operator = 'Operator',
  OpertionTree = 'OpertionTree',
}

// 基本操作元（移动可以视作为Delete和Insert的组合，复制也是）
export enum Operation {
  DELETE = 'DELETE',
  INSTER = 'INSTER',
  UPDATE = 'UPDATE',
}

export enum ActionUser {
  Users = 'Users',
}
