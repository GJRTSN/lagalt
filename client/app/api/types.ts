export interface ProjectCardProps {
  project: {
    projectId: number;
    title: string;
    description: string;
    status: string;
    ownerUserId: number;
    ownerName: string;
    industryName: string;
    skillsRequiredNames: string[];
  };
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
