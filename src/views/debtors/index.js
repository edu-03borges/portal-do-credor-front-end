import { useEffect, useState } from 'react';

import { Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Delete from '@mui/icons-material/DeleteOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

import { Badge, Button, Container, Grid, IconButton, Menu, MenuItem, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';

import { heightButton } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import CustomDataGrid from 'ui-component/CustomDataGrid';
import { StyledMenuItemBlue } from 'ui-component/menuItemCustom';

import { useSelector } from 'react-redux';

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const authUserInfo = useSelector(({ auth }) => auth.authUserInfo);

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
      width: 100,
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
    { field: 'unidade', headerName: 'Unidade', width: 260 },
    { field: 'razao_social', headerName: 'Nome/Razão Social', width: 320 },
    { field: 'cpf_cnpj', headerName: 'CNPJ/CPF', width: 150 },
    { field: 'cidade', headerName: 'Cidade', width: 150 },
    { field: 'uf', headerName: 'UF', width: 100 },
    { field: 'em_cobranca', headerName: 'Em Cobrança', width: 150 },
    {
      field: 'status_processo',
      headerName: 'Status do Processo',
      width: 200,
      renderCell: ({ row }) => {
        let backgroundColor, textColor;
      
        switch (row.status_processo) {
          case 'ACORDO':
            backgroundColor = theme.palette.custom.greenCustomLight;
            textColor = theme.palette.custom.greenCustomDark;
            break;
          case 'PROCESSO':
            backgroundColor = theme.palette.custom.blueCustomLight;
            textColor = theme.palette.custom.blueCustomDark;
            break;
          case 'EM COBRANÇA':
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
            {row.status_processo}
          </Badge>
        );
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      resizable: false,
      hideable: false,
      getActions: ({ row }) => [
        <>
          <Tooltip title="Editar" arrow>
            <IconButton className="m-0 p-1">
              <Edit color="primary" fontSize="small" />
            </IconButton>
          </Tooltip>
        </>,
        <>
          <Tooltip title="Excluir" arrow>
            <IconButton className="m-0 p-1">
              <Delete fontSize="small" style={{ color: 'red' }} />
            </IconButton>
          </Tooltip>
        </>,
      ],
    },
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
      status_processo: 'EM COBRANÇA'
    },
    {
      id: 2,
      processo: '215/14602',
      unidade: 'ALISSON_CREDOR (JURIDICO)',
      razao_social: 'ACELINA MARIA DA CONCEICAO LEITE SILVA',
      cpf_cnpj: '71955631115',
      cidade: 'TUBARÃO',
      uf: 'GO',
      em_cobranca: 'R$ 3.930,00',
      status_processo: 'ACORDO'
    },
    {
      id: 3,
      processo: '215/14602',
      unidade: 'ALISSON_CREDOR (JURIDICO)',
      razao_social: 'ACELINA MARIA DA CONCEICAO LEITE SILVA',
      cpf_cnpj: '71955631115',
      cidade: 'TUBARÃO',
      uf: 'GO',
      em_cobranca: 'R$ 3.930,00',
      status_processo: 'PROCESSO'
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
              Lista de Devedores
            </Typography>

            <IconButton aria-label="menu de opções" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <StyledMenuItemBlue>
                <AddIcon sx={{ marginRight: '5px' }} />
                Cadastrar
              </StyledMenuItemBlue>
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
