import { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

import { Badge, Button, Container, Grid, IconButton, Menu, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { heightButton } from 'store/constant';

import { Link } from 'react-router-dom';

import CustomDataGrid from 'ui-component/CustomDataGrid';
import CustomDateRangePicker from 'ui-component/CustomDateRangePicker';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import { StyledMenuItemBlue } from 'ui-component/menuItemCustom';

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

  // Temporary data *****************************************************************************************

  const columns = [
    {
      field: 'processo',
      align: 'left',
      headerName: 'Processo',
      minWidth: 110,
      renderCell: ({ row }) => (
        <Link
          to={`/menu/dashboard`}
          style={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = theme.palette.secondary.main;
            e.target.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = theme.palette.primary.main;
            e.target.style.textDecoration = 'none';
          }}
        >
          {row.processo}
        </Link>
      )
    },
    { field: 'unidade', align: 'left', headerName: 'Unidade', minWidth: 220 },
    { field: 'devedor', align: 'left', headerName: 'Devedor', minWidth: 220 },
    { field: 'cpf_cnpj', align: 'left', headerName: 'CNPJ/CPF', minWidth: 120 },
    { field: 'data_cad', align: 'left', headerName: 'Cadastro', minWidth: 120 },
    { field: 'especie', align: 'left', headerName: 'Espécie', minWidth: 100 },
    { field: 'ntitulo', align: 'left', headerName: 'Nº Título', minWidth: 110 },
    { field: 'parcela', align: 'left', headerName: 'Parcela', minWidth: 100 },
    { field: 'data_vencto', align: 'left', headerName: 'Vencimento', minWidth: 120 },
    { field: 'valor', align: 'left', headerName: 'Valor', minWidth: 120 },
    { field: 'protesto', align: 'left', headerName: 'Protesto', minWidth: 120 },
    { field: 'saldo', align: 'left', headerName: 'Saldo', minWidth: 120 },
    {
      field: 'status',
      align: 'left',
      headerName: 'Status',
      minWidth: 120,
      renderCell: ({ row }) => {
        let backgroundColor, textColor;
      
        switch (row.status) {
          case 'QUITADO':
            backgroundColor = theme.palette.success.dark;
            textColor = '#ffffff';
            break;
          case 'ABERTO':
            backgroundColor = '#2196f3';
            textColor = '#ffffff';
            break;
          case 'PARCIAL':
            backgroundColor = '#00bcd4';
            textColor = '#ffffff';
            break;
        }
      
        return (
          <Badge
            style={{
              backgroundColor,
              color: textColor,
              height: '1.7em',
              borderRadius: '1em',
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto',
              padding: '0 0.8em',
              margin: '0.2em',
              fontSize: '0.9em',
              marginTop: '0px'
            }}
          >
            {row.status}
          </Badge>
        );
      }
    },
    { field: 'obs', align: 'left', headerName: 'OBS', minWidth: 130 }
  ];

  const rows = [
    {
      id: 1,
      processo: '215/14602',
      unidade: 'ALISSON_CREDOR (JURIDICO)',
      devedor: 'RAZÃO DEVEDOR 1',
      cpf_cnpj: '111.111.111-11',
      data_cad: '01/01/2022',
      especie: 'BL',
      ntitulo: '12345',
      parcela: '01/02',
      data_vencto: '01/02/2022',
      valor: 'R$ 1.000,00',
      protesto: 'R$ 0,00',
      saldo: 'R$ 0,00',
      status: 'QUITADO',
      obs: 'OBS 1'
    },
    {
      id: 2,
      processo: '215/14603',
      unidade: 'ALISSON_CREDOR',
      devedor: 'RAZÃO DEVEDOR 2',
      cpf_cnpj: '222.222.222-22',
      data_cad: '02/02/2022',
      especie: 'NF',
      ntitulo: '54321',
      parcela: '04/04',
      data_vencto: '02/03/2022',
      valor: 'R$ 250,00',
      protesto: 'R$ 0,00',
      saldo: 'R$ 250,00',
      status: 'ABERTO',
      obs: 'OBS 2'
    },
    {
      id: 3,
      processo: '215/14604',
      unidade: 'ALISSON_CREDOR (DIVERSOS)',
      devedor: 'RAZÃO DEVEDOR 3',
      cpf_cnpj: '333.333.333-33',
      data_cad: '03/03/2022',
      especie: 'NF 2',
      ntitulo: '1245',
      parcela: '01/01',
      data_vencto: '12/04/2024',
      valor: 'R$ 100,00',
      protesto: 'R$ 0,00',
      saldo: 'R$ 500,00',
      status: 'PARCIAL',
      obs: 'OBS 3'
    }
  ];

  // ********************************************************************************************************

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
