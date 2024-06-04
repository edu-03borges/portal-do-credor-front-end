import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { publicIp } from 'public-ip';
import { apiAuth } from "utils/api";
import notify from "utils/notify";
import { userSignInSuccess } from 'actions/auth';

import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate  } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (username, password) => {
    let conta = '';
    let invisible_conta = true;
    let imagemBackgroud = '';

    let vhost_orig = window.location.hostname;
    let vhost = window.location.hostname;
    vhost = vhost.replace('.com.br', '');
    vhost = vhost.replace('.cobcloud', '');
    vhost = vhost.replace('portal', '');
    vhost = vhost.replace('clientes', '');
    vhost = vhost.replace('cliente', '');
    vhost = vhost.replace('-', '');
    vhost = vhost.replace('.', '');
    vhost = vhost.toUpperCase();

    if (vhost_orig == 'portal.cobcloud.com.br' || vhost_orig == 'localhost') invisible_conta = false;

    if (vhost == 'FACTO') imagemBackgroud = bgfacto;
    else if (vhost == 'APROCOMBRASIL') imagemBackgroud = bgaprocombr;
    else if (vhost == 'APROCOMCONSULT') imagemBackgroud = bgaprocomcons;

    if (vhost !== 'LOCALHOST') conta = vhost;

    let meuIP = await publicIp();

    conta = 'SOLIDUZ';
    
    const data = {
      conta,
      username,
      password,
      invisible_conta,
      meuIP,
      imagemBackgroud
    };
 
    try {
      const response = await apiAuth.post("/login_pc", data);

      if (response.status == 200) {
        const token = response.data.token;
  
        localStorage.setItem('tokenportalcredor', token); 

        dispatch(userSignInSuccess(response.data));
  
        navigate('/');
      }
    } catch (error) {
      notify.error(`Erro. ${error.response.data.message}`);
    }
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          user: 'HAVAN',
          password: '1234',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          user: Yup.string().max(255).required('O usuário é obrigatório'),
          password: Yup.string().max(255).required('A senha é obrigatória')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await handleLogin(values.user, values.password);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.user && errors.user)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-user-login">Usuário</InputLabel>
              <OutlinedInput
                id="outlined-adornment-user-login"
                type="text"
                value={values.user}
                name="user"
                onBlur={handleBlur}
                onChange={handleChange}
                label="User"
                inputProps={{}}
              />
              {touched.user && errors.user && (
                <FormHelperText error id="standard-weight-helper-text-user-login">
                  {errors.user}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Logar
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
