import PropTypes from "prop-types";

// material-ui
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// project imports
import InfoIcon from "@mui/icons-material/Info";
import MainCard from "ui-component/cards/MainCard";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";
// assets

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.warning.light,
                      color: theme.palette.warning.dark,
                      cursor: "default",
                    }}
                  >
                    <InfoIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45,
                  }}
                  primary={
                    <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                      Informações:
                    </Typography>
                  }
                  secondary={
                    <div>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 1,
                        }}
                      >
                        Assesoria De Cobrança Modelo LTDA
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5,
                          display: "flex",
                        }}
                      >
                        Telefones:
                        <Typography variant="subtitle2">
                          (48) 3632-3821 | (48) 98422-0475
                        </Typography>
                      </Typography>
                    </div>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalIncomeLightCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalIncomeLightCard;
