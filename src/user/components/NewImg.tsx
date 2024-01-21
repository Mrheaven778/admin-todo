"use client";
import { newImg } from "@/user/action/action-createUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  id: any;
}

function NewImg({ id }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState();
  const onSubmit = handleSubmit(async (data) => {
    const { img } = data;
    const file = img[0];
    const url = img[0].name;

    setFile(file);
    // si no es un formato de imagen valido
    if (!file.type.match("image.*")) {
      return;
    }
    const form = new FormData();
    form.set("file", file);
    await newImg(id, url, form);
    router.refresh();
  });
  const onClick = () => {
    const input = document.getElementById("img");
    input?.click();
  };
  return (
    <div className="mt-12 flex items-center justify-center bg-gray-100">
      <form
        action=""
        className="bg-white md:w-96 w-full p-6 rounded-lg shadow-md text-center"
        onSubmit={onSubmit}
      >
        <label
          htmlFor="img"
          className="md:text-3xl text-2xl text-center font-semibold mb-6 text-gray-800"
        >
          Cambiar Imagen
        </label>
        <div className="relative border-dashed border-2 border-gray-300 bg-gray-100 rounded-md py-12 flex justify-center items-center mb-6 mt-4">
          <div className="text-gray-500">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => onClick()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
        <input
          type="file"
          id="img"
          className="hidden"
          {...register("img", { required: true })}
          accept="image/*"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-sky-600 to-cyan-400 group hover:from-sky-700 hover:to-cyan-500 hover:text-white px-6 py-3 rounded-md w-full focus:outline-none focus:shadow-outline-blue"
        >
          Cambiar
        </button>
      </form>
    </div>
  );
}

export default NewImg;