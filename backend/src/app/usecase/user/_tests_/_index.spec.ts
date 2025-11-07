import { IUserRepository } from 'src/app/repositories/iUserRepository';
import { UserCreate } from 'src/app/usecase/user/user-create';
import { UserDelete, UserEmailUpdate, UserList, UserLogin, UserNameUpdate, UserPasswordUpdate, UserfindById } from '..';
import { UserModel } from 'src/core/model/user.model';

export let mockUserRepository: jest.Mocked<IUserRepository>;
export let mockCripto: { hash: jest.Mock; compare: jest.Mock };
export let userCreate: UserCreate;
export let userDelete: UserDelete;
export let userEmailUpdate: UserEmailUpdate;
export let userFindById: UserfindById;
export let userPasswordUpdate: UserPasswordUpdate;
export let userList: UserList;
export let userNameUpdate: UserNameUpdate;
export let userLogin: UserLogin;

const makeMockUserRepository = (): jest.Mocked<IUserRepository> => ({
  findByEmail: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});

const makeMockCripto = () => ({
  hash: jest.fn(),
  compare: jest.fn(),
});

export const mockUser = new UserModel(
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: 'hashedPass',
    createdAt: new Date(),
  },
  'id-01',
);

export const resetMocks = () => {
  jest.clearAllMocks();
  mockUserRepository = makeMockUserRepository();
  mockCripto = makeMockCripto();
  userCreate = new UserCreate(mockUserRepository, mockCripto);
  userDelete = new UserDelete(mockUserRepository);
  userEmailUpdate = new UserEmailUpdate(mockUserRepository, mockCripto);
  userFindById = new UserfindById(mockUserRepository);
  userPasswordUpdate = new UserPasswordUpdate(mockUserRepository, mockCripto);
  userList = new UserList(mockUserRepository);
  userNameUpdate = new UserNameUpdate(mockUserRepository);
  userLogin = new UserLogin(mockUserRepository, mockCripto);
};

describe('base to tests and mocks', () => {
  beforeEach(() => resetMocks());

  it('should setup base mocks correctly', () => {
    expect(mockUserRepository).toBeDefined();
    expect(mockCripto).toBeDefined();
    expect(userCreate).toBeInstanceOf(UserCreate);
    expect(userDelete).toBeInstanceOf(UserDelete);
    expect(userEmailUpdate).toBeInstanceOf(UserEmailUpdate);
    expect(userFindById).toBeInstanceOf(UserfindById);
    expect(userPasswordUpdate).toBeInstanceOf(UserPasswordUpdate);
    expect(userNameUpdate).toBeInstanceOf(UserNameUpdate);
    expect(userLogin).toBeInstanceOf(UserLogin);
  });
});
