import { useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';

import { Button, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { heightButton } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';

const DocumentQuery = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const formatCpfCnpj = (value) => {
    const formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length <= 11) {
      return formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else {
      return formattedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <MainCard>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom sx={{ color: '#6c757d' }}>
                Disponibilizamos uma ferramenta para você consultar um documento em nossa base de dados que conta com milhares
                de devedores. Ao consultar o sistema lhe informará se este documento consta em nossa base de devedores.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={isMobile ? 12 : 4}>
                  <TextField label="CPF/CNPJ" name="cnpj" value={cpfCnpj} onChange={handleChange} type="text" fullWidth />
                </Grid>
                <Grid item xs={isMobile ? 12 : 2}>
                  <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    fullWidth
                    sx={{
                      height: theme.spacing(heightButton)
                    }}
                    onClick={searchCPF}
                  >
                    Pesquisar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {searchResult && (
              <Grid item xs={12}>
                <MainCard sx={{ borderColor: searchResult.status === 'Encontrado' ? '#496dab' : 'rgb(255, 0, 0)' }}>
                  <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
                    {searchResult.status === 'Encontrado'
                      ? `CNPJ/CPF: ${searchResult.cpf} - DEVEDOR LOCALIZADO EM NOSSA BASE DE DADOS`
                      : 'Não encontramos este documento em nossa base de dados.'}
                  </Typography>
                  {searchResult.status === 'Encontrado' && (
                    <Typography gutterBottom sx={{ marginTop: '10px' }}>
                      O último contato realizado ocorreu em 04/12/2023, e atualmente o processo encontra-se ativo com status ACORDO.
                    </Typography>
                  )}
                </MainCard>
              </Grid>
            )}
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default DocumentQuery;
