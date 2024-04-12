import { useEffect, useState } from 'react';

import { Badge, Button, Container, Grid, IconButton, MenuItem, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CheckIcon from '@mui/icons-material/Check';
import Delete from '@mui/icons-material/DeleteOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { heightButton } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import CustomDataGrid from 'ui-component/CustomDataGrid';

const borderosForBilling = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCustomButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  // Temporary data *****************************************************************************************

  const columns = [
    { field: 'arquivo', headerName: 'Arquivo', width: 200, align: 'left' },
    { field: 'enviadoEm', headerName: 'Enviado em', width: 150, align: 'left' },
    { field: 'tamanho', headerName: 'Tamanho', width: 120, align: 'left' },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      align: 'left',
      renderCell: ({ row }) => {
        let backgroundColor, textColor;

        switch (row.status) {
          case 'CONCLUÍDO':
            backgroundColor = theme.palette.success.dark;
            textColor = '#ffffff';
            break;
          case 'PENDENTE':
            backgroundColor = '#00bcd4';
            textColor = '#ffffff';
            break;
        }

        return (
          <Badge
            style={{
              backgroundColor,
              color: textColor,
              height: '1.7em',
              borderRadius: '1em',
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
            {row.status}
          </Badge>
        );
      }
    },
    { field: 'processadoEm', headerName: 'Processado em', width: 150, align: 'left' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Menu',
      resizable: false,
      hideable: false,
      getActions: ({ row }) => [
        <>
          <Tooltip title="Excluir" arrow>
            <IconButton className="m-0 p-1">
              <Delete fontSize="small" style={{ color: 'red' }} />
            </IconButton>
          </Tooltip>
        </>
      ]
    }
  ];

  const rows = [
    {
      id: 1,
      arquivo: 'Documento1.pdf',
      enviadoEm: '01/04/2022',
      tamanho: '1.5 MB',
      status: 'CONCLUÍDO',
      processadoEm: '02/04/2022'
    },
    { id: 2, arquivo: 'Planilha1.xlsx', enviadoEm: '03/04/2022', tamanho: '0.8 MB', status: 'PENDENTE', processadoEm: '-' }
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
              Envio de Borderôs para a Cobrança
            </Typography>
          </Container>

          <MainCard>
            <Grid container spacing={2}>
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
                  <MenuItem value="Unidade2">Unidade 2</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                <input
                  type="file"
                  id="fileInput"
                  accept=".xlsx,.xls,.csv,.txt,.rem"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <Button
                  startIcon={<UploadFileIcon />}
                  fullWidth
                  sx={{
                    height: theme.spacing(heightButton),
                    border: `1px solid ${theme.palette.primary.main}`
                  }}
                  onClick={handleCustomButtonClick}
                >
                  Carregar Arquivo
                </Button>
              </Grid>
              <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 2} hidden={!selectedFile}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<DoDisturbIcon />}
                  sx={{
                    backgroundColor: theme.palette.error.main,
                    '&:hover': {
                      backgroundColor: theme.palette.error.dark
                    },
                    height: theme.spacing(heightButton)
                  }}
                  onClick={clearFile}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 2} hidden={!selectedFile}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CheckIcon />}
                  sx={{
                    backgroundColor: theme.palette.success.primary,
                    '&:hover': {
                      background: theme.palette.primary.dark,
                      color: theme.palette.primary.light
                    },
                    height: theme.spacing(heightButton)
                  }}
                >
                  Confirmar
                </Button>
              </Grid>
              {selectedFile && (
                <Grid container item spacing={2} mb={2}>
                  <Grid item xs={12}>
                    <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
                      Tamanho do Arquivo: <span style={{ color: 'rgb(0, 128, 255)' }}>{formatFileSize(selectedFile.size)}</span> / Tipo:{' '}
                      <span style={{ color: 'rgb(0, 128, 255)' }}>{getFileExtension(selectedFile.name)}</span>
                    </Typography>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography color="secondary" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                  Últimos borderôs enviados
                </Typography>
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
          </MainCard>
        </>
      )}
    </>
  );
};

export default borderosForBilling;
