import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Files {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  parent: string

  @Column()
  dir: boolean

  @Column()
  ctime: Date

  @Column()
  mtime: Date
}
