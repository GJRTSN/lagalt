import { Participant, ProjAdminList, WorkApplication } from "./ProjectTypes";
import { Skill } from "./ProjectTypes";

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

export interface ReducedUser {
  userId: number;
  username: string;
  forName: string;
  lastName: string;
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

export interface User {
  userId: number;
  forName: string;
  lastName: string;
  description: string;
  country: string;
  email: string;
  userRole: string;
  includeProjects: boolean;
  projects: UserProject[];
  username: string;
  password: string;
  age: number;
  skillIds: number[];
  skillNames: string[];
  profileVisible: boolean;
}

interface UserProject {
  projectId: number;
  title: string;
  description: string;
  status: string;
  ownerUserId: number;
  ownerName: string;
  participants: Participant[];
  industryName: string;
  skillsRequiredNames: string[];
  industryId: number;
  skillsRequiredIds: number[];
  workApplications: WorkApplication[];
}
