import Image from "next/image";
import { NavBar } from "./components/NavBar";

export default function Home() {
  return (
    <div className="h-200">
      <NavBar />
      <h1>This is Home</h1>
    </div>
  );
}
