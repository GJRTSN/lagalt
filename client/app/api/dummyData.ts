interface Project {
  id: number;
  name: string;
  owner: string;
  industry: string;
  skillsRequired: string[];
  status: string;
  viewCount: number;
}

import logo from "@/public/noroff.png";
import viewIcon from "@/public/eye-solid.svg";

const dummyData = [
  {
    id: 9001,
    name: "JAVA CONSOLE GAME",
    owner: "Owner 1",
    industry: "Web Development",
    skillsRequired: ["Web Development", "Music"],
    status: "Not Started",
    viewCount: 4873,
    logo,
    viewIcon,
  },
  {
    id: 9002,
    name: "SIGN LANGUAGE TRANSLATOR",
    owner: "Owner 2",
    industry: "Graphic Design",
    skillsRequired: ["Graphic Design", "Illustration"],
    status: "In Progress",
    viewCount: 3500,
    logo,
    viewIcon,
  },
  {
    id: 9003,
    name: "POKEMON TRAINER",
    owner: "Owner 3",
    industry: "Game Development",
    skillsRequired: ["Game Development", "3D Modeling"],
    status: "Completed",
    viewCount: 6000,
    logo,
    viewIcon,
  },
];

export default dummyData;
