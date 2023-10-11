export default function CreateProject() {
  return (
    <div className="h-full min-h-screen bg-white">
      <div
        id="switchContainer"
        className="w-full h-12 bg-yellow-500 flex flex-row items-center justify-center mb-4 "
      >
        {/* <button className="w-24 h-8 bg-green-700 rounded-md">Sign in</button> */}
      </div>
      <div className="h-3/5 flex bg-white flex-col items-center justify-center">
        <div
          id="admindash"
          className="w-3/4 h-full bg-[#CCCCCC] rounded-lg p-4 "
        >
          <div className="w-1/2 float-right">
            <button className="w-auto h-8 bg-green-700 rounded-md px-2 float-right">
              Save
            </button>
          </div>

          <h3 className="text-black text-4xl font-bold font-roboto mb-4 ">
            Create new project
          </h3>
          <div className="flex flex-col">
            <input
              type="number"
              placeholder="PROJECT ID"
              className="text-black w-1/4 h-8 rounded-md p-2 my-2"
            />
            <input
              type="number"
              placeholder="PROJECT NAME"
              className="text-black w-1/4 h-8 rounded-md p-2 my-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
