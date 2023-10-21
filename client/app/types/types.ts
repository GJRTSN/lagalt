export interface ProjAdminList {
  projectId: number;
  title: string;
  description: string;
  status: string;
  ownerUserId: number;
  ownerName: string;
  industryName: string;
  skillsRequiredNames: string[];
}

export interface Skill {
  id: number;
  name: string;
}

export interface Industry {
  id: number;
  name: string;
}

export interface CreateProjectDTO {
  description: string;
  industryId: number;
  industryName: string;
  ownerName: string;
  ownerUserId: number;
  projectId: number;
  skillsRequiredIds: number[];
  skillsRequiredNames: string[];
  status: string;
  title: string;
}

interface Participant {
  age: number;
  country: string;
  description: string;
  email: string;
  forName: string;
  includeProjects: boolean;
  lastName: string;
  password: string;
  projects: (null | CreateProjectDTO)[];
  skills: string[];
  userId: number;
  userRole: string;
  username: string;
}

export interface UpdatedProjectDTO {
  description: string;
  industryId: number;
  industryName: string;
  ownerName: string;
  ownerUserId: number;
  participants: Participant[];
  projectId: number;
  skillsRequiredIds: number[];
  skillsRequiredNames: string[];
  status: string;
  title: string;
}

export interface ProjectComment {
  id: number;
  content: string;
  projectId: number;
}

export interface ApplyProjectProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
}

export interface Project {
  id: number;
  name: string;
  userId: number;
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
  projects: Project[];
  username: string;
  password: string;
  age: number;
  skills: string[];
}

export interface UpdateUserDTO {
  userId: number;
  forName: string;
  lastName: string;
  description: string;
  country: string;
  email: string;
  userRole: string;
  includeProjects: boolean;
  projects: Project[];
  username: string;
  password: string;
  age: number;
  skills: string[];
}