import { TestBed } from '@angular/core/testing';

import { EventInterceptorInterceptor } from './event-interceptor.interceptor';

describe('EventInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EventInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EventInterceptorInterceptor = TestBed.inject(EventInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
