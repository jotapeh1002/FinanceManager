/* eslint-disable @typescript-eslint/unbound-method */
import { ApiException } from 'src/shared/errors/apiExeptions';
import { mockCripto, mockUser, mockUserRepository, resetMocks, userLogin } from './_index.spec';

beforeEach(() => {
  resetMocks();
});

describe('UserLogin UseCase', () => {
  it('should login successfully', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    mockCripto.compare.mockResolvedValue(true);

    const input = {
      email: mockUser.get.email,
      password: mockUser.get.password,
    };

    await expect(userLogin.exec(input)).resolves.not.toThrow();

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(mockCripto.compare).toHaveBeenCalledWith(input.password, mockUser.get.password);
  });

  it('should throw if user does not exist', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockCripto.compare.mockResolvedValue(false); // só por segurança

    const input = {
      email: 'nonexistent@gmail.com',
      password: 'anyPassword123',
    };

    await expect(userLogin.exec(input)).rejects.toThrow(ApiException);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(mockCripto.compare).toHaveBeenCalledWith(input.password, '');
  });

  it('should throw if password is invalid', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    mockCripto.compare.mockResolvedValue(false);

    const input = {
      email: mockUser.get.email,
      password: 'WrongPassword123',
    };

    await expect(userLogin.exec(input)).rejects.toThrow(ApiException);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(mockCripto.compare).toHaveBeenCalledWith(input.password, mockUser.get.password);
  });
});
