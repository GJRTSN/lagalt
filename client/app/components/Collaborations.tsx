const Collaborations: React.FC = () => {
  return (
    <div id="collabs" className="w-3/4 h-1/4 m-4 bg-[#CCCCCC] rounded-lg p-4">
      <h3 className="text-black text-4xl font-bold font-roboto">
        Current collaborations
      </h3>
      <p className="text-black font-roboto">
        Projects you currently are participating on
      </p>
      <div className="w-full h-full bg-[#FDFDFD] rounded-lg p-2">
        <p className="text-black">ProjectName</p>
        <p className="text-black">ProjectName</p>
        <p className="text-black">ProjectName</p>
        <p className="text-black">ProjectName</p>
      </div>
    </div>
  );
};

export default Collaborations;
