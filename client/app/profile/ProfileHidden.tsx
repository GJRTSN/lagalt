import Image from "next/image";
import { user } from "@/app/profile/dummyUserData";

export default function ProfileHidden() {
  return (
    <div className="mt-10 flex space-x-4 text-black">
      <div className="w-1/2">
        <h2 className="text-2xl">
          {user.name} {user.lastname}
        </h2>
        <div className="mt-10">
          <p className="italic text-lg">
            <span>{user.name} {user.lastname} has set his profile to hidden</span>
          </p>
        </div>
      </div>
      <div className="w-1/2">
        <Image
          src={user.image}
          alt="User-picture"
          width={500}
          height={300}
          style={{
            borderRadius: 10,
          }}
        />
      </div>
    </div>
  );
}
