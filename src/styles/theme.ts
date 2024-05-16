import {
  AlertStylesType,
  ButtonStyleTypes,
  DialogBodyStylesType,
  DialogStylesType,
  InputStylesType,
  MenuStylesType,
} from "@material-tailwind/react";

export const theme: {
  alert: AlertStylesType;
  menu: MenuStylesType;
  button: ButtonStyleTypes;
  input: InputStylesType;
  dialog: DialogStylesType;
  dialogBody: DialogBodyStylesType;
} = {
  alert: {
    styles: {
      base: {
        alert: {
          px: "px-2",
          py: "py-2",
        },
      },
      variants: {
        filled: {
          red: {
            background: "bg-red-300",
            color: "text-gray-800",
          },
          green: {
            background: "bg-green-300",
            color: "text-gray-800",
          },
        },
      },
    },
  },
  menu: {
    styles: {
      base: {
        item: {
          initial: {
            color: "text-gray-600 hover:text-gray-900",
            bg: "",
          },
        },
      },
    },
  },
  button: {
    defaultProps: {
      size: "sm",
      variant: "outlined",
    },
    styles: {
      variants: {
        filled: {
          "blue-gray": {
            background: "bg-blue-gray-300",
          },
          brown: {
            background: "bg-brown-300",
          },
        },
      },
    },
  },
  input: {
    defaultProps: {
      color: "blue-gray",
    },
  },
  dialog: {
    styles: {
      base: {
        backdrop: {
          p: "p-4",
          display: "flex items-center justify-center",
        },
        container: {
          m: "",
          bg: "bg-gray-200",
          display: "flex flex-col",
          color: "text-gray-700",
        },
      },
    },
  },
  dialogBody: {
    styles: {
      base: {
        initial: {
          color: "text-gray-700",
          flexGrow: "grow",
          height: "min-h-0",
          p: "px-4",
        },
      },
    },
  },
};
