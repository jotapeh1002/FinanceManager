import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class User {
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
}
