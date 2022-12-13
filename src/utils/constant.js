import { MdOutlineGroup } from "react-icons/md";
import { BiChat } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";

export const DEFAULT_AVATAR =
  "https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/default-avatar.png";

export const PSIKOLOG_PATHS = [
  {
    icon: MdOutlineGroup,
    name: "Pertanyaan Diskusi",
    pathname: "/psikolog/discussion",
    activePathPatterns: [
      "/psikolog/discussion",
      "/psikolog/discussion/:questionId",
    ],
  },
  {
    icon: BiChat,
    name: "Chat Personal",
    pathname: "/psikolog/personal-chat",
    activePathPatterns: [
      "/psikolog/personal-chat",
      "/psikolog/personal-chat/:roomId",
    ],
  },
  {
    icon: FaRegUser,
    name: "Profil",
    pathname: "/psikolog/profile",
    activePathPatterns: ["/psikolog/profile"],
  },
];

export const ADMIN_PATHS = [
  {
    icon: IoMdDocument,
    name: "Manajemen Materi",
    pathname: "/admin/material-management",
    activePathPatterns: [
      "/admin/material-management",
      "/admin/material-management/add",
      "/admin/material-management/:materialId/edit",
    ],
  },
  {
    icon: MdOutlineGroup,
    name: "Manajemen Psikolog",
    pathname: "/admin/psikolog-management",
    activePathPatterns: [
      "/admin/psikolog-management",
      "/admin/psikolog-management/new-psikolog",
    ],
  },
];
