import { AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import { useBoardStore } from "./store/useBoardStore";
import { MdOutlinePlusOne } from "react-icons/md";

export default function Controls() {
  const boardState = useBoardStore(state => state);

  return (
    <div className="mt-2 flex flex-row gap-2">
        <div className="grid grid-rows-2 grid-cols-3 gap-1 h-20 aspect-video">
          <div aria-hidden="true"></div>
          <button
            className="bg-gray-700 rounded-md p-1 flex items-center justify-center"
            onClick={() => boardState.moveUp()}
          >
            <AiOutlineArrowUp className="text-zinc-100"/>
          </button>
          <div aria-hidden="true"></div>
          <button
            className="bg-gray-700 rounded-md p-1 flex items-center justify-center"
            onClick={() => boardState.moveLeft()}
          >
            <AiOutlineArrowLeft className="fill-zinc-100"/>
          </button>
          <button
            className="bg-gray-700 rounded-md p-1 flex items-center justify-center"
            onClick={() => boardState.moveDown()}
          >
            <AiOutlineArrowDown className="fill-zinc-100"/>
          </button>
          <button
            className="bg-gray-700 rounded-md p-1 flex items-center justify-center"
            onClick={() => boardState.moveRight()}
          >
            <AiOutlineArrowRight className="fill-zinc-100"/>
          </button>
        </div>
        <button
          className="bg-gray-700 rounded-md p-1 flex items-center justify-center aspect-video"
          onClick={() => boardState.addNew()}
        >
          <MdOutlinePlusOne className="fill-zinc-100" />
        </button>
      </div>
  );
}