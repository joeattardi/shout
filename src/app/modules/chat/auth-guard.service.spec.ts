import { AuthGuard } from './auth-guard.service';

describe('AuthGuard', () => {
  const mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const authGuard = new AuthGuard(mockAuthService, mockRouter);

  it('should return true if the user is logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    expect(authGuard.canActivate()).toBe(true);
  });

  it('should return false and navigate to the homepage if the user is not logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(false);
    expect(authGuard.canActivate()).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
