"use client";
import { useToDoState } from "@/store";

const Stat = () => {
  const list = useToDoState((state) => state.list);
  const doneCount = list.filter((item) => item.status).length;

  return (
    <div className="border border-secondary  rounded-2xl p-4 mt-10 flex justify-between items-center">
      <div className="">
        <h3 className="text-2xl">Todo Done</h3>
        <p className="mt-1 font-light">Keep it up</p>
      </div>
      <div className="h-24 aspect-square flex items-center justify-center text-2xl font-semibold text-black bg-primary rounded-full">
        {doneCount}/{list.length}
      </div>
    </div>
  );
};

export default Stat;
