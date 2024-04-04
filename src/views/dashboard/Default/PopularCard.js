import PropTypes from "prop-types";

import { Button, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";

import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import SkeletonPopularCard from "ui-component/cards/Skeleton/PopularCard";

import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const histAcoesRealizadas = [
  {
    date: "20/03/2024",
    description: "Foi cadastrado 1 novo devedor nesta data.",
  },
  {
    date: "20/03/2024",
    description: "Foram cadastrados 3 novos títulos nesta data.",
  },
  {
    date: "18/03/2024",
    description: "Foi cadastrado 1 novo título nesta data.",
  },
  {
    date: "18/03/2024",
    description: "Foi cadastrado 1 novo devedor nesta data.",
  },
  {
    date: "13/03/2024",
    description: "Foram cadastrados 2 novos devedores nesta data.",
  },
  {
    date: "13/03/2024",
    description: "Foram cadastrados 6 novos títulos nesta data.",
  },
];

const PopularCard = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Histórico de Ações Realizadas</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {histAcoesRealizadas.map((value) => (
                  <>
                    <Grid container direction="column">
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {value.date}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between" />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2" color="inherit">
                          {value.description}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 1.5 }} />
                  </>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: "center" }}>
            <Button size="small" disableElevation>
              Ver Todos
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default PopularCard;
