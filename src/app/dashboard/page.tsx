import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUsers } from "@/user/action/action-createUser";
import { DataView } from "@/interfaces/DataView";
import Viewdata from "@/components/Viewdata";
import ViewUser from "@/components/ViewUser";



export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  const users = await getUsers();
  const userRoles = session.user?.roles ?? "No Roles";

  const dataView: DataView[] = [
    {
      data: "Ver tareas",
      description: "Podras ver las tareas pendientes que tienes y create nuevas tareas"
    },
    {
      data: "Ver Perfil",
      description: "Podras ver tu perfil"
    }
  ]

  return (
    <div className="grid gap-6 grid-cols-1 ">
      <WidgetItem title="Usuario conectado Admin-Todo">
        <section className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl md:text-3xl font-bold">Bien venido a admin todo </h1>
            <hr className="h-1 w-52 bg-cyan-600 " />
            <p className="text-lg font-semibold">Usuario : {session.user?.name}</p>
          </div>
          <Viewdata datas={dataView}/>
        </section>
        
        <ViewUser users={users} roleUsuario={userRoles}/> 
      </WidgetItem>
    </div>
  );
}