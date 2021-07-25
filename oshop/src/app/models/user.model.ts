export interface UserInfo {
  displayName: string | null | undefined;
  email: string | null | undefined;
  uid: string;
  isAdmin?: boolean;
}
