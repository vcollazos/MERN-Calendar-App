import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
 
  
 
export const AppRouter = () => {
 
  const dispatch = useDispatch(); 
  const {checking, uid } = useSelector(state => state.auth)
 
  useEffect(() => {

      dispatch( startChecking() )
 
  }, [dispatch]);
  
  if (checking){
    return (<h5>Espere...</h5>);
  }
 
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                } 
                />
          
          <Route path="/*"  element ={
                  <PrivateRoute>
                       <CalendarScreen/>
                  </PrivateRoute>
              }
          />
          {/* <Route path="*" element={<CalendarScreen />} />   */}
 
        </Routes>
    </BrowserRouter>
  );
}