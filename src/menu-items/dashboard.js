import {
  IconArrowBack,
  IconChartBar,
  IconDashboard,
  IconFileText,
  IconFiles,
  IconSearch,
  IconTable,
  IconUser,
} from "@tabler/icons-react";

const icons = {
  IconDashboard,
  IconUser,
  IconChartBar,
  IconFileText,
  IconTable,
  IconArrowBack,
  IconFiles,
  IconSearch,
};

const menu = {
  id: "menu",
  title: "Menu",
  type: "group",
  children: [
    {
      id: "menu",
      title: "Dashboard",
      type: "item",
      url: "/menu/dashboard",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "debtors",
      title: "Devedores",
      type: "item",
      url: "/menu/debtors",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    {
      id: "histories",
      title: "Históricos",
      type: "item",
      url: "/menu/histories",
      icon: icons.IconChartBar,
      breadcrumbs: false,
    },
    {
      id: "titles",
      title: "Títulos",
      type: "item",
      url: "/menu/titles",
      icon: icons.IconFileText,
      breadcrumbs: false,
    },
    {
      id: "rendering_of_accounts",
      title: "Prestação de Contas",
      type: "item",
      url: "/",
      icon: icons.IconTable,
      breadcrumbs: false,
    },
    {
      id: "returns",
      title: "Devoluções",
      type: "item",
      url: "/",
      icon: icons.IconArrowBack,
      breadcrumbs: false,
    },
    {
      id: "borderôs_for_billing",
      title: "Borderôs para Cobrança",
      type: "item",
      url: "/",
      icon: icons.IconFiles,
      breadcrumbs: false,
    },
    {
      id: "document_query",
      title: "Consulta de Documento",
      type: "item",
      url: "/menu/document_query",
      icon: icons.IconSearch,
      breadcrumbs: false,
    },
  ],
};

export default menu;
