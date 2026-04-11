import { clsx } from "clsx";

interface BlockProps extends React.PropsWithChildren {
  id?: string,
  className: string
}

export default function Block({id, className, children} : BlockProps) {
  return (
    <div id={id}
      className={clsx(
        "rounded-md aspect-square text-6xl flex justify-center items-center",
        className
      )}
    >
      {children}
    </div>
  );
}
