import { AiFillGithub } from "react-icons/ai";

export default function FooterBar() {
  const ghUserUrl = "https://github.com/srcid/";
  const ghProjName = "react-2048-game/";

  return (
    <footer className="text-center p-4 bg-slate-100 text-neutral-900">
      <p>
        Developed with ❤️ by{" "}
        <a className="link" href={ghUserUrl} target="_blank">
          Alcides Ribeiro 👨‍💻
        </a>
      </p>
      <p className="flex gap-1 justify-center">
        See more about at
        <a
          className="flex flex-row items-center gap-1 link"
          href={`${ghUserUrl}${ghProjName}`}
          target="_blank"
        >
          Source Code <AiFillGithub className="size-5" />
        </a>
      </p>
    </footer>
  );
}
