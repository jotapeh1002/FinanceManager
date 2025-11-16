export interface SessionProps {
  readonly userId: string;
  refreshToken?: string;
  isRevoked?: boolean;
  expirateAt?: Date;
  createdAt?: Date;
  updatedAt?: Date | undefined;
}

export class SessionModel {
  private readonly _id: string;
  private props: SessionProps;

  constructor(props: SessionProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
    this.props.isRevoked = props.isRevoked ?? false;
    this.props.createdAt = props.createdAt ?? new Date();
  }

  update(data: Partial<Omit<SessionProps, 'isRevoked'>>): void {
    this.props = { ...this.props, ...data, updatedAt: data.createdAt ?? new Date() };
  }

  revokedSession() {
    this.props.isRevoked = true;
  }

  get get() {
    return { id: this._id, ...this.props };
  }

  toJSON(): Required<{ id: string } & SessionProps> {
    const { refreshToken: _refreshToken, userId: _userId, ...rest } = this.props;
    return { id: this._id, ...rest } as Required<{ id: string } & SessionProps>;
  }
}
