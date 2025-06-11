import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  // Helper to check if user is online
  const isUserOnline = (userId) => onlineUsers.includes(userId);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2"></div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users && users.length > 0 ? (
          users.map((user) => (
            <button
              key={user._id}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg mb-2 transition-colors ${
                selectedUser && selectedUser._id === user._id
                  ? "bg-base-200"
                  : "hover:bg-base-200/70"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                {isUserOnline(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0 hidden lg:block">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-xs text-base-content/70 truncate">
                  {user.email}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-base-content/70 mt-8">
            No users found.
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
