import { clsx } from "clsx";

interface BlockProps extends React.PropsWithChildren {
  className: string
}

export default function Block({className, children} : BlockProps) {
  return (
    <div
      className={clsx(
        "rounded-md aspect-square text-6xl flex justify-center items-center",
        className
      )}
    >
      {children}
    </div>
  );
}
