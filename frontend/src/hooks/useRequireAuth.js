import { useState } from "react";

const useRequireAuth = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const requireAuth = () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setShowAuthModal(true);
      return false;
    }

    return true;
  };

  return {
    showAuthModal,
    setShowAuthModal,
    requireAuth,
  };
};

export default useRequireAuth;