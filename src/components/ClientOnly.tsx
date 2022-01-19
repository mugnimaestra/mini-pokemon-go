import { useEffect, useState } from "react";
import React from "react";

const ClientOnly: React.FC = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <></>;
  }

  return <>{children}</>;
};

export default ClientOnly;
