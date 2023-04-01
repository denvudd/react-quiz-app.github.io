import { Provider } from 'react-redux';
import store from './redux/store';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Settings from "./pages/Settings";
import Questions from "./pages/Questions";
import FinalScreen from "./pages/FinalScreen";
import { Box, Container } from "@mui/material";

function App () {
 return (
  <Provider store={store}>
    <Router>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Routes>
            <Route path="/" element={<Settings/>}></Route>
            <Route path="/questions" element={<Questions/>}></Route>
            <Route path="/score" element={<FinalScreen/>}></Route>
          </Routes>
        </Box>
      </Container>
    </Router>
  </Provider>
 )
}

export default App;