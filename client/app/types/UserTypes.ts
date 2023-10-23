import { ProjAdminList } from "./ProjectTypes";
import { Skill } from "./types";

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

export interface UpdateUser {
  userId: number;
  forName: string;
  lastName: string;
  description: string;
  country: string;
  title: string;
  email: string;
  userRole: string;
  includeProjects: boolean;
  projects: ProjAdminList[];
  username: string;
  password: string;
  age: number;
  skills: Skill[];
}

export interface UserProfile {
  userId: number;
  forName: string;
  lastName: string;
  description: string;
  country: string;
  email: string;
  userRole: string;
  includeProjects: boolean;
  projects: any[];
  username: string;
  password: string;
  age: number;
  skillIds: number[];
  skillNames: string[];
  profileVisible: boolean;
}
