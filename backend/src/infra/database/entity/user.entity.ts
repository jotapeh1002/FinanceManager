import { Entity, Property, PrimaryKey, BeforeCreate } from '@mikro-orm/core';

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

  @Property({ type: 'date', onCreate: () => new Date(), nullable: true })
  createdAt?: Date;

  @Property({ type: 'date', onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;

  @BeforeCreate()
  async assignId() {
    const { v4: uuidv4 } = (await import('uuid')) as { v4: () => string };
    this.id = uuidv4();
  }
}
