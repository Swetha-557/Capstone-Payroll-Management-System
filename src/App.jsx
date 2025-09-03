import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeProfile from "./pages/EmployeeProfile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminAddEmployee from "./pages/AdminAddEmployee.jsx";
import AdminEditEmployee from "./pages/AdminEditEmployee.jsx";
import Departments from "./pages/Departments.jsx";
import AdminJobs from "./pages/AdminJobs.jsx";
import EmployeeJobs from "./pages/EmployeeJobs.jsx";



export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Employee routes */}
      <Route path="/employee-form" element={<EmployeeForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<EmployeeProfile />} />
      <Route path="/edit-profile" element={<EditProfile />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/add" element={<AdminAddEmployee />} />
      <Route path="/admin/edit/:email" element={<AdminEditEmployee />} />
      <Route path="/admin/departments" element={<Departments />} />
      <Route path="/admin/jobs" element={<AdminJobs />} />
      <Route path="/admin/jobs" element={<AdminJobs />} />
<Route path="/employee/jobs" element={<EmployeeJobs />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
