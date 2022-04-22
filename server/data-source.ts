import Redis from 'ioredis'
import { DataSource } from 'typeorm'
import { Files } from './entiry/Files'

export const mysql = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  synchronize: true,
  logging: true,
  entities: [Files],
  subscribers: [],
  migrations: [],
})

const redisConfig = {
  port: 6379,
  host: '127.0.0.1',
  prefix: 'sam:', //存诸前缀
  ttl: 60 * 60 * 23, //过期时间
  family: 4,
  db: 0,
}

export const redis = new Redis(redisConfig)
