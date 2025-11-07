/* eslint-disable @typescript-eslint/unbound-method */
import { UserModel } from 'src/core/model/user.model';
import { mockUser, mockUserRepository, mockCripto, resetMocks, userCreate } from './_index.spec';
import { ApiException } from 'src/shared/errors/apiExeptions';

describe('UserCreate UseCase', () => {
  beforeEach(() => {
    resetMocks();
  });
  it('should create a new user successfully', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockCripto.hash.mockResolvedValue('hashed-password');
    mockUserRepository.insert.mockResolvedValue(mockUser);

    await expect(userCreate.exec(mockUser.get)).resolves.not.toThrow();

    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(mockUser.get.email);

    expect(mockCripto.hash).toHaveBeenCalledTimes(1);
    expect(mockCripto.hash).toHaveBeenCalledWith(mockUser.get.password);

    expect(mockUserRepository.insert).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.insert).toHaveBeenCalledWith(expect.any(UserModel));
  });

  it('should throw an error if email already exists', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(new UserModel(mockUser.get, mockUser.get.id));

    await expect(userCreate.exec(mockUser.get)).rejects.toThrow(ApiException);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.insert).not.toHaveBeenCalled();
    expect(mockCripto.hash).not.toHaveBeenCalled();
  });
});
