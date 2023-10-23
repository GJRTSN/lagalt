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
