import React from 'react';
import { Button } from './ui/button';
import { UserRole, Screen } from '../App';

interface DashboardScreenProps {
  userRole: UserRole;
  onNavigate: (screen: Screen) => void;
}

export function DashboardScreen({ userRole, onNavigate }: DashboardScreenProps) {
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
          { label: 'Lịch hẹn tháng này', value: '3' },
          { label: 'Lần khám gần nhất', value: '5 ngày trước' },
        ];
      case 'doctor':
        return [
          { label: 'Bệnh nhân hôm nay', value: '12' },
          { label: 'Lịch hẹn tuần này', value: '45' },
          { label: 'Đơn thuốc đã kê', value: '8' },
        ];
      case 'receptionist':
        return [
          { label: 'Lịch hẹn hôm nay', value: '28' },
          { label: 'Thanh toán chờ xử lý', value: '5' },
        ];
      case 'manager':
        return [
          { label: 'Doanh thu tháng', value: '125M VNĐ' },
          { label: 'Bệnh nhân mới', value: '23' },
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
        { title: 'Khám tổng quát', detail: 'BS. Nguyễn Văn A - 14:00, 25/09/2024', status: 'Chờ khám' },
        { title: 'Khám tim mạch', detail: 'BS. Trần Thị B - 09:00, 28/09/2024', status: 'Đã đặt' },
      ];
    }
    return [
      { title: 'Bệnh nhân Nguyễn Văn C', detail: 'Hoàn thành khám - 13:30', status: 'Hoàn thành' },
      { title: 'Bệnh nhân Lê Thị D', detail: 'Đang chờ khám - 14:00', status: 'Chờ khám' },
    ];
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">{getWelcomeMessage()}</h1>
        <p className="text-sm text-gray-600">
          {new Date().toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <h2 className="text-base font-medium mb-3">Thống kê</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {getStats().map((stat, index) => (
            <div key={index} className="border rounded p-4">
              <div className="text-2xl font-semibold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-base font-medium mb-3">Tác vụ nhanh</h2>
        <div className="space-y-2">
          {getQuickActions().map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start"
              onClick={action.action}
            >
              {action.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-base font-medium mb-3">
          {userRole === 'patient' ? 'Lịch hẹn sắp tới' : 'Hoạt động gần đây'}
        </h2>
        <div className="border rounded">
          <table className="w-full">
            <tbody>
              {getRecentActivities().map((activity, index) => (
                <tr key={index} className={index > 0 ? 'border-t' : ''}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-sm">{activity.title}</div>
                    <div className="text-sm text-gray-600">{activity.detail}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      activity.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                      activity.status === 'Đã đặt' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
