import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StyledMenuItemBlue } from "ui-component/menuItemCustom";

import { Box, Button, Container, Grid, TextField, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { gridSpacing } from "store/constant";
import CustomDataGrid from "ui-component/CustomDataGrid";
import MainCard from "ui-component/cards/MainCard";
import GeneralSkeleton from "ui-component/cards/Skeleton/GeneralSkeleton";

const App = () => {
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState({
    localizarPor: "Processo",
    situacaoProcesso: "Somente Ativos",
    carteiraCredor: "",
    credor: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const columns = [
    { field: "processo", headerName: "PROCESSO", width: 130 },
    { field: "unidade", headerName: "UNIDADE", width: 250 },
    { field: "razao_social", headerName: "NOME / RAZÃO SOCIAL", width: 320 },
    { field: "cpf_cnpj", headerName: "CPF / CNPJ", width: 150 },
    { field: "cidade", headerName: "CIDADE", width: 150 },
    { field: "uf", headerName: "UF", width: 100 },
    { field: "em_cobranca", headerName: "EM COBRANÇA", width: 150 },
    { field: "status_processo", headerName: "STATUS DO PROCESSO", width: 200 },
    { field: "menu", headerName: "MENU", width: 100 },
  ];

  const rows = [
    {
      id: 1,
      processo: "215/14602",
      unidade: "ALISSON_CREDOR (JURIDICO)",
      razao_social: "ACELINA MARIA DA CONCEICAO LEITE SILVA",
      cpf_cnpj: "71955631115",
      cidade: "TUBARÃO",
      uf: "GO",
      em_cobranca: "R$ 3.930,00",
      status_processo: "01 - ACORDO",
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <>
          <Container maxWidth="xxl" sx={{ marginLeft: "-10px", marginBottom: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h2" color="secondary">
                Lista de Devedores
              </Typography>
            
              <IconButton aria-label="menu de opções" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <StyledMenuItemBlue>
                  <DescriptionOutlinedIcon sx={{ marginRight: '5px' }} />
                  Exportar para XLS
                </StyledMenuItemBlue>
              </Menu>
            </Box>
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
                    sx={{ width: "47%" }}
                  >
                    <MenuItem value="Unidade1">Unidadde 1</MenuItem>
                    <MenuItem value="Unidade1">Unidade 2</MenuItem>
                  </TextField>
                  <Button
                    variant="contained"
                    startIcon={<ClearIcon />}
                    sx={{
                      width: "15%",
                      backgroundColor: theme.palette.error.main,
                      "&:hover": {
                        backgroundColor: theme.palette.error.dark
                      }
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
                    label="Localizar por"
                    name="localizarPor"
                    value={filtro.localizarPor}
                    onChange={handleFiltroChange}
                    select
                    SelectProps={{
                      variant: "outlined",
                    }}
                    sx={{ width: "15%" }}
                  >
                    <MenuItem value="Processo">Processo</MenuItem>
                    <MenuItem value="Nome">Nome</MenuItem>
                    <MenuItem value="CPF">CPF</MenuItem>
                  </TextField>

                  <TextField
                    label="Localizar..."
                    name="search"
                    text
                    SelectProps={{
                      variant: "outlined",
                    }}
                    sx={{ width: "30%" }}
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
                    sx={{ width: "18%" }}
                  >
                    <MenuItem value="Processo">Todos</MenuItem>
                    <MenuItem value="Nome">Somente Ativos</MenuItem>
                    <MenuItem value="CPF">Somente Encerrados</MenuItem>
                  </TextField>

                  <TextField
                    label="Status do Processo"
                    name="statusProc"
                    value={filtro.localizarPor}
                    onChange={handleFiltroChange}
                    select
                    SelectProps={{
                      variant: "outlined",
                    }}
                    sx={{ width: "18%" }}
                  >
                    <MenuItem value="Processo">Todos</MenuItem>
                    <MenuItem value="Nome">01 - ACORDO</MenuItem>
                    <MenuItem value="CPF">02 - QUITADO</MenuItem>
                  </TextField>
                </Box>

                <Box sx={{ height: 400, width: "100%", marginTop: "10px" }}>
                    <CustomDataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5
                          }
                        }
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

export default App;
