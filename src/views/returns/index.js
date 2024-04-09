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
import { StyledMenuItemBlue, StyledMenuItemGreen } from 'ui-component/menuItemCustom';

// Temporary data *****************************************************************************************

const columns = [
  { field: 'processo', align: 'left', headerName: 'PROCESSO', width: 120 },
  { field: 'unidade', align: 'left', headerName: 'UNIDADE', width: 150 },
  { field: 'data', align: 'left', headerName: 'DATA', width: 120 },
  { field: 'titulos', align: 'left', headerName: 'TITULOS', width: 150 },
  { field: 'devedor', align: 'left', headerName: 'DEVEDOR', width: 150 },
  { field: 'cpfCnpj', align: 'left', headerName: 'CPF / CNPJ', width: 150 },
  { field: 'valorDevolvido', align: 'left', headerName: 'VALOR DEVOLVIDO', width: 150 },
  { field: 'motivo', align: 'left', headerName: 'MOTIVO', width: 200 },
  { field: 'menu', align: 'left', headerName: 'MENU', width: 120 },
];

const rows = [
  { id: 1, processo: 'Proc 1', unidade: 'Unidade A', data: '01/01/2024', titulos: 'Título 1', devedor: 'Devedor A', cpfCnpj: '123.456.789-00', valorDevolvido: 1000, motivo: 'Motivo A', menu: 'Detalhes' },
  { id: 2, processo: 'Proc 2', unidade: 'Unidade B', data: '02/01/2024', titulos: 'Título 2', devedor: 'Devedor B', cpfCnpj: '987.654.321-00', valorDevolvido: 1500, motivo: 'Motivo B', menu: 'Detalhes' },
  { id: 3, processo: 'Proc 3', unidade: 'Unidade C', data: '03/01/2024', titulos: 'Título 3', devedor: 'Devedor C', cpfCnpj: '456.789.123-00', valorDevolvido: 2000, motivo: 'Motivo C', menu: 'Detalhes' },
  { id: 4, processo: 'Proc 4', unidade: 'Unidade D', data: '04/01/2024', titulos: 'Título 4', devedor: 'Devedor D', cpfCnpj: '789.123.456-00', valorDevolvido: 2500, motivo: 'Motivo D', menu: 'Detalhes' },
  { id: 5, processo: 'Proc 5', unidade: 'Unidade E', data: '05/01/2024', titulos: 'Título 5', devedor: 'Devedor E', cpfCnpj: '321.654.987-00', valorDevolvido: 3000, motivo: 'Motivo E', menu: 'Detalhes' },
];

// ********************************************************************************************************

const Returns = () => {
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
              Lista de Devoluções
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
                            label="Status Devolução"
                            name="StatusReturns"
                            select
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          >
                            <MenuItem value="Todos">Todos</MenuItem>
                            <MenuItem value="Andamento">Andamento</MenuItem>
                            <MenuItem value="Concluido">Concluída</MenuItem>
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
                            <MenuItem value="DataDevolucao">Data da Devolução</MenuItem>
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
                      <Grid container item spacing={2} justifyContent="flex-end">
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

export default Returns;
