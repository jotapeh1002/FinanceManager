/* eslint-disable @typescript-eslint/unbound-method */
import { UserModel } from 'src/core/model/user.model';
import { mockUser, mockUserRepository, mockCripto, resetMocks, userEmailUpdate } from './_index.spec';
import { ApiException } from 'src/shared/errors/apiExeptions';

describe('Email update', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('Email update', () => {
    it('should update user email successfully', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockCripto.compare.mockResolvedValue(true);
      mockUserRepository.update.mockResolvedValue();

      await expect(userEmailUpdate.exec({ id: mockUser.get.id, email: 'newemail@gmail.com', password: '123456' })).resolves.not.toThrow();

      expect(mockUserRepository.findById).toHaveBeenCalledWith(mockUser.get.id);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('newemail@gmail.com');
      expect(mockCripto.compare).toHaveBeenCalledWith('123456', mockUser.get.password);
      expect(mockUserRepository.update).toHaveBeenCalledWith(expect.any(UserModel));
    });

    it('should throw if user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(userEmailUpdate.exec({ id: 'id-not-exists', email: 'new@gmail.com', password: '123456' })).rejects.toThrow(ApiException);

      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.update).not.toHaveBeenCalled();
    });

    it('should throw if email is the same', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);

      await expect(userEmailUpdate.exec({ id: mockUser.get.id, email: mockUser.get.email, password: '123456' })).rejects.toThrow(ApiException);

      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findByEmail).not.toHaveBeenCalled();
    });

    it('should throw if email already exists', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.findByEmail.mockResolvedValue(new UserModel(mockUser.get, 'id-02'));

      await expect(userEmailUpdate.exec({ id: mockUser.get.id, email: 'existente@gmail.com', password: '123456' })).rejects.toThrow(ApiException);

      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(mockCripto.compare).not.toHaveBeenCalled();
    });

    it('should throw if password is invalid', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockCripto.compare.mockResolvedValue(false);

      await expect(userEmailUpdate.exec({ id: mockUser.get.id, email: 'new@gmail.com', password: 'wrong' })).rejects.toThrow(ApiException);

      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.update).not.toHaveBeenCalled();
    });
  });
});
