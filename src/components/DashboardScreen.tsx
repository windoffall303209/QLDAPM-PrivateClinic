import React from 'react';
import { Button } from './ui/button';
import { UserRole, Screen } from '../App';
import { LogOut } from 'lucide-react';

interface DashboardScreenProps {
  userRole: UserRole;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function DashboardScreen({ userRole, onNavigate, onLogout }: DashboardScreenProps) {
  const getWelcomeMessage = () => {
    switch (userRole) {
      case 'patient': return 'Chào bệnh nhân';
      case 'doctor': return 'Chào bác sĩ';
      case 'receptionist': return 'Chào lễ tân';
      case 'manager': return 'Chào quản lý';
      default: return 'Chào mừng';
    }
  };

  const getStats = () => {
    switch (userRole) {
      case 'patient':
        return [
          { label: 'Lịch hẹn tháng này', value: '5' },
          { label: 'Lần khám gần nhất', value: '3 ngày trước' },
          { label: 'Đơn thuốc đang dùng', value: '2' },
        ];
      case 'doctor':
        return [
          { label: 'Bệnh nhân hôm nay', value: '15' },
          { label: 'Đã khám xong', value: '2' },
          { label: 'Đang chờ', value: '5' },
          { label: 'Đơn thuốc đã kê', value: '8' },
        ];
      case 'receptionist':
        return [
          { label: 'Lịch hẹn hôm nay', value: '15' },
          { label: 'Thanh toán chờ xử lý', value: '5' },
        ];
      case 'manager':
        return [
          { label: 'Doanh thu tháng', value: '125M VNĐ' },
          { label: 'Bệnh nhân mới', value: '23' },
          { label: 'Yêu cầu chờ duyệt', value: '3' },
          { label: 'Tỷ lệ hài lòng', value: '96%' },
        ];
      default:
        return [];
    }
  };

  const getQuickActions = () => {
    switch (userRole) {
      case 'patient':
        return [
          { title: 'Đặt lịch khám', action: () => onNavigate('appointment-booking') },
          { title: 'Danh sách bác sĩ', action: () => onNavigate('doctors') },
          { title: 'Lịch sử khám bệnh', action: () => onNavigate('medical-history') },
        ];
      case 'doctor':
        return [
          { title: 'Lịch làm việc', action: () => onNavigate('doctor-schedule') },
          { title: 'Danh sách bệnh nhân', action: () => onNavigate('examination') },
          { title: 'Kê đơn thuốc', action: () => onNavigate('prescription') },
        ];
      case 'receptionist':
        return [
          { title: 'Đặt lịch hẹn', action: () => onNavigate('appointment-booking') },
          { title: 'Thanh toán', action: () => onNavigate('payment') },
          { title: 'Danh sách bác sĩ', action: () => onNavigate('doctors') },
        ];
      case 'manager':
        return [
          { title: 'Báo cáo doanh thu', action: () => onNavigate('reports') },
          { title: 'Quản lý bác sĩ', action: () => onNavigate('doctors') },
          { title: 'Tổng quan lịch hẹn', action: () => onNavigate('appointments') },
        ];
      default:
        return [];
    }
  };

  const getRecentActivities = () => {
    if (userRole === 'patient') {
      return [
        { title: 'Khám tổng quát', detail: 'BS. Nguyễn Văn A - 14:00, 25/11/2025', status: 'Chờ khám' },
        { title: 'Khám tim mạch', detail: 'BS. Trần Thị B - 09:00, 28/11/2025', status: 'Đã đặt' },
        { title: 'Tái khám da liễu', detail: 'BS. Lê Minh G - 10:30, 02/12/2025', status: 'Đã đặt' },
        { title: 'Xét nghiệm máu định kỳ', detail: 'Phòng xét nghiệm - 08:00, 05/12/2025', status: 'Đã đặt' },
        { title: 'Khám răng miệng', detail: 'BS. Phạm Văn H - 15:00, 10/12/2025', status: 'Đã đặt' },
      ];
    }
    if (userRole === 'doctor') {
      return [
        { title: 'Bệnh nhân Nguyễn Văn An', detail: 'Hoàn thành khám - 08:15', status: 'Hoàn thành' },
        { title: 'Bệnh nhân Lê Thị Cẩm', detail: 'Hoàn thành khám - 08:45', status: 'Hoàn thành' },
        { title: 'Bệnh nhân Phạm Minh Đức', detail: 'Đang khám - 09:10', status: 'Đang khám' },
        { title: 'Bệnh nhân Hoàng Thị Phượng', detail: 'Chờ khám - 09:30', status: 'Chờ khám' },
        { title: 'Bệnh nhân Trần Văn Hùng', detail: 'Chờ khám - 10:00', status: 'Chờ khám' },
        { title: 'Bệnh nhân Nguyễn Thị Lan', detail: 'Chờ khám - 10:30', status: 'Chờ khám' },
        { title: 'Bệnh nhân Vũ Minh Tuấn', detail: 'Chờ khám - 11:00', status: 'Chờ khám' },
      ];
    }
    if (userRole === 'manager') {
      return [
        { title: 'Yêu cầu nghỉ phép - BS. Trần Thị B', detail: 'Ngày 20/11/2025 - Lý do: Công tác cá nhân', status: 'Chờ duyệt' },
        { title: 'Thay đổi lịch - BS. Nguyễn Văn E', detail: 'Đổi ca sáng thành chiều - 18/11/2025', status: 'Chờ duyệt' },
        { title: 'Yêu cầu thêm ca - BS. Lê Minh G', detail: 'Thêm ca chiều thứ 7 - 23/11/2025', status: 'Chờ duyệt' },
        { title: 'Chứng chỉ mới - BS. Phạm Văn H', detail: 'Chứng chỉ chuyên khoa II - Tim mạch', status: 'Đã duyệt' },
        { title: 'Báo cáo doanh thu tháng 10', detail: 'Tổng: 125,500,000 VNĐ - Tăng 12% so với tháng trước', status: 'Hoàn thành' },
      ];
    }
    return [];
  };

  const getWaitingPatients = () => {
    return [
      {
        patientName: 'Nguyễn Văn An',
        dateOfBirth: '1978',
        appointmentTime: '08:00',
        room: 'P101',
        doctorName: 'BS. Trần Thị B',
      },
      {
        patientName: 'Lê Thị Cẩm',
        dateOfBirth: '1990',
        appointmentTime: '08:30',
        room: 'P101',
        doctorName: 'BS. Trần Thị B',
      },
      {
        patientName: 'Phạm Minh Đức',
        dateOfBirth: '1995',
        appointmentTime: '09:00',
        room: 'P102',
        doctorName: 'BS. Nguyễn Văn E',
      },
      {
        patientName: 'Hoàng Thị Phượng',
        dateOfBirth: '1968',
        appointmentTime: '09:30',
        room: 'P103',
        doctorName: 'BS. Lê Minh G',
      },
      {
        patientName: 'Trần Văn Hùng',
        dateOfBirth: '1956',
        appointmentTime: '10:00',
        room: 'P101',
        doctorName: 'BS. Trần Thị B',
      },
      {
        patientName: 'Nguyễn Thị Lan',
        dateOfBirth: '1985',
        appointmentTime: '10:30',
        room: 'P102',
        doctorName: 'BS. Nguyễn Văn E',
      },
      {
        patientName: 'Vũ Minh Tuấn',
        dateOfBirth: '1992',
        appointmentTime: '11:00',
        room: 'P103',
        doctorName: 'BS. Lê Minh G',
      },
      {
        patientName: 'Đặng Thị Mai',
        dateOfBirth: '1975',
        appointmentTime: '11:30',
        room: 'P101',
        doctorName: 'BS. Trần Thị B',
      },
      {
        patientName: 'Bùi Văn Long',
        dateOfBirth: '1988',
        appointmentTime: '13:00',
        room: 'P102',
        doctorName: 'BS. Nguyễn Văn E',
      },
      {
        patientName: 'Phan Thị Hương',
        dateOfBirth: '1994',
        appointmentTime: '13:30',
        room: 'P103',
        doctorName: 'BS. Lê Minh G',
      },
      {
        patientName: 'Lương Văn Đạt',
        dateOfBirth: '1972',
        appointmentTime: '14:00',
        room: 'P101',
        doctorName: 'BS. Trần Thị B',
      },
      {
        patientName: 'Võ Thị Ngọc',
        dateOfBirth: '1999',
        appointmentTime: '14:30',
        room: 'P102',
        doctorName: 'BS. Nguyễn Văn E',
      },
      {
        patientName: 'Đỗ Minh Tâm',
        dateOfBirth: '1983',
        appointmentTime: '15:00',
        room: 'P103',
        doctorName: 'BS. Lê Minh G',
      },
      {
        patientName: 'Cao Thị Thanh',
        dateOfBirth: '1965',
        appointmentTime: '15:30',
        room: 'P101',
        doctorName: 'BS. Trần Thị B',
      },
      {
        patientName: 'Hồ Văn Kiên',
        dateOfBirth: '1991',
        appointmentTime: '16:00',
        room: 'P102',
        doctorName: 'BS. Nguyễn Văn E',
      },
    ];
  };

  const handlePrintPatientInfo = (patientName: string) => {
    alert(`Đang xuất phiếu thông tin khám cho bệnh nhân: ${patientName}\n\nChức năng in phiếu sẽ được triển khai với thư viện jsPDF`);
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      <div className="mb-4 sm:mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">{getWelcomeMessage()}</h1>
          <p className="text-xs sm:text-sm text-gray-600">
            {new Date().toLocaleDateString('vi-VN', {
              weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        </div>
        <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">Thống kê</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {getStats().map((stat, index) => (
            <div key={index} className="border rounded p-3 sm:p-4">
              <div className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions - Ẩn cho receptionist */}
      {userRole !== 'receptionist' && (
        <div className="mb-4 sm:mb-6">
          <h2 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">Tác vụ nhanh</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {getQuickActions().map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-sm"
                onClick={action.action}
              >
                {action.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activities / Waiting List */}
      <div>
        <h2 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">
          {userRole === 'patient' ? 'Lịch hẹn sắp tới' : userRole === 'receptionist' ? 'Danh sách chờ khám' : 'Hoạt động gần đây'}
        </h2>
        <div className="border rounded overflow-x-auto">
          {userRole === 'receptionist' ? (
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">STT</th>
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">Tên bệnh nhân</th>
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">Năm sinh</th>
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">Giờ</th>
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">Phòng</th>
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">Bác sĩ</th>
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {getWaitingPatients().map((patient, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{index + 1}</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">{patient.patientName}</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{patient.dateOfBirth}</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{patient.appointmentTime}</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{patient.room}</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{patient.doctorName}</td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePrintPatientInfo(patient.patientName)}
                        className="text-xs"
                      >
                        Xuất phiếu
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[500px]">
              <tbody>
                {getRecentActivities().map((activity, index) => (
                  <tr key={index} className={index > 0 ? 'border-t' : ''}>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <div className="font-medium text-xs sm:text-sm">{activity.title}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{activity.detail}</div>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs whitespace-nowrap ${
                        activity.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                        activity.status === 'Đã đặt' ? 'bg-blue-100 text-blue-800' :
                        activity.status === 'Đã duyệt' ? 'bg-green-100 text-green-800' :
                        activity.status === 'Đang khám' ? 'bg-purple-100 text-purple-800' :
                        activity.status === 'Chờ duyệt' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
