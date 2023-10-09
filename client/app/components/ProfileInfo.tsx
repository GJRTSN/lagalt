import Image from "next/image";
import user from "@/public/tempuserpic.png";

export default function ProfileInfo() {
  return (
    <div className="mt-10 flex space-x-4 text-black">
      <div className="w-1/2">
        <h2 className="text-2xl">Name Lastname</h2>
        <div className="mt-2">
          <p className="font-bold">
            Location: <span className="font-light">Oslo</span>
          </p>
          <p className="font-bold">
            Age: <span className="font-light">32</span>
          </p>
          <p className="font-bold">
            Work model: <span className="font-light">Remote</span>
          </p>
          <br />
          <div>
            <p className="font-bold">
              Rating: <span className="font-light">4/5</span>
            </p>
            <p>****</p>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <Image
          src={user}
          alt="User-picture"
          style={{ 
            borderRadius: 10, 
            objectFit: "contain"
          }}
          
        />
      </div>
    </div>
  );
}
