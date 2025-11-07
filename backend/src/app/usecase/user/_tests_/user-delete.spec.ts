/* eslint-disable @typescript-eslint/unbound-method */
import { mockUser, mockUserRepository, resetMocks, userDelete } from './_index.spec';

describe('Delete user', () => {
  beforeEach(() => {
    resetMocks();
  });

  it('delete to id', async () => {
    mockUserRepository.findById.mockResolvedValue(mockUser);

    const spyExec = jest.spyOn(userDelete, 'exec');
    await expect(userDelete.exec(mockUser.get.id)).resolves.not.toThrow();

    expect(spyExec).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findById).toHaveBeenCalledWith(mockUser.get.id);
    expect(mockUserRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('should not delete user if id does not exist', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const spyExec = jest.spyOn(userDelete, 'exec');
    await expect(userDelete.exec(mockUser.get.id)).rejects.toThrow();
    expect(spyExec).toHaveBeenCalledTimes(1);

    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findById).toHaveBeenCalledWith(mockUser.get.id);
    expect(mockUserRepository.delete).not.toHaveBeenCalled();
  });
});
