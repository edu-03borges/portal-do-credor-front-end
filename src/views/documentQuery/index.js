import { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import SearchIcon from '@mui/icons-material/Search';

const formatCpfCnpj = (value) => {
  const formattedValue = value.replace(/\D/g, '');
  if (formattedValue.length <= 11) {
    return formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  } else {
    return formattedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
  }
};

const documentQuery = () => {
  const [isLoading, setLoading] = useState(true);
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleChange = (event) => {
    setCpfCnpj(formatCpfCnpj(event.target.value));
  };

  const searchCPF = () => {
    const cpfArray = ['111.111.111-11', '222.222.222-22', '333.333.333-33'];
    const cpfExists = cpfArray.includes(cpfCnpj);
    setSearchResult({
      cpf: cpfCnpj,
      status: cpfExists ? 'Encontrado' : 'Não encontrado'
    });
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
          <MainCard>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Typography gutterBottom sx={{ color: '#6c757d' }}>
                  Disponibilizamos uma ferramenta para você consultar um documento em nossa base de dados que conta com milhares de
                  devedores. Ao consultar o sistema lhe informará se este documento consta em nossa base de devedores.
                </Typography>
                <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
                  <TextField
                    label="CPF/CNPJ"
                    name="cnpj"
                    sx={{ width: '20%' }}
                    value={cpfCnpj}
                    onChange={handleChange}
                    type="text"
                  />
                  <Button variant="contained" startIcon={<SearchIcon />} sx={{ width: '15%' }} onClick={searchCPF}>
                    Pesquisar
                  </Button>
                </Box>
                {searchResult && (
                  <MainCard sx={{ marginTop: '20px', borderColor: searchResult.status === 'Encontrado' ? '#496dab' : 'rgb(255, 0, 0)' }}>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12}>
                        <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
                          {searchResult.status === 'Encontrado'
                            ? 'CNPJ/CPF: ' + searchResult.cpf + ' - DEVEDOR LOCALIZADO EM NOSSA BASE DE DADOS'
                            : 'Não encontramos este documento em nossa base de dados.'}
                        </Typography>
                        {searchResult.status === 'Encontrado' && (
                          <Typography gutterBottom sx={{ marginTop: '10px' }}>
                            O último contato realizado ocorreu em 04/12/2023, e atualmente o processo encontra-se ativo com status ACORDO.
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </MainCard>
                )}
              </Grid>
            </Grid>
          </MainCard>
        </>
      )}
    </>
  );
};

export default documentQuery;
