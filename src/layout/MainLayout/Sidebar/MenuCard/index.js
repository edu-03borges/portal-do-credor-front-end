import PropTypes from 'prop-types';

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  linearProgressClasses,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 30,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#fff',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

const CardStyle = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.light,
  marginBottom: '22px',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '157px',
    height: '157px',
    background: theme.palette.primary[200],
    borderRadius: '50%',
    top: '-105px',
    right: '-96px',
  },
}));

function LinearProgressWithLabel({ value, ...others }) {
  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        <BorderLinearProgress variant="determinate" value={value} {...others} />
      </Grid>
    </Grid>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number,
};

const MenuCard = () => {
  const theme = useTheme();

  return (
    <CardStyle>
      <CardContent sx={{ p: 2 }}>
        <List sx={{ p: 0, m: 0 }}>
          <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
            <ListItemAvatar sx={{ mt: 0 }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  color: theme.palette.primary.main,
                  border: 'none',
                  borderColor: theme.palette.primary.main,
                  background: '#fff',
                  marginRight: '12px',
                }}
              >
                <TableChartOutlinedIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ mt: 0 }}
              primary={
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.primary[800], fontSize: 14 }}
                >
                  Portal do Credor
                </Typography>
              }
              secondary={
                <Typography variant="caption">
                  {' '}
                  © Cubo Sistemas. Todos os direitos reservados.
                </Typography>
              }
            />
          </ListItem>
        </List>
        <LinearProgressWithLabel value={100} />
      </CardContent>
    </CardStyle>
  );
};

export default MenuCard;
