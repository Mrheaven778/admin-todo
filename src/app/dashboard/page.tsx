import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUsers } from "@/user/action/action-createUser";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  const users = await getUsers();
  const userRoles = session.user?.roles ?? "No Roles";

  return (
    <div className="grid gap-6 grid-cols-1 ">
      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.email}</span>

          <div>{JSON.stringify(session)}</div>
          {userRoles === "admin" && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Usuarios
              </h2>
              <hr />
              {users.map((user) => (
                <Link
                  href={`/dashboard/user/${user.id}`}
                  key={user.id}
                  className="flex items-center justify-between  p-4 rounded-lg my-4 bg-gray-200 text-black font-medium hover:bg-gray-300 transition hover:shadow-lg hover:scale-105 cursor-pointer"
                >
                  <div className="flex flex-col ">
                    <span className="font-bold text-lg">
                      Nombre: <span className="uppercase">{user.name}</span>
                    </span>
                    <span className="mt-1">Email: {user.email}</span>
                    <span className="mt-1">Roles: {user.roles}</span>
                  </div>
                  {/* <Link href={`#`} className="text-blue-700 hover:underline">
                    Editar Rol
                  </Link> */}
                </Link>
              ))}
            </div>
          )}
        </div>
      </WidgetItem>
    </div>
  );
}
