'use client';

import { Button } from "@/components";

export const Aside = () => {
  const buttonSharedProps = {
    className: "!bg-none hover:bg-[#21223B] px-0d75",
  };

  return (
    <aside>
      <nav className="flex flex-col gap-200">
        <div className="flex flex-col items-start gap-0d75">
          <Button {...buttonSharedProps} size="sm" as="a" target="_blank" href="https://yahiarefaiea.com/about/">About Yahia</Button>
          <Button {...buttonSharedProps} size="sm" onClick={() => alert("I would be delighted to share details of my recent projects when I am shortlisted ^^")}>Some of my recent projects</Button>
          <Button {...buttonSharedProps} size="sm" as="a" target="_blank" href="https://projects-beta.yahiarefaiea.com/">Some of my old projects</Button>
        </div>

        <div className="flex flex-col gap-100">
          <small className="font-bold uppercase pl-0d50 text-[#A3A3A8]">Find me anywhere @yahiarefaiea</small>
          <div className="flex flex-wrap gap-0d75">
            <Button {...buttonSharedProps} size="sm" as="a" target="_blank" href="https://codepen.io/yahiarefaiea">Codepen</Button>
            <Button {...buttonSharedProps} size="sm" as="a" target="_blank" href="https://linkedin.com/in/yahiarefaiea">LinkedIn</Button>
            <Button {...buttonSharedProps} size="sm" as="a" target="_blank" href="https://github.com/yahiarefaiea">GitHub</Button>
          </div>
        </div>

        <div className="flex flex-col gap-100">
          <small className="font-bold uppercase pl-0d50 text-[#A3A3A8]">Links related to this take-home challenge</small>
          <div className="flex flex-col items-start gap-0d75">
            <Button {...buttonSharedProps} size="sm" as="a" target="_blank" href="https://github.com/yahiarefaiea/challenge-software-engineer-thmanyah-250817">Link to repo</Button>
            <Button {...buttonSharedProps} size="sm" as="a" target="_blank" href="https://www.figma.com/design/YgnA4a0IlQTcsVuHNPs0DG/Untitled?node-id=0-1&t=PnnwuaXFXSuXhisd-1">Link to Figma file</Button>
            <Button {...buttonSharedProps} size="sm" as="a" target="_blank" href="https://drive.google.com/drive/folders/1UK_Y5X2XPp-ffJsG3U8PQkOi0-75Mdyz?usp=sharing">Time-lapse video while designing</Button>
          </div>
        </div>
      </nav>

      <p className="text-sm text-[#777]">
        Thanks for considering me ^^
        <br />
        Let’s work together soon :)
        <br />
        <br />
        P.S. check some of my projects from the links in the side menu.
      </p>
    </aside>
  );
};
