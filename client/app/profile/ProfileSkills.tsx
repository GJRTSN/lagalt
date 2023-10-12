import {user} from "./dummyUserData"

export default function ProfileSkills() {
    return (
        <div id="skills" className="mt-8 text-black bg-gray-300 p-4 rounded-xl">
        <h2 className="text-2xl">Skills</h2>
        <div className="flex flex-wrap mt-2 mb-2">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-300 text-blue-900 px-2 py-1 rounded mr-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
}
