import { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';

import { Button, Container, Grid, IconButton, Menu, MenuItem, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { heightButton } from 'store/constant';

import CustomDataGrid from 'ui-component/CustomDataGrid';
import CustomDateRangePicker from 'ui-component/CustomDateRangePicker';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import { StyledMenuItemBlue, StyledMenuItemGreen } from 'ui-component/menuItemCustom';

const Accountability = () => {
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
    { field: 'data', align: 'left', headerName: 'Data', width: 120 },
    { field: 'unidade', align: 'left', headerName: 'Unidade', width: 150 },
    { field: 'nRepasse', align: 'left', headerName: 'Nº Repasse', width: 150 },
    { field: 'localPagamento', align: 'left', headerName: 'Local Pagamento', width: 200 },
    { field: 'totalCredito', align: 'left', headerName: 'Total Crédito', width: 150 },
    { field: 'taxaContrato', align: 'left', headerName: 'Taxa Contrato', width: 150 },
    { field: 'pagtoDireto', align: 'left', headerName: 'Pagto Direto', width: 150 },
    { field: 'totalRepasse', align: 'left', headerName: 'Total Repasse', width: 150 },
    {
      field: 'menu',
      align: 'left',
      headerName: 'Menu',
      width: 120,
      renderCell: ({ row }) => [
        <Tooltip title="Imprimir" arrow>
          <IconButton style={{ display: 'flex', justifyContent: 'right' }}>
            <PictureAsPdfIcon sx={{ color: 'red' }} fontSize="small" />
          </IconButton>
        </Tooltip>
      ]
    }
  ];

  const rows = [
    {
      id: 1,
      data: '01/01/2024',
      unidade: 'ALISSON_CREDOR (JURIDICO)',
      nRepasse: '123456',
      localPagamento: 'COBRADORA',
      totalCredito: 'R$ 1.000,00',
      taxaContrato: 'R$ 10,00',
      pagtoDireto: 'R$ 500,00',
      totalRepasse: 'R$ 500,00'
    },
    {
      id: 2,
      data: '02/01/2024',
      unidade: 'ALISSON_CREDOR',
      nRepasse: '789012',
      localPagamento: 'COBRADORA',
      totalCredito: 'R$ 1.500,00',
      taxaContrato: 'R$ 15,00',
      pagtoDireto: 'R$ 700,00',
      totalRepasse: 'R$ 800,00'
    },
    {
      id: 3,
      data: '03/01/2024',
      unidade: 'ALISSON_CREDOR (CAMPANHA)',
      nRepasse: '345678',
      localPagamento: 'CREDORA',
      totalCredito: 'R$ 2.000,00',
      taxaContrato: 'R$ 20,00',
      pagtoDireto: 'R$ 1.000,00',
      totalRepasse: 'R$ 1.000,00'
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
              Prestações de Contas
            </Typography>

            <IconButton aria-label="menu de opções" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <StyledMenuItemBlue>
                <DescriptionOutlinedIcon sx={{ marginRight: '5px' }} />
                Exportar Prestações Excel
              </StyledMenuItemBlue>
              <StyledMenuItemGreen>
                <DescriptionOutlinedIcon sx={{ marginRight: '5px' }} />
                Exportar Títulos Excel
              </StyledMenuItemGreen>
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
                            <MenuItem value="Nrepasse">Nº Repasse</MenuItem>
                            <MenuItem value="Npc">Nº PC</MenuItem>
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
                            label="Local de Pagamento"
                            name="paymentLocation"
                            select
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          >
                            <MenuItem value="Todos">Todos</MenuItem>
                            <MenuItem value="Assessoria">Assessoria</MenuItem>
                            <MenuItem value="Credor">Credor</MenuItem>
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
                            <MenuItem value="DataPrestacao">Data da Prestação</MenuItem>
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

export default Accountability;
