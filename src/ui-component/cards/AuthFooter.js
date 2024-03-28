import { Link, Stack, Typography } from '@mui/material';

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://www.instagram.com/cubosistemas/"
      target="_blank"
      underline="hover"
    >
      instagram.com/cubosistemas
    </Typography>
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://www.cubosis.com.br/"
      target="_blank"
      underline="hover"
    >
      &copy; www.cubosis.com.br
    </Typography>
  </Stack>
);

export default AuthFooter;
