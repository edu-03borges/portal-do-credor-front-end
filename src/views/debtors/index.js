/* eslint-disable no-constant-condition */
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
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
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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
          <Container maxWidth="xl">
            <h1>Lista de Devedores</h1>
          </Container>
          <MainCard>
            <Grid container spacing={gridSpacing}>
              <Container maxWidth="xl">
                <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                  <TextField
                    label="Unidades"
                    name="uniteds"
                    value={filtro.localizarPor}
                    onChange={handleFiltroChange}
                    select
                    SelectProps={{
                      variant: 'outlined',
                    }}
                    sx={{ width: '45%' }}
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
                    //color="primary"
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
                    checkboxSelection
                    disableRowSelectionOnClick
                  />
                </Box>
              </Container>
            </Grid>
          </MainCard>
        </>
      )}
    </>
  );
};

export default App;
