import Image from "next/image";
import { user } from "@/app/profile/dummyUserData";

interface ProfileInfoProps {
  isProfileVisible: boolean; // Define the prop type
}

export default function ProfileInfo({ isProfileVisible }: ProfileInfoProps) {
  
  const ratingStars = (rating: number) => {
    const starImages = [];
    for (let i = 0; i < rating; i++) {
      starImages.push(
        <Image
          key={i}
          src={`/staricon.png`}
          alt={`Star ${i + 1}`}
          width={20}
          height={20}
        />
      );
    }
    return starImages;
  };

  return (
    <div className="mt-10 flex space-x-4 text-black">
      <div className="w-1/2">
        <h2 className="text-2xl">
          {user.name} {user.lastname}
        </h2>
        <div className="mt-2">
          {!isProfileVisible && (
            <p className="italic text-black mt-8">{user.name} {user.lastname} has set the profile to hidden</p>
          )}
          {isProfileVisible && (
            <>
              <p className="font-bold text-lg">
                Title: <span className="font-light">{user.title}</span>
              </p>
              <p className="font-bold text-lg">
                Location:{" "}
                <span className="font-light">
                  {user.city}, {user.country}
                </span>
              </p>
              <p className="font-bold text-lg">
                Age: <span className="font-light">{user.age}</span>
              </p>
              <p className="font-bold text-lg">
                Work model:{" "}
                <span className="font-light">{user.workModel}</span>
              </p>
              <br />
              <div>
                <p className="font-bold text-lg">
                  Rating: <span className="font-light">{user.rating}/5</span>
                </p>
                <div className="flex items-center">
                  {ratingStars(user.rating)} {/* Render star images */}
                </div>
              </div>
            </>
          )}
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
