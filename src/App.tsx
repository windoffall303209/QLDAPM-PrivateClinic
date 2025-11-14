import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { PatientProfileScreen } from './components/PatientProfileScreen';
import { DoctorListScreen } from './components/DoctorListScreen';
import { DoctorScheduleScreen } from './components/DoctorScheduleScreen';
import { AppointmentBookingScreen } from './components/AppointmentBookingScreen';
import { ExaminationScreen } from './components/ExaminationScreen';
import { PrescriptionScreen } from './components/PrescriptionScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { NotificationScreen } from './components/NotificationScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { MedicalHistoryScreen } from './components/MedicalHistoryScreen';
import { PaymentHistoryScreen } from './components/PaymentHistoryScreen';
import { ReceptionistDashboardScreen } from './components/ReceptionistDashboardScreen';
import { RevenueReportScreen } from './components/RevenueReportScreen';

// New screens
import { ReceptionistCheckInScreen } from './components/ReceptionistCheckInScreen';
import { ReceptionistQueueScreen } from './components/ReceptionistQueueScreen';
import { DoctorQueueScreen } from './components/DoctorQueueScreen';
import { PaymentProcessingScreen } from './components/PaymentProcessingScreen';
import { SystemLogScreen } from './components/SystemLogScreen';
import { CertificateApprovalScreen } from './components/CertificateApprovalScreen';
import { PatientRegistrationScreen } from './components/PatientRegistrationScreen';
import { ActivityLogScreen } from './components/ActivityLogScreen';
import { DoctorProfileScreen } from './components/DoctorProfileScreen';
import { ManagerScheduleScreen } from './components/ManagerScheduleScreen';

import {
  Home,
  Calendar,
  Users,
  Bell,
  BarChart3,
  User,
  ClipboardCheck,
  Stethoscope,
  Receipt,
  FileText,
  FileCheck,
  Activity,
} from 'lucide-react';

export type UserRole = 'patient' | 'doctor' | 'receptionist' | 'manager';

