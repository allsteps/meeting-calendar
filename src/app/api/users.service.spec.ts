import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  const dummyUserListResponse = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jake' },
    { id: 3, name: 'Jill' },
  ];

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addUser() should add new user and return it', () => {
    service.addUser({ name: 'John' }).subscribe((res) => {
      expect(res).toEqual({ id: 1, name: 'John' });
    });
  });

  it('getUsers() should return a list of users', () => {
    service.addUser({ name: 'John' });
    service.addUser({ name: 'Jake' });
    service.addUser({ name: 'Jill' });
    service.getUsers().subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
    });
  });
});
