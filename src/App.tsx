import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './app/main/Home';
import Login from './app/authentication/Login';
import PatientInfo from './app/patient-dashboard/info/PatientInfo';
import PatientSearch from './app/patient-search/Patient';
import PatientOrders from './app/patient-dashboard/orders/PatientOrders.component';
import { AppContextProvider } from './app/AppContextProvider';
import Observation from './app/patient-dashboard/observations/Observation';
import { useEffect, useState } from 'react';
import { getSession } from './app/Session';
import CsvUpload from './app/csv-uploads/CsvUpload';
import Moh731SyncQueueComponent from './app/rde-sync/Moh731Sync.component';
import AddPatientIdentifier from './app/rde-sync/AddPatients.component';
import ProtectedRoute from './app/ProtectedRoute';

const App = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const session = getSession();
    const authenticatedValue = localStorage.getItem('authenticated');
    if (authenticatedValue) {
      setAuthenticated(true);
    }

    if (!session) {
      window.location.href = '/login';
    }
  }, [authenticated]);

  return (
    <AppContextProvider>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/login" element={<Login />} />

          {/* protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute isSignedIn={authenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-search"
            element={
              <ProtectedRoute isSignedIn={authenticated}>
                <PatientSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-dashboard/:uuid"
            element={
              <ProtectedRoute isSignedIn={authenticated}>
                <PatientInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-dashboard/:uuid/orders"
            element={
              <ProtectedRoute isSignedIn={authenticated}>
                <PatientOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-dashboard/:uuid/observations"
            element={
              <ProtectedRoute isSignedIn={authenticated}>
                <Observation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lab-results-sync"
            element={
              <ProtectedRoute isSignedIn={authenticated}>
                <CsvUpload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/moh-731-sync"
            element={
              <ProtectedRoute isSignedIn={authenticated}>
                <Moh731SyncQueueComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/moh-731-sync/add-patients"
            element={
              <ProtectedRoute isSignedIn={authenticated}>
                <AddPatientIdentifier />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AppContextProvider>
  );
};

export default App;
