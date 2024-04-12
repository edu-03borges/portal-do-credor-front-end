import { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

import { Badge, Button, Container, Grid, IconButton, Menu, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { heightButton } from 'store/constant';

import CustomDataGrid from 'ui-component/CustomDataGrid';
import CustomDateRangePicker from 'ui-component/CustomDateRangePicker';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import { StyledMenuItemBlue } from 'ui-component/menuItemCustom';

import { Link } from 'react-router-dom';

const Histories = () => {
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
      maxWidth: 150,
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
    { field: 'unidade', align: 'left', headerName: 'Unidade', minWidth: 250 },
    { field: 'devedor', align: 'left', headerName: 'Devedor', minWidth: 250 },
    { field: 'cpf_cnpj', align: 'left', headerName: 'CNPJ/CPF', maxWidth: 170 },
    { field: 'data', align: 'left', headerName: 'Data', maxWidth: 170 },
    {
      field: 'status_ocorrencia',
      align: 'center',
      headerName: 'Status da Ocorrência',
      maxWidth: 180,
      renderCell: ({ row }) => (
        <Badge
          color="success"
          style={{
            backgroundColor: theme.palette.success.dark,
            color: '#ffffff',
            height: '1.5em',
            borderRadius: '1em',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            padding: '0 0.5em',
            margin: '0.2em',
            fontSize: '0.9em'
          }}
        >
          01.01 - ACORDO
        </Badge>
      )
    }
  ];

  const rows = [
    {
      id: 1,
      processo: '215/14602',
      unidade: 'ALISSON_CREDOR (JURIDICO)',
      devedor: 'ALESSANDRO SILVA',
      cpf_cnpj: '123.456.789-00',
      data: '01/01/2021'
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
              Lista de Ocorrências
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
                            label="Localizar por Data"
                            name="findByDate"
                            select
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          >
                            <MenuItem value="Nenhum">Nenhum</MenuItem>
                            <MenuItem value="DataOcorrencia">Data de Ocorrência</MenuItem>
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

export default Histories;
