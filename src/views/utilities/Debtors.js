import {
  Box,
  Button,
  Container,
  InputAdornment,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

const App = () => {
  const [devedores, setDevedores] = useState([]);
  const [filtro, setFiltro] = useState({
    localizarPor: 'Processo',
    situacaoProcesso: 'Somente Ativos',
    carteiraCredor: '',
    credor: '',
  });
  const [pagina, setPagina] = useState(1);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(10);

  useEffect(() => {
    // TODO: Implementar a lógica para buscar os devedores da API
    const devedoresExemplo = [
      {
        processo: '123456789',
        carteiraCredor: 'Carteira X',
        nomeRazaoSocial: 'Nome do devedor',
        cnpjCpf: '123.456.789-00',
        cidade: 'Cidade',
        uf: 'UF',
        valor: 1000.0,
        statusProcesso: 'Ativo',
      },
      // ...
    ];
    setDevedores(devedoresExemplo);
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  const handlePaginaChange = (e, novaPagina) => {
    setPagina(novaPagina);
  };

  const handleRegistrosPorPaginaChange = (e) => {
    setRegistrosPorPagina(e.target.value);
  };

  return (
    <Box>
      <Container maxWidth="xl">
        <h1>Lista de Devedores</h1>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Localizar por"
            name="localizarPor"
            value={filtro.localizarPor}
            onChange={handleFiltroChange}
            select
            SelectProps={{
              variant: 'outlined',
            }}
            InputAdornment={
              <InputAdornment position="end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.043-.002.107-.046.146A6.5 6.5 0 1 0 11.742 10.344zM12.5 7a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0zM3 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                </svg>
              </InputAdornment>
            }
          >
            <MenuItem value="Processo">Processo</MenuItem>
            <MenuItem value="Nome">Nome</MenuItem>
            <MenuItem value="CPF">CPF</MenuItem>
          </TextField>
          <TextField
            label="Situação de Processo"
            name="situacaoProcesso"
            value={filtro.situacaoProcesso}
            onChange={handleFiltroChange}
            select
            SelectProps={{
              variant: 'outlined',
            }}
            sx={{ ml: 2 }}
          >
            <MenuItem value="Somente Ativos">Somente Ativos</MenuItem>
            <MenuItem value="Todos">Todos</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Carteira do Credor"
            name="carteiraCredor"
            value={filtro.carteiraCredor}
            onChange={handleFiltroChange}
            variant="outlined"
          />
          <TextField
            label="Credor"
            name="credor"
            value={filtro.credor}
            onChange={handleFiltroChange}
            variant="outlined"
            sx={{ ml: 2 }}
          />
          <Button variant="contained" sx={{ ml: 2 }}>
            Pesquisar
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Processo</TableCell>
                <TableCell>Carteira do Credor</TableCell>
                <TableCell>Nome/Razão Social</TableCell>
                <TableCell>CNPJ/CPF</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>UF</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Status do Processo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!devedores
                ? []
                : devedores.map((devedor) => (
                    <TableRow key={devedor.processo}>
                      <TableCell>{devedor.processo}</TableCell>
                      <TableCell>{devedor.carteiraCredor}</TableCell>
                      <TableCell>{devedor.nomeRazaoSocial}</TableCell>
                      <TableCell>{devedor.cnpjCpf}</TableCell>
                      <TableCell>{devedor.cidade}</TableCell>
                      <TableCell>{devedor.uf}</TableCell>
                      <TableCell>{devedor.valor}</TableCell>
                      <TableCell>{devedor.statusProcesso}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={10} // Adicione o número total de páginas aqui
            page={pagina}
            onChange={handlePaginaChange}
            color="primary"
          />
          <TextField
            select
            label="Registros por Página"
            value={registrosPorPagina}
            onChange={handleRegistrosPorPaginaChange}
            variant="outlined"
            sx={{ ml: 2 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </TextField>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
