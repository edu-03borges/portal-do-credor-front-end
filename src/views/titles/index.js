import { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

import { Button, Container, Grid, IconButton, Menu, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { heightButton } from 'store/constant';

import CustomDataGrid from 'ui-component/CustomDataGrid';
import CustomDateRangePicker from 'ui-component/CustomDateRangePicker';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import { StyledMenuItemBlue } from 'ui-component/menuItemCustom';

// Temporary data *****************************************************************************************

const columns = [
  { field: 'processo', align: 'left', headerName: 'PROCESSO', width: 200 },
  { field: 'unidade', align: 'left', headerName: 'UNIDADE', width: 230 },
  { field: 'devedor', align: 'left', headerName: 'DEVEDOR', width: 230 },
  { field: 'cpf_cnpj', align: 'left', headerName: 'CPF / CNPJ', width: 150 },
  { field: 'data_cad', align: 'left', headerName: 'CADASTRO', width: 150 },
  { field: 'especie', align: 'left', headerName: 'ESPÉCIE', width: 150 },
  { field: 'ntitulo', align: 'left', headerName: 'Nº TITULO', width: 150 },
  { field: 'parcela', align: 'left', headerName: 'Parcela', width: 150 },
  { field: 'data_vencto', align: 'left', headerName: 'Vencimento', width: 150 },
  { field: 'valor', align: 'left', headerName: 'VALOR', width: 150 },
  { field: 'protesto', align: 'left', headerName: 'PROTESTO', width: 150 },
  { field: 'saldo', align: 'left', headerName: 'SALDO', width: 150 },
  { field: 'status', align: 'left', headerName: 'Status', width: 150 },
  { field: 'obs', align: 'left', headerName: 'OBS', width: 150 }
];

const rows = [
  {
    id: 1,
    processo: 'Processo 1',
    unidade: 'Unidade 1',
    devedor: 'Devedor 1',
    cpf_cnpj: '111.111.111-11',
    data_cad: '01/01/2022',
    especie: 'Especie 1',
    ntitulo: '12345',
    parcela: 'Parcela 1',
    data_vencto: '01/02/2022',
    valor: 1000.0,
    protesto: 0,
    saldo: 500.0,
    status: 'Pago',
    obs: 'Observação 1'
  },
  {
    id: 2,
    processo: 'Processo 2',
    unidade: 'Unidade 2',
    devedor: 'Devedor 2',
    cpf_cnpj: '222.222.222-22',
    data_cad: '02/02/2022',
    especie: 'Especie 2',
    ntitulo: '54321',
    parcela: 'Parcela 2',
    data_vencto: '02/03/2022',
    valor: 2000.0,
    protesto: 0,
    saldo: 1000.0,
    status: 'Em aberto',
    obs: 'Observação 2'
  },
  {
    id: 3,
    processo: 'Processo 3',
    unidade: 'Unidade 3',
    devedor: 'Devedor 3',
    cpf_cnpj: '333.333.333-33',
    data_cad: '03/03/2022',
    especie: 'Especie 3',
    ntitulo: '67890',
    parcela: 'Parcela 3',
    data_vencto: '03/04/2022',
    valor: 3000.0,
    protesto: 1,
    saldo: 1500.0,
    status: 'Em protesto',
    obs: 'Observação 3'
  },
  {
    id: 4,
    processo: 'Processo 4',
    unidade: 'Unidade 4',
    devedor: 'Devedor 4',
    cpf_cnpj: '444.444.444-44',
    data_cad: '04/04/2022',
    especie: 'Especie 4',
    ntitulo: '13579',
    parcela: 'Parcela 4',
    data_vencto: '04/05/2022',
    valor: 4000.0,
    protesto: 0,
    saldo: 2000.0,
    status: 'Em aberto',
    obs: 'Observação 4'
  },
  {
    id: 5,
    processo: 'Processo 5',
    unidade: 'Unidade 5',
    devedor: 'Devedor 5',
    cpf_cnpj: '555.555.555-55',
    data_cad: '05/05/2022',
    especie: 'Especie 5',
    ntitulo: '24680',
    parcela: 'Parcela 5',
    data_vencto: '05/06/2022',
    valor: 5000.0,
    protesto: 1,
    saldo: 2500.0,
    status: 'Em protesto',
    obs: 'Observação 5'
  }
];

// ********************************************************************************************************

const Titles = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.dateRange = selectedDateRange;

    console.log(data);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <>
          <Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '-10px', marginBottom: '10px' }}>
            <Typography variant="h2" color="secondary">
              Lista de Títulos
            </Typography>

            <IconButton aria-label="menu de opções" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <StyledMenuItemBlue>
                <DescriptionOutlinedIcon sx={{ marginRight: '5px' }} />
                Exportar Excel
              </StyledMenuItemBlue>
            </Menu>
          </Container>
          <MainCard>
            <Grid container>
              <Grid container item spacing={2}>
                <Grid item xs={12}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid container item spacing={2}>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                          <TextField
                            label="Unidades"
                            name="units"
                            select
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          >
                            <MenuItem value="Unidade1">Unidade 1</MenuItem>
                            <MenuItem value="Unidade2">Unidade 2</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                          <TextField
                            label="Localizar por"
                            name="findBy"
                            select
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          >
                            <MenuItem value="Processo">Processo</MenuItem>
                            <MenuItem value="Nome">Nome</MenuItem>
                            <MenuItem value="CPF">CPF / CNPJ</MenuItem>
                            <MenuItem value="NTitulo">N. Título</MenuItem>
                            <MenuItem value="ObsTit">Obs do Título</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                          <TextField
                            label="Localizar..."
                            name="search"
                            text
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid container item spacing={2}>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                          <TextField
                            name="statusTit"
                            label="Status do Título"
                            select
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          >
                            <MenuItem value="Todos">Todos</MenuItem>
                            <MenuItem value="Aberto">Aberto</MenuItem>
                            <MenuItem value="Parcial">Parcial</MenuItem>
                            <MenuItem value="Quitado">Quitado</MenuItem>
                            <MenuItem value="Devolvido">Devolvido</MenuItem>
                            <MenuItem value="Baixado">Baixado</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                          <TextField
                            label="Localizar por Data"
                            name="findByDate"
                            select
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          >
                            <MenuItem value="Nenhum">Nenhum</MenuItem>
                            <MenuItem value="Cad">Data de Cadastro</MenuItem>
                            <MenuItem value="Venc">Data de Vencimento</MenuItem>
                            <MenuItem value="Dev">Data de Devolução</MenuItem>
                            <MenuItem value="Baixa">Data de Baixa</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                          <CustomDateRangePicker
                            localeText={{ start: 'Início', end: 'Fim' }}
                            fullWidth
                            onChange={(newDateRange) => setSelectedDateRange(newDateRange)}
                          />
                        </Grid>
                      </Grid>
                      <Grid container item spacing={2}>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                          <TextField
                            label="Outros Filtros"
                            name="outrosFiltros"
                            select
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          >
                            <MenuItem value="Todos">Todos</MenuItem>
                            <MenuItem value="SemProtesto">Somente sem protesto</MenuItem>
                            <MenuItem value="ComProtesto">Somente protestado</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 0} md={4} />
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 2}>
                          <Button
                            type="submit"
                            variant="contained"
                            startIcon={<ClearIcon />}
                            fullWidth
                            sx={{
                              backgroundColor: theme.palette.error.main,
                              '&:hover': {
                                backgroundColor: theme.palette.error.dark
                              },
                              height: theme.spacing(heightButton)
                            }}
                          >
                            Limpar Filtro
                          </Button>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 2}>
                          <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SearchIcon />}
                            fullWidth
                            sx={{
                              height: theme.spacing(heightButton)
                            }}
                          >
                            Pesquisar
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </>
      )}
    </>
  );
};

export default Titles;
