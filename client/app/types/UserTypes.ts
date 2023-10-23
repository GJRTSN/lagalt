export interface RegisterUserData {
  username: string;
  forName: string;
  description: string;
  lastName: string;
  includeProjects: boolean;
  email: string;
  skillIds: number[];
  skillNames: string[];
  profileVisible: boolean;
  age: number;
  country: string;
  userRole: string;
  password: string;
}
