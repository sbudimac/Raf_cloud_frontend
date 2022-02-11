export interface LoginResponse {
  jwt: string,
}

export interface PermissionResponse {
  permissions: Permissions
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  permissions: Permissions
}

export interface Permissions {
  canReadUsers: boolean,
  canCreateUsers: boolean,
  canUpdateUsers: boolean,
  canDeleteUsers: boolean,
  canSearchMachines: boolean,
  canStartMachines: boolean,
  canStopMachines: boolean,
  canDestroyMachines: boolean,
  canRestartMachines: boolean,
  canCreateMachines: boolean
}

export interface Machine {
  name: string,
  date: Date,
  status: Status,
  active: boolean,
  user: User
}

export enum Status {
  STOPPED,
  RUNNING
}
