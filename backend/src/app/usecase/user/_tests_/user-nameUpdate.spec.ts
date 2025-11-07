/* eslint-disable @typescript-eslint/unbound-method */
import { ApiException } from 'src/shared/errors/apiExeptions';
import { mockUser, mockUserRepository, resetMocks, userNameUpdate } from './_index.spec';
import { UserModel } from 'src/core/model/user.model';

beforeEach(() => {
  resetMocks();
});

describe('UserNameUpdate UseCase', () => {
  it('should update the name successfully', async () => {
    mockUserRepository.findById.mockResolvedValue(mockUser);
    mockUserRepository.update.mockResolvedValue(undefined);

    const input = {
      id: mockUser.get.id,
      name: 'New Name',
    };

    await expect(userNameUpdate.exec(input)).resolves.not.toThrow();

    expect(mockUserRepository.findById).toHaveBeenCalledWith(input.id);
    expect(mockUserRepository.update).toHaveBeenCalledWith(expect.any(UserModel));
    expect(mockUser.get.name).toBe('New Name');
  });

  it('should throw if user not found', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const input = {
      id: 'non-existent-id',
      name: 'New Name',
    };

    await expect(userNameUpdate.exec(input)).rejects.toThrow(ApiException);

    expect(mockUserRepository.findById).toHaveBeenCalledWith(input.id);
    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });

  it('should throw if new name is the same as current', async () => {
    const userModel = new UserModel({ ...mockUser.get }, mockUser.get.id);
    mockUserRepository.findById.mockResolvedValue(userModel);

    const input = {
      id: mockUser.get.id,
      name: mockUser.get.name,
    };

    await expect(userNameUpdate.exec(input)).rejects.toThrow(ApiException);

    expect(mockUserRepository.findById).toHaveBeenCalledWith(input.id);
    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });
});
