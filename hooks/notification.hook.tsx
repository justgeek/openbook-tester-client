import { useSnackbar, VariantType } from "notistack";

import { useEffect, useState } from "react";

const useNotification = () => {
  const [config, setConfig] = useState<{ msg: string; variant: VariantType }>({ msg: "", variant: "info" });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const { variant, msg } = config;
    if (msg) {
      enqueueSnackbar(msg, {
        variant,
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }, [config, enqueueSnackbar]);
  return [config, setConfig];
};

export default useNotification;
