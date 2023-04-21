import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { postLogin, selectCommonError, selectErrors } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import CommonAlert from '../Common/CommonAlert';
import { getErrorFlag } from '../../Utils/FormHelper';
import ErrorText from '../Common/ErrorText';

function Login() {
  const commonError = useSelector(selectCommonError);
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      postLogin({
        email: data.get('email'),
        password: data.get('password'),
      })
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={getErrorFlag(errors?.email)}
            helperText={<ErrorText textContent={errors?.email} />}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={getErrorFlag(errors?.password)}
            helperText={<ErrorText textContent={errors?.password} />}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <CommonAlert commonError={commonError} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="register" variant="body2">
                Have no account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
