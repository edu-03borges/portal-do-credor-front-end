import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { gridSpacing } from "store/constant";
import CustomDataGrid from "ui-component/CustomDataGrid";
import CustomDateRangePicker from "ui-component/CustomDateRangePicker";
import MainCard from "ui-component/cards/MainCard";
import GeneralSkeleton from "ui-component/cards/Skeleton/GeneralSkeleton";

const Histories = () => {
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState({
    localizarPor: "Processo",
    situacaoProcesso: "Somente Ativos",
    carteiraCredor: "",
    credor: "",
  });

  const columns = [
    { field: "processo", align: "left", headerName: "PROCESSO", width: 230 },
    { field: "unidade", align: "left", headerName: "UNIDADE", width: 250 },
    { field: "devedor", align: "left", headerName: "DEVEDOR", width: 320 },
    { field: "cpf_cnpj", align: "left", headerName: "CPF / CNPJ", width: 250 },
    { field: "data", align: "left", headerName: "DATA", width: 250 },
    { field: "status_ocorrencia", align: "center", headerName: "STATUS DA OCORRÊNCIA", width: 200 },
  ];

  const rows = [
    {
      id: 1,
      processo: "215/14602",
      unidade: "ALISSON_CREDOR (JURIDICO)",
      devedor: "<NAME>",
      cpf_cnpj: "123.456.789-00",
      data: "01/01/2021",
      status_ocorrencia: "Ativa",
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <>
          <Container maxWidth="xxl" sx={{ marginLeft: "-10px", marginBottom: "10px" }}>
            <Typography variant="h2" color="secondary">
              Lista de Ocorrências
            </Typography>
          </Container>
          <MainCard>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <TextField
                    label="Unidades"
                    name="uniteds"
                    value={filtro.localizarPor}
                    onChange={handleFiltroChange}
                    select
                    SelectProps={{
                      variant: "outlined",
                    }}
                    sx={{ width: "45.6%" }}
                  >
                    <MenuItem value="Unidade1">Unidadde 1</MenuItem>
                    <MenuItem value="Unidade1">Unidade 2</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                  <TextField
                    label="Localizar por"
                    name="localizarPor"
                    value={filtro.localizarPor}
                    onChange={handleFiltroChange}
                    select
                    SelectProps={{
                      variant: "outlined",
                    }}
                    sx={{ width: "20%" }}
                  >
                    <MenuItem value="Processo">Processo</MenuItem>
                    <MenuItem value="Nome">Nome</MenuItem>
                    <MenuItem value="CPF">CPF / CNPJ</MenuItem>
                  </TextField>

                  <TextField
                    label="Localizar..."
                    name="search"
                    text
                    SelectProps={{
                      variant: "outlined",
                    }}
                    sx={{ width: "50%" }}
                  />

                  <Button
                    variant="contained"
                    startIcon={<ClearIcon />}
                    sx={{
                      width: "15%",
                      backgroundColor: theme.palette.error.main,
                      "&:hover": {
                        backgroundColor: theme.palette.error.dark,
                      },
                    }}
                  >
                    Limpar Filtro
                  </Button>
                  <Button variant="contained" startIcon={<SearchIcon />} sx={{ width: "15%" }}>
                    Pesquisar
                  </Button>
                </Box>
                <Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                  <TextField
                    label="Localizar por Data"
                    name="localizarPor"
                    value={filtro.localizarPor}
                    onChange={handleFiltroChange}
                    select
                    SelectProps={{
                      variant: "outlined",
                    }}
                    sx={{ width: "20%" }}
                  >
                    <MenuItem value="Processo">Nenhum</MenuItem>
                    <MenuItem value="Nome">Data de Ocorrência</MenuItem>
                  </TextField>

                  <CustomDateRangePicker
                    localeText={{ start: "Início", end: "Fim" }}
                    sx={{ width: "52%" }}
                  />

                  <TextField
                    label="Situação do Processo"
                    name="situationProc"
                    value={filtro.localizarPor}
                    onChange={handleFiltroChange}
                    select
                    SelectProps={{
                      variant: "outlined",
                    }}
                    sx={{ width: "30%" }}
                  >
                    <MenuItem value="Processo">Todos</MenuItem>
                    <MenuItem value="Nome">Somente Ativos</MenuItem>
                    <MenuItem value="CPF">Somente Encerrados</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ marginTop: "10px" }}>
                  <CustomDataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                  />
                </Box>
              </Grid>
            </Grid>
          </MainCard>
        </>
      )}
    </>
  );
};

export default Histories;
