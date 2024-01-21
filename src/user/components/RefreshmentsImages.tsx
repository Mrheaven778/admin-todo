import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { selectImg } from "../action/action-createUser";

export default async function RefreshmentsImages() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const urlImg = `/img/${await selectImg(session.user?.id)}`;

  return (
    <div>
      {urlImg && (
        <Image
          src={urlImg}
          className="rounded-full w-24 md:w-36 h-24 md:h-36 object-cover"
          alt="foto del usuario"
          width={300}
          height={300}
        />
      )}
    </div>
  );
}
