/* eslint-disable @typescript-eslint/unbound-method */
import { ApiException } from 'src/shared/errors/apiExeptions';
import { mockCripto, mockUser, mockUserRepository, resetMocks, userPasswordUpdate } from './_index.spec';
import { UserModel } from 'src/core/model/user.model';

beforeEach(() => {
  resetMocks();
});

describe('UserPasswordUpdate UseCase', () => {
  it('should update the password successfully', async () => {
    mockUserRepository.findById.mockResolvedValue(mockUser);
    mockCripto.compare.mockResolvedValue(true);
    mockCripto.hash.mockResolvedValueOnce('hashedPass').mockResolvedValueOnce('hashed-new-password');
    mockUserRepository.update.mockResolvedValue(undefined);

    const input = {
      id: mockUser.get.id,
      password: mockUser.get.password,
      newPassword: 'NewSecurePass1!@#',
    };

    await expect(userPasswordUpdate.exec(input)).resolves.not.toThrow();

    expect(mockUserRepository.findById).toHaveBeenCalledWith(mockUser.get.id);
    expect(mockCripto.compare).toHaveBeenCalledWith(input.password, mockUser.get.password);
    expect(mockCripto.hash).toHaveBeenCalledWith(input.newPassword);
    expect(mockUserRepository.update).toHaveBeenCalledWith(expect.any(UserModel));
  });

  it('should throw if user not found', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const input = {
      id: mockUser.get.id,
      password: mockUser.get.password,
      newPassword: 'NewPass!123',
    };

    await expect(userPasswordUpdate.exec(input)).rejects.toThrow(ApiException);

    expect(mockCripto.compare).not.toHaveBeenCalled();
    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });

  it('should throw if old password is invalid', async () => {
    const userModel = new UserModel({ ...mockUser.get }, mockUser.get.id);
    mockUserRepository.findById.mockResolvedValue(userModel);
    mockCripto.compare.mockResolvedValue(false);

    const input = {
      id: mockUser.get.id,
      password: 'WrongPass!',
      newPassword: 'NewPass123@',
    };

    await expect(userPasswordUpdate.exec(input)).rejects.toThrow(ApiException);

    expect(mockCripto.hash).not.toHaveBeenCalled();
    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });
});
