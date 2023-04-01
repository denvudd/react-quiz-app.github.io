import useFetching from "../hooks/useFetching";
import { useNavigate } from "react-router-dom";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import SelectField from "../components/SelectField";
import TextFieldComponent from "../components/TextFieldComponent";

const Settings = () => {
  const {response, loading, error} = useFetching({ url: "/api_category.php" });
  let navigate = useNavigate();

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress/>
      </Box>
    )
  }
  
  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something went wrong...
      </Typography>
    )
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy"},
    { id: "medium", name: "Medium"},
    { id: "hard", name: "Hard"},
  ];
  
  const typeOptions = [
    {id: "multiple", name: "Multiple choice"},
    {id: "boolean", name: "True/False"},
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/questions");
  }
  return (
    <div>
      <Typography variant="h2" fontWeight="bold">
        Quiz App
      </Typography> 
      <form onSubmit={handleSubmit}>
        <SelectField options={response.trivia_categories} label="Category"/>
        <SelectField options={difficultyOptions} label="Difficulty"/>
        <SelectField options={typeOptions} label="Type"/>
        <TextFieldComponent/>
        <Box mt={3} width="100%">
          <Button fullWidth={true} variant="outlined" type="submit">Get started</Button>
        </Box>
      </form>
    </div> 
  );
};

export default Settings;