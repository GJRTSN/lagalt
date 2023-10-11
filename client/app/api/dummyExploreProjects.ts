import logo from "@/public/noroff.png";
import viewIcon from "@/public/eye-solid.svg";
import { StaticImageData } from "next/image";

export interface Skill {
  id: number;
  name: string;
}

export interface Industry {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  owner: string;
  industry: Industry;
  skillsRequired: Skill[];
  status: string;
  viewCount: number;
  logo: StaticImageData;
  viewIcon: StaticImageData;
}

const dummyData: Project[] = [
  {
    id: 9001,
    name: "JAVA CONSOLE GAME",
    owner: "Owner 1",
    industry: { id: 1, name: "Web Development" },
    skillsRequired: [
      { id: 1, name: "Java" },
      { id: 2, name: "Spring Boot" },
      { id: 3, name: "Hibernate" },
    ],
    status: "Not Started",
    viewCount: 4873,
    logo: logo,
    viewIcon: viewIcon,
  },
  {
    id: 9002,
    name: "SIGN LANGUAGE TRANSLATOR",
    owner: "Owner 2",
    industry: { id: 2, name: "Graphic Design" },
    skillsRequired: [
      { id: 4, name: "Adobe Illustrator" },
      { id: 5, name: "Adobe Photoshop" },
      { id: 6, name: "Sketch" },
    ],
    status: "In Progress",
    viewCount: 3500,
    logo: logo,
    viewIcon: viewIcon,
  },
  {
    id: 9003,
    name: "POKEMON TRAINER",
    owner: "Owner 3",
    industry: { id: 3, name: "Game Development" },
    skillsRequired: [
      { id: 7, name: "Unity" },
      { id: 8, name: "Unreal Engine" },
      { id: 9, name: "C++" },
    ],
    status: "Completed",
    viewCount: 6000,
    logo: logo,
    viewIcon: viewIcon,
  },
  {
    id: 9011,
    name: "VIRTUAL CONCERT PLATFORM",
    owner: "Owner 11",
    industry: { id: 4, name: "Music" },
    skillsRequired: [
      { id: 10, name: "Audio Engineering" },
      { id: 11, name: "Sound Design" },
      { id: 12, name: "Music Production" },
    ],
    status: "Not Started",
    viewCount: 2800,
    logo: logo,
    viewIcon: viewIcon,
  },
  {
    id: 9012,
    name: "FILM EDITING SUITE",
    owner: "Owner 12",
    industry: { id: 5, name: "Film" },
    skillsRequired: [
      { id: 13, name: "Videography" },
      { id: 14, name: "Final Cut Pro" },
      { id: 15, name: "Adobe Premiere Pro" },
    ],
    status: "In Progress",
    viewCount: 4500,
    logo: logo,
    viewIcon: viewIcon,
  },
];

export default dummyData;
