// assets
import { IconPalette, IconShadow, IconTypography, IconWindmill } from "@tabler/icons-react";

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "icons",
      title: "Icons",
      type: "collapse",
      icon: icons.IconWindmill,
      children: [
        {
          id: "tabler-icons",
          title: "Tabler Icons",
          type: "item",
          url: "/icons/tabler-icons",
          breadcrumbs: false,
        },
        {
          id: "material-icons",
          title: "Material Icons",
          type: "item",
          external: true,
          target: "_blank",
          url: "https://mui.com/material-ui/material-icons/",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default utilities;
