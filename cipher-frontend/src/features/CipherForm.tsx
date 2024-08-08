import {Button, Grid, TextField} from '@mui/material';
import {useState} from 'react';
import {ICipher} from '../types.ts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axiosApi from '../axiosApi.ts';

const CipherForm = () => {

  const [state, setState] = useState<ICipher>(
    {
      password: '',
      encodeMessage: '',
      decodeMessage: '',
    }
  )
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const decodeFunc = async () => {
    if (state.password) {
      const response = await axiosApi.post('/decode', {
        message: state.decodeMessage,
        password: state.password,
      });
      setState(prevState => ({
        ...prevState,
        encodeMessage: response.data.decoded,
        decodeMessage: '',
      }));
    }
  }


  const encodeFunc = async () => {
    if (state.password) {
      const response = await axiosApi.post('/encode', {
        message: state.encodeMessage,
        password: state.password,
      });
      setState(prevState => (
        {
          ...prevState,
          decodeMessage: response.data.encoded,
          encodeMessage: '',
        }
      ));
    }
  }


  return (
    <>
      <Grid container direction="column" spacing={2} component="form">
        <Grid item>
          <TextField
            required
            multiline
            minRows={5}
            label="encodeMessage"
            name="encodeMessage"
            value={state.encodeMessage}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item className='form-grid'>
          <TextField
            required
            multiline
            minRows={2}
            label="password"
            id="password"
            name="password"
            value={state.password}
            onChange={inputChangeHandler}
          />
          <Button onClick={decodeFunc} variant="outlined"><ArrowUpwardIcon/> Encode</Button>
          <Button onClick={encodeFunc} variant="outlined"><ArrowDownwardIcon/> Decode</Button>
        </Grid>
        <Grid item>
          <TextField
            required
            multiline
            minRows={5}
            id="decodeMessage"
            label="decodeMessage"
            name="decodeMessage"
            value={state.decodeMessage}
            onChange={inputChangeHandler}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CipherForm;