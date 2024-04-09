import { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

import { Button, Container, Grid, IconButton, Menu, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { heightButton } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import CustomDataGrid from 'ui-component/CustomDataGrid';
import { StyledMenuItemBlue } from 'ui-component/menuItemCustom';

// Temporary data *****************************************************************************************

const columns = [
  { field: 'processo', headerName: 'PROCESSO', width: 130 },
  { field: 'unidade', headerName: 'UNIDADE', width: 250 },
  { field: 'razao_social', headerName: 'NOME / RAZÃO SOCIAL', width: 320 },
  { field: 'cpf_cnpj', headerName: 'CPF / CNPJ', width: 150 },
  { field: 'cidade', headerName: 'CIDADE', width: 150 },
  { field: 'uf', headerName: 'UF', width: 100 },
  { field: 'em_cobranca', headerName: 'EM COBRANÇA', width: 150 },
  { field: 'status_processo', headerName: 'STATUS DO PROCESSO', width: 200 },
  { field: 'menu', headerName: 'MENU', width: 100 }
];

const rows = [
  {
    id: 1,
    processo: '215/14602',
    unidade: 'ALISSON_CREDOR (JURIDICO)',
    razao_social: 'ACELINA MARIA DA CONCEICAO LEITE SILVA',
    cpf_cnpj: '71955631115',
    cidade: 'TUBARÃO',
    uf: 'GO',
    em_cobranca: 'R$ 3.930,00',
    status_processo: '01 - ACORDO'
  }
];

// ********************************************************************************************************

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

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
          <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '-10px', marginBottom: '10px' }}>
            <Typography variant="h2" color="secondary">
              Lista de Devedores
            </Typography>

            <IconButton aria-label="menu de opções" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <StyledMenuItemBlue>
                <DescriptionOutlinedIcon sx={{ marginRight: '5px' }} />
                Exportar XLS
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
                            <MenuItem value="Unidade1">Unidadde 1</MenuItem>
                            <MenuItem value="Unidade1">Unidade 2</MenuItem>
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
                        <Grid container item spacing={2}>
                          <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                            <TextField
                              name="situationProcess"
                              label="Situação do Processo"
                              select
                              SelectProps={{
                                variant: 'outlined'
                              }}
                              fullWidth
                            >
                              <MenuItem value="Todos">Todos</MenuItem>
                              <MenuItem value="Ativos">Somente Ativos</MenuItem>
                              <MenuItem value="Encerrados">Somente Encerrados</MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                            <TextField
                              name="statusProc"
                              label="Status do Processo"
                              select
                              SelectProps={{
                                variant: 'outlined'
                              }}
                              fullWidth
                            >
                              <MenuItem value="Todos">Todos</MenuItem>
                              <MenuItem value="Acordo">01 - ACORDO</MenuItem>
                              <MenuItem value="Quitado">02 - QUITADO</MenuItem>
                            </TextField>
                          </Grid>
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
                      {/* <Grid container item spacing={2} justifyContent="flex-end">
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
                      </Grid> */}
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

export default App;
