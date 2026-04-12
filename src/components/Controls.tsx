import clsx from "clsx";
import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { FaUndoAlt } from "react-icons/fa";
import { MdOutlinePlusOne } from "react-icons/md";
import { useBoardStore } from "../store/useBoardStore";

interface ControlsProps {
  id?: string;
}

export default function Controls({ id }: ControlsProps) {
  const boardState = useBoardStore((state) => state);

  return (
    <div id={id} className="mt-2 flex flex-row gap-2">
      <div className="grid grid-rows-2 grid-cols-3 gap-1 h-20 aspect-video">
        <div aria-hidden="true"></div>
        <button
          id={id ? `${id}-btn-up` : undefined}
          className="bg-gray-700 rounded-md p-1 flex items-center justify-center"
          onClick={() => boardState.moveUp()}
        >
          <AiOutlineArrowUp className="text-zinc-100" />
        </button>
        <div aria-hidden="true"></div>
        <button
          id={id ? `${id}-btn-left` : undefined}
          className="bg-gray-700 rounded-md p-1 flex items-center justify-center"
          onClick={() => boardState.moveLeft()}
        >
          <AiOutlineArrowLeft className="fill-zinc-100" />
        </button>
        <button
          id={id ? `${id}-btn-down` : undefined}
          className="bg-gray-700 rounded-md p-1 flex items-center justify-center"
          onClick={() => boardState.moveDown()}
        >
          <AiOutlineArrowDown className="fill-zinc-100" />
        </button>
        <button
          id={id ? `${id}-btn-right` : undefined}
          className="bg-gray-700 rounded-md p-1 flex items-center justify-center"
          onClick={() => boardState.moveRight()}
        >
          <AiOutlineArrowRight className="fill-zinc-100" />
        </button>
      </div>
      <button
        id={id ? `${id}-btn-addnew` : undefined}
        className="bg-gray-700 rounded-md p-1 flex items-center justify-center aspect-video"
        onClick={() => boardState.addNew()}
      >
        <MdOutlinePlusOne className="fill-zinc-100" />
      </button>
      <button
        id={id ? `${id}-btn-undo` : undefined}
        className="bg-gray-700 rounded-md p-1 flex items-center justify-center size-20"
        onClick={() => boardState.undo()}
      >
        <FaUndoAlt
          className={clsx({
            "fill-zinc-100": boardState.boards.length > 1,
            "fill-zinc-500": boardState.boards.length === 1,
          })}
        />
      </button>
    </div>
  );
}
