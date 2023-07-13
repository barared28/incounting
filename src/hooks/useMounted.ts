import { useState, useEffect } from "react";

const useMounted = (show?: boolean) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(!!show);

    return () => {
      setMounted(false);
    };
  }, [show]);

  return {
    mounted,
  };
};

export default useMounted;
