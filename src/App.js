import Header from "./components/Header/Header";
import {Routes, Route, Navigate} from 'react-router-dom';
import Rockets from "./components/Rockets/Rockets";
import NotFound from "./components/NotFound/NotFound";
import RocketsItem from "./components/RocketsItem/RocketsItem";
import FormRegistr  from "./components/FormAuth/FormRegistr";
import FormLogin  from "./components/FormAuth/FormLogin";
import FormResetPassword from "./components/FormAuth/FormResetPassword";
import PopUp from "./components/PopUp/PopUp";
import Profile from "./components/Profile/Profile";
import { useSelector } from "react-redux";

const App = () => {
  const { userActive } = useSelector((state) => state.userData);

  return (
    <div className="body-wrapper">
      <div className="container">
        <Header/>
        <Routes>
          <Route path ="/" exact={true} element={<Rockets/>}/>
          <Route path ="/rocket/:id" exact={true} element={<RocketsItem/>}/>
          <Route path ="/registration" exact={true} element={<FormRegistr/>}/>
          <Route path ="/login" exact={true} element={<FormLogin/>}/>
          <Route path ="/resetpassword" exact={true} element={<FormResetPassword/>}/>
          {userActive && <Route path ="/profile" exact={true} element={<Profile/>}/>}
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path ="/404" element={<NotFound/>}/>
        </Routes>
        <PopUp/>
      </div>  
    </div> 
  );
}

export default App;
