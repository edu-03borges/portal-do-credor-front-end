import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ButtonBase } from "@mui/material";

import config from "config";
import { MENU_OPEN } from "store/actions";
import Logo from "ui-component/Logo";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
    >
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
