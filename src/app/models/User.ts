export enum STATE {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED'
}

export enum USER_TYPE {
  SUPER = 'SUPER',
  USER = 'USER'
}
export interface User {
  id?: string;
  name?: string;
  email?: string;
  filename?: string;
  bio?: string;
  type?: USER_TYPE,
  state?: STATE
}
