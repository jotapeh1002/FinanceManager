/* eslint-disable @typescript-eslint/unbound-method */
import { ApiException } from 'src/shared/errors/apiExeptions';
import { mockUser, mockUserRepository, resetMocks, userList } from './_index.spec';

beforeEach(() => {
  resetMocks();
});

describe('UserList UseCase', () => {
  it('should return a list of users', async () => {
    mockUserRepository.findAll.mockResolvedValue([mockUser]);

    const result = await userList.exec();
    expect(result).toEqual([mockUser]);

    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);

    expect(result).toEqual([mockUser]);
  });

  it('should throw if no users are found', async () => {
    mockUserRepository.findAll.mockResolvedValue([]);

    await expect(userList.exec()).rejects.toThrow(ApiException);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
