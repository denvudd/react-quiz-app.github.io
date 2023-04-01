import { Box, FormControl, TextField } from "@mui/material"
import { useDispatch } from "react-redux";
import { handleAmountChange } from "../redux/actions";

const TextFieldComponent = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(handleAmountChange(e.target.value));
  }

  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth={true} size="small">
        <TextField onChange={handleChange} 
                   variant="outlined" 
                   label="Amount of questions" 
                   type="number" 
                   size="small"/>
      </FormControl>
    </Box>
  );
};

export default TextFieldComponent;