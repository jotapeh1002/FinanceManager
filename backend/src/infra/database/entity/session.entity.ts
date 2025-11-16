import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { UserOrm } from './user.entity';

@Entity()
export class SessionOrm {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property()
  isRevoked!: boolean;

  @Property({ unique: true })
  refreshToken!: string;

  @Property()
  expirateAt!: Date;

  @Property({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Property({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => UserOrm, { deleteRule: 'cascade' })
  user!: UserOrm;
}
