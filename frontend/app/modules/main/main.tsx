import {BaseBtn} from "~/shared/ui";
import type { Route } from "./+types/main";
import RequireAuth from "../auth/hooks/require_auth";
import { useAuth } from "../auth/hooks/auth";
import { toast } from "react-toastify";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Main" },
    { name: "description", content: "Welcome to Main page!" },
  ];
}

function Main() {

  const {logout} = useAuth();

  const handleLogout = () => {
    logout()
    toast.info('Logout is  successful');
  }

  return <main>
    
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full">
        {/* Левая часть */}
        <div className="p-10 flex flex-row justify-between md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Главную страница!
          </h1>
          <div>
            <BaseBtn
              text="Logout"
              handler={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>

  </main>;
}

function MainPage() {
  return (
    <RequireAuth>
      <Main />
    </RequireAuth>
  );
}

export default MainPage;