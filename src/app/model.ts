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
  canDeleteUsers: boolean
}
