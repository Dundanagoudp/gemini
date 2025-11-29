import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/components/Main/Main";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <Main />
    </div>
  );
}

