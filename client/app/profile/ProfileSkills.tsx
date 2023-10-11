import {user} from "./dummyUserData"

export default function ProfileSkills() {
    return (
        <div id="skills" className="mt-8 text-black">
        <h2 className="text-2xl">Skills</h2>
        <div className="flex flex-wrap">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
}
