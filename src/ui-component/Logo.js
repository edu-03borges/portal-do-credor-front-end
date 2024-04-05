import { Box } from "@mui/material";

import logo from "assets/images/logo_cubo_sistemas.png";
import logoNome from "assets/images/logo_nome_cubo_sistemas.png";

const Logo = () => {
  return (
    <>
      <img src={logo} alt="Cubo Sistemas" width="40" />
      <Box sx={{ marginLeft: 2.5 }} />
      <img src={logoNome} alt="Cubo Sistemas" width="100" />
    </>
  );
};

export default Logo;
