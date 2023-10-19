export default function YourApplications() {
  return (
    <div
      id="applications"
      className="w-3/4 h-1/4 m-4 bg-[#CCCCCC] rounded-lg p-4"
    >
      <h3 className="text-black text-4xl font-bold font-roboto">
        Your applications
      </h3>
      <p className="text-black font-roboto">
        Projects you have applied to join
      </p>
      <div className="w-full h-full bg-[#FDFDFD] rounded-lg p-2">
        <p className="text-black">ProjectName</p>
        <p className="text-black">ProjectName</p>
        <p className="text-black">ProjectName</p>
        <p className="text-black">ProjectName</p>
      </div>
    </div>
  );
}
