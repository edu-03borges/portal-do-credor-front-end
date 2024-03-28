import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState({
    localizarPor: 'Processo',
    situacaoProcesso: 'Somente Ativos',
    carteiraCredor: '',
    credor: '',
  });

  const columns = [
    { field: 'PROCESSO', headerName: 'PROCESSO', width: 130 },
    { field: 'UNIDADE', headerName: 'UNIDADE', width: 250 },
    {
      field: 'NOME_RAZAO_SOCIAL',
      headerName: 'NOME / RAZÃO SOCIAL',
      width: 320,
    },
    { field: 'CPF_CNPJ', headerName: 'CPF / CNPJ', width: 150 },
    { field: 'CIDADE', headerName: 'CIDADE', width: 150 },
    { field: 'UF', headerName: 'UF', width: 100 },
    { field: 'EM_COBRANCA', headerName: 'EM COBRANÇA', width: 150 },
    {
      field: 'STATUS_DO_PROCESSO',
      headerName: 'STATUS DO PROCESSO',
      width: 200,
    },
    { field: 'MENU', headerName: 'MENU', width: 100 },
  ];

  const rows = [
    {
      id: 1,
      PROCESSO: '215/14602',
      UNIDADE: 'ALISSON_CREDOR (JURIDICO)',
      NOME_RAZAO_SOCIAL: 'ACELINA MARIA DA CONCEICAO LEITE SILVA',
      CPF_CNPJ: '71955631115',
      CIDADE: 'TUBARÃO',
      UF: 'GO',
      EM_COBRANCA: 'R$ 3.930,00',
      STATUS_DO_PROCESSO: '01 - ACORDO',
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <>
          <Container
            maxWidth="xxl"
            sx={{ marginLeft: '-10px', marginBottom: '10px' }}
          >
            <Typography variant="h2" color="secondary">
              Lista de Devedores
            </Typography>
          </Container>
          <MainCard>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: '20px' }}>
                  <TextField
                    label="Unidades"
                    name="uniteds"
                    value={filtro.localizarPor}
                    onChange={handleFiltroChange}
                    select
                    SelectProps={{
                      variant: 'outlined',
                    }}
                    sx={{ width: '45.6%' }}
                  >
                    <MenuItem value="Unidade1">Unidadde 1</MenuItem>
                    <MenuItem value="Unidade1">Unidade 2</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                  <TextField
                    label="Localizar por"
                    name="localizarPor"
                    value={filtro.localizarPor}
                    onChange={handleFiltroChange}
                    select
                    SelectProps={{
                      variant: 'outlined',
                    }}
                    sx={{ width: '15%' }}
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
                      variant: 'outlined',
                    }}
                    sx={{ width: '30%' }}
                  />

                  <TextField
                    label="Situação do Processo"
                    name="situationProc"
                    value={filtro.localizarPor}
                    onChange={handleFiltroChange}
                    select
                    SelectProps={{
                      variant: 'outlined',
                    }}
                    sx={{ width: '18%' }}
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
                      variant: 'outlined',
                    }}
                    sx={{ width: '18%' }}
                  >
                    <MenuItem value="Processo">Todos</MenuItem>
                    <MenuItem value="Nome">01 - ACORDO</MenuItem>
                    <MenuItem value="CPF">02 - QUITADO</MenuItem>
                  </TextField>

                  <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    sx={{ width: '15%' }}
                  >
                    Pesquisar
                  </Button>
                </Box>

                <Box sx={{ height: 400, width: '100%', marginTop: '10px' }}>
                  <DataGridPro
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
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
