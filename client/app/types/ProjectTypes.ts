export interface ExploreProjectCard {
  projectId: number;
  title: string;
  description: string;
  status: string;
  ownerUserId: number;
  ownerName: string;
  industryName: string;
  skillsRequiredNames: string[];
}

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

export interface Project {
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
  workApplications: WorkApplication[];
}

export interface Participant {
  age: number;
  country: string;
  description: string;
  email: string;
  forName: string;
  includeProjects: boolean;
  lastName: string;
  password: string;
  profileVisible: boolean;
  projects: (Project | null)[];
  skillIds: number[];
  skillNames: string[];
  userId: number;
  userRole: string;
  username: string;
}

export interface WorkApplication {
  accepted: boolean;
  applicationId: number;
  forName: string;
  motivation: string;
  projectId: number;
  userId: number;
}

export interface Skill {
  id: number;
  name: string;
}

export interface Industry {
  id: number;
  name: string;
}

export interface ProjectComment {
  id: number;
  content: string;
  projectId: number;
}

export interface ApplyProjectProps {
  isOpen: boolean;
  isSent: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
}
