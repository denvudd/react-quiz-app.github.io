import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleAmountChange, handleScoreChange } from "../redux/actions";

const FinalScreen = () => {
  const {score} = useSelector(state => state);
  const dispatch = useDispatch();

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(50));
  }
  return (
    <Box mt={30}>
      <Typography variant="h3" fontWeight="bold" mt={3}>
        Final Score: {score}
      </Typography>
      {score <= 0 
          ? <Typography variant="h4" fontWeight="medium" mt={2}>
              Maybe next time?
            </Typography>
          : <Typography variant="h4" fontWeight="medium" mt={2}>
              Well done!
            </Typography>
      }
      <Box mt={3}>
        <Link to="/" style={{textDecoration: 'none'}}>
          <Button onClick={handleBackToSettings} variant="outlined">Back to Settings</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default FinalScreen;