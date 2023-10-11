import { user } from "./dummyUserData";

export default function ProfileAbout() {
  return (
    <div className="mt-8 text-black">
      <h2 className="text-2xl">About</h2>
      {user.about.map((paragraph, index) => (
        <p key={index} className="mt-2">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
