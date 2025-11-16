import { Entity, Property, PrimaryKey, Collection, OneToMany } from '@mikro-orm/core';
import { SessionOrm } from './session.entity';

@Entity()
export class UserOrm {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Property({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @OneToMany(() => SessionOrm, (session) => session.user)
  sessions = new Collection<SessionOrm>(this);
}