export type Screen =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'dashboard'
  | 'appointments'
  | 'medical-history'
  | 'payment-history'
  | 'doctors'
  | 'doctor-schedule'
  | 'doctor-queue'
  | 'doctor-profile'
  | 'appointment-booking'
  | 'examination'
  | 'prescription'
  | 'profile'
  | 'payment'
  | 'payment-processing'
  | 'notifications'
  | 'reports'
  | 'doctor-approval'
  | 'certificate-approval'
  | 'certificate-management'
  | 'schedule-management'
  | 'manager-schedule'
  | 'account-management'
  | 'revenue-report'
  | 'receptionist-dashboard'
  | 'receptionist-checkin'
  | 'receptionist-queue'
  | 'patient-registration'
  | 'activity-logs'
  | 'system-logs';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<UserRole>('patient');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  const getNavItems = () => {
    const baseItems = [{ id: 'dashboard', label: 'Trang chủ', icon: Home }];

    switch (userRole) {
      case 'patient':
        return [
          ...baseItems,
          { id: 'appointments', label: 'Lịch hẹn', icon: Calendar },
          { id: 'doctors', label: 'Bác sĩ', icon: Users },
          { id: 'profile', label: 'Hồ sơ', icon: User },
        ];
      case 'doctor':
        return [
          ...baseItems,
          { id: 'doctor-schedule', label: 'Lịch làm việc', icon: Calendar },
          { id: 'doctor-queue', label: 'Gọi khám', icon: Activity },
          { id: 'examination', label: 'Khám bệnh', icon: Stethoscope },
          { id: 'doctor-profile', label: 'Hồ sơ', icon: User },
        ];
      case 'receptionist':
        return [
          ...baseItems,
          { id: 'patient-registration', label: 'Tạo hồ sơ', icon: User },
          { id: 'receptionist-checkin', label: 'Check-in', icon: ClipboardCheck },
          { id: 'payment-processing', label: 'Thanh toán', icon: Receipt },
          { id: 'activity-logs', label: 'Nhật ký', icon: FileText },
        ];
      case 'manager':
        return [
          ...baseItems,
          { id: 'manager-schedule', label: 'Quản lý lịch', icon: Calendar },
          { id: 'certificate-approval', label: 'Duyệt chứng chỉ', icon: FileCheck },
          { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
          { id: 'system-logs', label: 'Nhật ký', icon: FileText },
        ];
      default:
        return baseItems;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      // Authentication
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentScreen('register')}
            onNavigateToForgotPassword={() => setCurrentScreen('forgot-password')}
          />
        );
      case 'register':
        return <RegisterScreen onRegister={handleLogin} onNavigateToLogin={() => setCurrentScreen('login')} />;
      case 'forgot-password':
        return <ForgotPasswordScreen onNavigateToLogin={() => setCurrentScreen('login')} />;

      // Common
      case 'dashboard':
        return <DashboardScreen userRole={userRole} onNavigate={setCurrentScreen} onLogout={handleLogout} />;
      case 'notifications':
        return <NotificationScreen userRole={userRole} onNavigate={setCurrentScreen} onLogout={handleLogout} />;

      // Patient
      case 'appointments':
      case 'medical-history':
        return <MedicalHistoryScreen onNavigate={setCurrentScreen} />;
      case 'payment-history':
        return <PaymentHistoryScreen onNavigate={setCurrentScreen} />;
      case 'doctors':
        return <DoctorListScreen userRole={userRole} onNavigate={setCurrentScreen} />;
      case 'appointment-booking':
        return <AppointmentBookingScreen onNavigate={setCurrentScreen} />;
      case 'profile':
        return <PatientProfileScreen userRole={userRole} onLogout={handleLogout} />;

      // Doctor
      case 'doctor-schedule':
        return <DoctorScheduleScreen onNavigate={setCurrentScreen} />;
      case 'doctor-queue':
        return (
          <DoctorQueueScreen
            onCallPatient={(queue) => console.log('Call patient:', queue)}
            onPreparePatient={(queue) => console.log('Prepare patient:', queue)}
            onStartExamination={(queue) => {
              console.log('Start examination:', queue);
              setCurrentScreen('examination');
            }}
          />
        );
      case 'doctor-profile':
        return <DoctorProfileScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'examination':
        return <ExaminationScreen onNavigate={setCurrentScreen} />;
      case 'prescription':
        return <PrescriptionScreen onNavigate={setCurrentScreen} />;

      // Receptionist
      case 'receptionist-dashboard':
        return <ReceptionistDashboardScreen onNavigate={setCurrentScreen} />;
      case 'patient-registration':
        return <PatientRegistrationScreen onNavigate={setCurrentScreen} />;
      case 'receptionist-checkin':
        return (
          <ReceptionistCheckInScreen
            onNavigateToCreateProfile={() => setCurrentScreen('patient-registration')}
            onCheckInComplete={(appointment, queueNumber) => {
              console.log('Check-in complete:', appointment, queueNumber);
              alert(`Check-in thành công! Số thứ tự: ${queueNumber}`);
            }}
          />
        );
      case 'receptionist-queue':
        return <ReceptionistQueueScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'activity-logs':
        return <ActivityLogScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'payment':
        return <PaymentScreen onNavigate={setCurrentScreen} />;
      case 'payment-processing':
        return <PaymentProcessingScreen onBack={() => setCurrentScreen('dashboard')} />;

      // Manager
      case 'manager-schedule':
        return <ManagerScheduleScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'doctor-approval':
      case 'certificate-approval':
        return <CertificateApprovalScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'reports':
      case 'revenue-report':
        return <RevenueReportScreen onNavigate={setCurrentScreen} />;
      case 'system-logs':
        return <SystemLogScreen onBack={() => setCurrentScreen('dashboard')} />;

      // Fallback
      case 'certificate-management':
      case 'schedule-management':
      case 'account-management':
      default:
        return <DashboardScreen userRole={userRole} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile App Container */}
      <div className="max-w-full mx-auto bg-white min-h-screen relative">
        {/* Main Content */}
        <div className={isAuthenticated ? 'pb-20' : ''}>{renderScreen()}</div>

        {/* Bottom Navigation */}
        {isAuthenticated && <BottomNavigation items={getNavItems()} currentScreen={currentScreen} onNavigate={setCurrentScreen} />}
      </div>
    </div>
  );
}
