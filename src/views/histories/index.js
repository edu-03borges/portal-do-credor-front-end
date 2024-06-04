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

  };

  // Temporary data *****************************************************************************************

  const columns = [
    {
      field: 'processo',
      headerName: 'Processo',
      width: 150,
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
    { field: 'unidade', headerName: 'Unidade', width: 250 },
    { field: 'devedor', headerName: 'Devedor', width: 250 },
    { field: 'cpf_cnpj', headerName: 'CNPJ/CPF', width: 170 },
    { field: 'data', headerName: 'Data', width: 170 },
    {
      field: 'status_ocorrencia',
      headerName: 'Status da Ocorrência',
      width: 180,
      renderCell: ({ row }) => {
        let backgroundColor, textColor;
      
        switch (row.status_ocorrencia) {
          case 'NA FILA':
            backgroundColor = theme.palette.custom.greenCustomLight;
            textColor = theme.palette.custom.greenCustomDark;
            break;
          case 'PROCESSANDO':
            backgroundColor = theme.palette.custom.blueCustomLight;
            textColor = theme.palette.custom.blueCustomDark;
            break;
          case 'ANDAMENTO':
            backgroundColor = theme.palette.custom.purpleCustomLight;
            textColor = theme.palette.custom.purpleCustomDark;
            break;
        }
      
        return (
          <Badge
            style={{
              backgroundColor,
              color: textColor,
              height: '1.7em',
              borderRadius: 3,
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
            {row.status_ocorrencia}
          </Badge>
        );
      }
    }
  ];

  const rows = [
    {
      id: 1,
      processo: '215/14602',
      unidade: 'ALISSON_CREDOR (JURIDICO)',
      devedor: 'ALESSANDRO SILVA',
      cpf_cnpj: '123.456.789-00',
      data: '01/01/2021',
      status_ocorrencia: 'PROCESSANDO',
    },
    {
      id: 2,
      processo: '215/14602',
      unidade: 'ALISSON_CREDOR (JURIDICO)',
      devedor: 'ALESSANDRO SILVA',
      cpf_cnpj: '123.456.789-00',
      data: '01/01/2021',
      status_ocorrencia: 'NA FILA',
    },
    {
      id: 3,
      processo: '215/14602',
      unidade: 'ALISSON_CREDOR (JURIDICO)',
      devedor: 'ALESSANDRO SILVA',
      cpf_cnpj: '123.456.789-00',
      data: '01/01/2021',
      status_ocorrencia: 'ANDAMENTO',
    },
    {
      id: 4,
      processo: '215/14602',
      unidade: 'ALISSON_CREDOR (JURIDICO)',
      devedor: 'ALESSANDRO SILVA',
      cpf_cnpj: '123.456.789-00',
      data: '01/01/2021',
      status_ocorrencia: 'ANDAMENTO',
    },
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
