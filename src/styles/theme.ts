export const theme = {
  menu: {
    styles: {
      base: {
        menu: {
          boxShadow: "shadow-fly",
        },
        item: {
          initial: {
            bg: "bg-gray-100",
            color: "text-gray-600 hover:text-gray-700",
          },
        },
      },
    },
  },
  button: {
    styles: {
      variants: {
        gradient: {
          gray: {
            bg: "bg-gradient-to-r from-yellow-800 to-red-200",
          },
        },
      },
    },
  },
  input: {
    styles: {
      base: {
        input: {
          bg: "bg-gray-50",
          outline: "outline outline-0 focus:outline-0",
          shadow: "shadow-fly",
        },
        label: {
          color: "text-gray-600 peer-focus:text-gray-900",
          lineHeight:
            "peer-placeholder-shown:leading-[5] peer-focus:leading-tight",
          top: "-top-4",
        },
      },
      variants: {
        outlined: {
          base: {
            input: {
              borderColor: "placeholder-shown:border-gray-900 border-gray-900",
              borderWidth: "focus:border-2",
              floated: {
                borderColor: "",
              },
            },
            label: {
              before: {
                floated: {
                  bt: "border-0",
                  bl: "border-0",
                },
              },
              after: {
                floated: {
                  bt: "border-0",
                  br: "border-0",
                },
              },
            },
          },
        },
      },
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
          height: "h-full",
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
