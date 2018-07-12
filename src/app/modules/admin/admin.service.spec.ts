import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';

const mockAuthService = {
  getToken() {
    return 'abc123';
  }
};

describe('AdminService', () => {
  let adminService: AdminService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    adminService = new AdminService(httpClient, <any>mockAuthService);
  });

  it('should request the list of users', () => {
    adminService.getUsers().subscribe(() => {});

    const req = httpTestingController.expectOne('/api/admin/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
  });

  it('should delete a user by ID', () => {
    adminService.deleteUser({ id: 1 }).subscribe(() => {});

    const req = httpTestingController.expectOne('/api/admin/users/1');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
  });

  it('should get a user by ID', () => {
    adminService.getUser(1).subscribe(() => {});

    const req = httpTestingController.expectOne('/api/admin/users/1');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
  });

  it('should save a new user', () => {
    adminService
      .saveUser(null, {
        firstName: 'Joe',
        lastName: 'Foo',
        username: 'joe',
        email: 'joe@foo.com',
        admin: true,
        password: 'foo'
      })
      .subscribe(() => {});

    const req = httpTestingController.expectOne('/api/admin/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
    expect(req.request.body).toEqual({
      firstName: 'Joe',
      lastName: 'Foo',
      username: 'joe',
      email: 'joe@foo.com',
      admin: true,
      password: 'foo'
    });
  });

  it('should save an existing user', () => {
    adminService
      .saveUser(1, {
        firstName: 'Joe',
        lastName: 'Foo',
        username: 'joe',
        email: 'joe@foo.com',
        admin: true,
        password: 'foo'
      })
      .subscribe(() => {});

    const req = httpTestingController.expectOne('/api/admin/users/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
    expect(req.request.body).toEqual({
      firstName: 'Joe',
      lastName: 'Foo',
      username: 'joe',
      email: 'joe@foo.com',
      admin: true,
      password: 'foo'
    });
  });

  it('should check if a username is taken for an existing user', () => {
    adminService.checkUsernameTaken('joe', 7).subscribe(() => {});

    const req = httpTestingController.expectOne('/api/admin/username_check?username=joe&userId=7');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
  });

  it('should check if a username is taken for a new user', () => {
    adminService.checkUsernameTaken('joe', null).subscribe(() => {});

    const req = httpTestingController.expectOne('/api/admin/username_check?username=joe');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
  });
});
