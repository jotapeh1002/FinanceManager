/* eslint-disable @typescript-eslint/unbound-method */
import { ApiException } from 'src/shared/errors/apiExeptions';
import { mockUser, mockUserRepository, resetMocks, userFindById } from './_index.spec';

beforeEach(() => {
  resetMocks();
});

describe('Find user by ID', () => {
  it('should return user when found', async () => {
    mockUserRepository.findById.mockResolvedValue(mockUser);

    const result = await userFindById.exec(mockUser.get.id);

    expect(result).toBe(mockUser);
    expect(mockUserRepository.findById).toHaveBeenCalledWith(mockUser.get.id);
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('should throw ApiException when user not found', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    await expect(userFindById.exec('id-not-found')).rejects.toThrow(ApiException);
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findById).toHaveBeenCalledWith('id-not-found');
  });
});
