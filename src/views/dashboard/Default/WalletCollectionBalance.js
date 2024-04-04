import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";

import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import GeneralSkeleton from "ui-component/cards/Skeleton/GeneralSkeleton";

import chartData from "./chart-data/wallet-collection-balance";

const WalletCollectionBalance = ({ isLoading }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: grey200,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        labels: {
          colors: grey500,
        },
      },
    };

    if (!isLoading) {
      ApexCharts.exec("bar-chart", "updateOptions", newChartData);
    }
  }, [
    navType,
    primary200,
    primaryDark,
    secondaryMain,
    secondaryLight,
    primary,
    darkLight,
    grey200,
    isLoading,
    grey500,
  ]);

  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Saldo em Cobrança por Carteira</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">Filiais</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

WalletCollectionBalance.propTypes = {
  isLoading: PropTypes.bool,
};

export default WalletCollectionBalance;
