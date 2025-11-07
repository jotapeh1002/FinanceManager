export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date | undefined;
}

export class UserModel {
  private readonly _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
    this.props.createdAt = props.createdAt ?? new Date();
  }

  update(data: Partial<UserProps>): void {
    this.props = { ...this.props, ...data, updatedAt: data.createdAt ?? new Date() };
  }

  get get() {
    return { id: this._id, ...this.props };
  }

  toJSON(): Required<{ id: string } & UserProps> {
    const { password: _password, ...rest } = this.props;
    return { id: this._id, ...rest } as Required<{ id: string } & UserProps>;
  }
}
