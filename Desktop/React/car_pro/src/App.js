import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RechargeProvider } from './context/RechargeContext.js';
import { AuthProvider } from './auth/AuthContext.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import Home from './pages/Home.js';
import Admin from './pages/Admin.js';
import EditPlan from './pages/EditPlan.js';
import AddPlan from './pages/AddPlan';
import JioHome from './pages/JioHome.js';
import JioRecharge from './pages/JioRecharge.js';
import JioPlans from './pages/JioPlans.js';
import JioPayment from './pages/JioPayment.js';
import JioSuccess from './pages/JioSuccess.js';
import About from './pages/About.jsx';
import './styles/Theme.css';

function App() {
  return (
    <AuthProvider>
      <RechargeProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Landing & Auth Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />

                {/* Protected Jio Routes */}
                <Route
                  path="/jio-recharge"
                  element={
                    <ProtectedRoute>
                      <JioRecharge />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jio-plans"
                  element={
                    <ProtectedRoute>
                      <JioPlans />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jio-payment"
                  element={
                    <ProtectedRoute>
                      <JioPayment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jio-success"
                  element={
                    <ProtectedRoute>
                      <JioSuccess />
                    </ProtectedRoute>
                  }
                />

                {/* Profile Route - Protected */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Public Jio Home (no auth required) */}
                <Route path="/jio" element={<JioHome />} />

                {/* Legacy Routes - keeping for reference */}
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route
                  path="/admin/add-plan"
                  element={
                    <ProtectedRoute>
                      <AddPlan />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/edit-plan/:id"
                  element={
                    <ProtectedRoute>
                      <EditPlan />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </RechargeProvider>
    </AuthProvider>
  );
}

export default App;
