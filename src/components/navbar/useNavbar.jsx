import { useDisclosure, useToast } from "@chakra-ui/react";
import { useAuthContext } from "../../context/authContext";
import useComponentVisible from "../../hooks/useComponentVisible";
import { useLocation, useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import { useEffect, useMemo, useState } from "react";
import {
  getAllNotifications,
  markAllNotificationAsRead,
  readNotification,
} from "../../api-fetch/notification";
import { pusherInstance } from "../../utils/helper";
import { DEFAULT_AVATAR } from "../../utils/constant";

function useNavbar() {
  const { userInfo, isAuthenticated } = useAuthContext();
  const {
    ref: profileDropdownRef,
    isComponentVisible: isProfileDropdownVisible,
    setIsComponentVisible: setisProfileDropdownVisible,
  } = useComponentVisible();
  const {
    ref: notificationDropdownRef,
    isComponentVisible: isNotificationDropdownVisible,
    setIsComponentVisible: setIsNotificationDropdownVisible,
  } = useComponentVisible();
  const toast = useToast();
  const navigate = useNavigate();
  const {
    isOpen: isLogoutModalOpen,
    onOpen: openLogoutModal,
    onClose: closeLogoutModal,
  } = useDisclosure();
  const { isOpen: isSidebarOpen, onToggle: toggleSidebar } = useDisclosure();
  const { pathname } = useLocation();
  const { isMobile } = useIsMobile();

  const [notifications, setNotifications] = useState([]);

  const unreadNotifications = useMemo(
    () =>
      notifications.reduce(
        (prev, notification) => prev + (notification.is_read === false ? 1 : 0),
        0
      ),
    [notifications]
  );

  const confirmLogout = () => {
    openLogoutModal();
    closeProfileDropdown();
  };

  const openProfileDropdown = () => {
    setisProfileDropdownVisible(true);
  };

  const closeProfileDropdown = () => {
    setisProfileDropdownVisible(false);
  };

  const openNotificationDropdown = () => {
    fetchNotifications();
    setIsNotificationDropdownVisible(true);
  };

  const closeNotificationDropdown = () => {
    setIsNotificationDropdownVisible(false);
  };

  const showBrowserNotification = async (notification) => {
    const swReg = await navigator.serviceWorker.getRegistration();

    swReg.showNotification("Edusex", {
      body: notification.content,
      icon: "https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/logo_square.png",
    });
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await getAllNotifications();
      setNotifications(data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationAsRead();
      toast({
        status: "success",
        title: "Sukses",
        description: "Semua notifikasi telah dibaca",
      });
      fetchNotifications();
      closeNotificationDropdown();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isAuthenticated && userInfo.id) {
      fetchNotifications();

      const channel = pusherInstance.subscribe(`user-${userInfo.id}`);

      channel.bind("notification-received", (data) => {
        fetchNotifications();
        showBrowserNotification(data);
      });

      return () => {
        pusherInstance.unsubscribe(`user-${userInfo.id}`);
      };
    }
  }, [userInfo.id, isAuthenticated]);

  const getNotificationLink = (type) => {
    if (type === "discussion_forum") {
      if (userInfo.role === "psikolog") {
        return "/psikolog/discussion";
      }
      return "/forum";
    } else {
      if (userInfo.role === "psikolog") {
        return "/psikolog/personal-chat";
      }
      return "/personal-consultation";
    }
  };

  const handleReadNotification = async (id, type) => {
    try {
      await readNotification(id);
      navigate(getNotificationLink(type));
      closeNotificationDropdown();
      fetchNotifications();
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    profileDropdownRef,
    isProfileDropdownVisible,
    closeProfileDropdown,
    openProfileDropdown,
    isLogoutModalOpen,
    openLogoutModal,
    closeLogoutModal,
    isNotificationDropdownVisible,
    closeNotificationDropdown,
    openNotificationDropdown,
    notificationDropdownRef,
    toggleSidebar,
    pathname,
    unreadNotifications,
    confirmLogout,
    isMobile,
    isSidebarOpen,
    handleMarkAllAsRead,
    handleReadNotification,
    userInfo,
    isAuthenticated,
    DEFAULT_AVATAR,
    notifications,
  };
}

export default useNavbar;
