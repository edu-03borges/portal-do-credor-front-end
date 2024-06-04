import { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';

import { Badge, Button, Container, Grid, IconButton, Menu, MenuItem, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { heightButton } from 'store/constant';

import { Link } from 'react-router-dom';

import CustomDataGrid from 'ui-component/CustomDataGrid';
import CustomDateRangePicker from 'ui-component/CustomDateRangePicker';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import { StyledMenuItemBlue } from 'ui-component/menuItemCustom';

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

  };

  // Temporary data *****************************************************************************************

const columns = [
  {
    field: 'processo',
    align: 'left',
    headerName: 'Processo',
    width: 120,
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
  { field: 'unidade', align: 'left', headerName: 'Unidade', width: 150 },
  { field: 'data', align: 'left', headerName: 'Data', width: 120 },
  { field: 'titulos', align: 'left', headerName: 'Titulos', width: 150 },
  { field: 'devedor', align: 'left', headerName: 'Devedor', width: 150 },
  { field: 'cpfCnpj', align: 'left', headerName: 'CNPJ/CPF', width: 150 },
  { field: 'valorDevolvido', align: 'left', headerName: 'Valor Devolvido', width: 150 },
  { field: 'motivo', align: 'left', headerName: 'Motivo', width: 200,
  renderCell: ({ row }) => {
    let backgroundColor, textColor;
  
    switch (row.motivo) {
      case '01.01 - ACORDO':
        backgroundColor = theme.palette.custom.greenCustomLight;
        textColor = theme.palette.custom.greenCustomDark;
        break;
      case '02 - DEVOLUÇÃO':
        backgroundColor = theme.palette.custom.blueCustomLight;
        textColor = theme.palette.custom.blueCustomDark;
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
        {row.motivo}
      </Badge>
    );
  }
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Menu',
    resizable: false,
    hideable: false,
    getActions: ({ row }) => [
      <>
        <Tooltip title="Imprimir" arrow>
          <IconButton className="m-0 p-1">
            <PictureAsPdfIcon sx={{ color: 'red' }} fontSize="small" />
          </IconButton>
        </Tooltip>
      </>,
      <>
        <Tooltip title="Exportar Excel" arrow>
          <IconButton className="m-0 p-1">
            <DescriptionOutlinedIcon sx={{ color: '#1565c0' }} fontSize="small"/>
          </IconButton>
        </Tooltip>
      </>,
    ],
  },
];

const rows = [
  { id: 1, processo: '215/14602', unidade: 'Unidade A', data: '01/01/2024', titulos: 'Título 1', devedor: 'Devedor A', cpfCnpj: '123.456.789-00', valorDevolvido: 'R$ 1.120,00', motivo: '01.01 - ACORDO', menu: 'Detalhes' },
  { id: 2, processo: '215/14603', unidade: 'Unidade B', data: '02/01/2024', titulos: 'Título 2', devedor: 'Devedor B', cpfCnpj: '987.654.321-00', valorDevolvido: 'R$ 550,00', motivo: '02 - DEVOLUÇÃO', menu: 'Detalhes' },
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
