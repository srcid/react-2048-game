import { clsx } from "clsx";
import { useEffect } from "react";
import { useBoardStore } from "../store/useBoardStore";
import { movements } from "../utils/gameboard";
import Block from "./Block";
import Controls from "./Controls";
import FooterBar from "./FooterBar";

function App() {
  const boardState = useBoardStore((state) => state);

  useEffect(() => {
    function listener(keyboardEvent: KeyboardEvent) {
      console.log("Keydown: ", keyboardEvent.key);

      const move_key = keyboardEvent.key as keyof typeof movements;

      if (move_key) boardState.move(move_key);
    }
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [boardState]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 flex-col items-center justify-center">
        <section className="flex flex-row gap-5 mb-5 w-full justify-center">
          <div className="bg-stone-200 py-2 flex flex-col items-center rounded-2xl min-w-[6rem]">
            <span>Score</span>
            <span>Not Impl</span>
          </div>
          <div className="bg-gray-200 py-2 flex flex-col items-center rounded-2xl min-w-[6rem]">
            <span>Max Score</span>
            <span>Not impl</span>
          </div>
        </section>
        <div className="bg-neutral-500 rounded-2xl m-1 p-4 w-fit">
          <div className="size-80 sm:size-96 grid grid-rows-4 grid-cols-4 gap-4">
            {boardState.boards[0].map((row, i) =>
              row.map((element, j) => (
                <Block
                  className={clsx({
                    "bg-slate-100": element === 0,
                    "bg-orange-400": element === 2,
                    "bg-red-400": element === 4,
                    "bg-orange-700": element === 8,
                    "bg-orange-500": element === 16,
                    "bg-red-500": element === 32,
                    "bg-orange-600": element === 64,
                    "bg-amber-300": element === 128,
                    "bg-amber-400": element === 256,
                    "bg-amber-500": element === 512,
                    "bg-amber-600": element === 1024,
                    "bg-amber-700": element === 2048,
                  })}
                  key={`${i},${j}`}
                >
                  {element || <></>}
                </Block>
              )),
            )}
          </div>
        </div>
        <Controls />
      </div>
      <FooterBar />
    </div>
  );
}

export default App;
