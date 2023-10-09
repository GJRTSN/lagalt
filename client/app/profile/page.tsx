import ProfileAbout from "../components/ProfileAbout";
import ProfileInfo from "../components/ProfileInfo";
import ProfileProjects from "../components/ProfileProjects";

export default function Profile() {
  return (
    <div className="h-screen bg-white">
      <div className="w-full h-12 bg-yellow-500 flex flex-row items-center justify-center">
        <div className="w-2/4 flex justify-between">
          <p className="text-black italic py-2">
            This is how your profile looks like for others
          </p>
          <button className="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded-full">
            Edit
          </button>
        </div>
      </div>
      <div className="flex bg-white flex-col items-center justify-center">
        <div className="w-2/4">
          <ProfileInfo />
          <ProfileAbout />
          <ProfileProjects />
        </div>
      </div>
    </div>
  );
}
