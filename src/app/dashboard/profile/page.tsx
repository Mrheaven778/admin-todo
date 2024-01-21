import { getUserSessionServer } from "@/auth/actions/auth-actions";
import NewImg from "@/user/components/NewImg";
import RefreshmentsImages from "@/user/components/RefreshmentsImages";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUserSessionServer();
  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-semibold text-center mb-6">
        Perfil de <span className="text-cyan-600">{user?.name}</span>
      </h1>
      <hr className="border-t border-gray-300 mb-6" />
      <div className="flex flex-col items-center justify-center mt-8 space-y-3">
        <RefreshmentsImages  />
        <h2 className="md:text-xl text-base">
          Nombre del usuario:{" "}
          <span className="font-semibold">{user?.name}</span>
        </h2>
        <h2 className="md:text-xl text-base">
          Email del usuario:{" "}
          <span className="font-semibold">{user?.email}</span>
        </h2>
        <h3 className="md:text-xl text-base">
          Rol del usuario: <span className="font-semibold">{user?.roles}</span>
        </h3>
      </div>
      <NewImg id={user?.id} />
    </div>
  );
}
