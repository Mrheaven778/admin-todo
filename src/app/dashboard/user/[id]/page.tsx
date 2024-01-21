import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { WidgetItem } from "@/components";
import CardTodoUser from "@/todos/components/CardTodoUser";
import { NewTodoUser } from "@/todos/components/NewTodoUser";
import { getUser } from "@/user/action/action-createUser";
import ChangeRoles from "@/user/components/ChangeRoles";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Usuario ",
  description:
    "Es la pagina de usuario de la aplicacion donde el admin puede tocar todo",
};

export default async function UserPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerSession(authOptions);
  try {
    if (session?.user?.roles !== "admin") {
      return (
        <WidgetItem title={`No tienes permisos`}>NO TIENES PERMISOS</WidgetItem>
      );
    }
    const user = await getUser(params.id);

    return (
      <WidgetItem title={`Usuario: ${user.name}`}>
        <ChangeRoles user={user} />
        <div className="w-full px-3 mx-5 mb-5">
          <NewTodoUser user={user} />
        </div>
        <CardTodoUser todos={user.todos} />
      </WidgetItem>
    );
  } catch (error) {
    return (
      <div className="bg-gray-200 p-3 rounded-lg">
        <h2 className="text-center text-2xl font-bold">
          Usuario no encontrado
        </h2>
      </div>
    );
  }
}
