import Logo from "@/app/components/logo";
import SidePane from "../../SidePane";
export default function SidePaneShell({ state }: { state: boolean }) {
  return (
    <div
      className={`${
        state
          ? "col-span-0 lg:col-span-2 h-screen lg:sticky lg:top-0 lg:self-start fixed z-50 top-15 left-0 lg:z-auto "
          : "lg:col-span-0 fixed top-0 left-0 "
      } bg-[#0F1520]`}
    >
      <Logo></Logo>
      <hr />
      <SidePane />
    </div>
  );
}

// ${
//         state ? "top-15 left-0 h-full w-64 z-50 fixed " : "hidden"
//       }`}
