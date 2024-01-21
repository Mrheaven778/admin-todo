import React from "react";
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { SidebarItem } from "./SidebarItem";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline />,
    title: "Server Actions",
    path: "/dashboard/server-todos",
  },
  {
    icon: <IoPersonOutline />,
    title: "Perfil",
    path: "/dashboard/profile",
  },
];

export default function NavMobile() {
  return (
    <div className="absolute mt-2 bg-white p-2">
      <ul className="space-y-2 tracking-wide mt-8">
        {menuItems.map((item) => (
          <SidebarItem key={item.path} {...item} />
        ))}
      </ul>
    </div>
  );
}
