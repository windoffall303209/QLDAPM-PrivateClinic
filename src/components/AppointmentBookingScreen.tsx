import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UserRole, Screen } from '../App';

interface AppointmentBookingScreenProps {
  userRole: UserRole;
  onNavigate: (screen: Screen) => void;
}

export function AppointmentBookingScreen({ userRole, onNavigate }: AppointmentBookingScreenProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    dateOfBirth: '',
    phone: '',
    doctor: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    notes: ''
  });

  const doctors = [
    { id: '1', name: 'BS. Nguyễn Văn An', specialty: 'Tim mạch' },
    { id: '2', name: 'BS. Trần Thị Bình', specialty: 'Nhi khoa' },
    { id: '3', name: 'BS. Lê Minh Cường', specialty: 'Thần kinh' },
    { id: '4', name: 'BS. Phạm Thị Dung', specialty: 'Da liễu' },
    { id: '5', name: 'BS. Hoàng Văn Em', specialty: 'Tiêu hóa' }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đặt lịch thành công!');
    onNavigate('dashboard');
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-4xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-base sm:text-lg lg:text-xl font-semibold mb-1">Đặt lịch khám bệnh</h1>
        <p className="text-xs sm:text-sm text-gray-600">Điền thông tin để đặt lịch hẹn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Thông tin bệnh nhân */}
        <div className="border rounded p-3 sm:p-4">
          <h2 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">Thông tin bệnh nhân</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label>Họ tên <span className="text-red-500">*</span></Label>
              <Input
                required
                value={formData.patientName}
                onChange={(e) => handleChange('patientName', e.target.value)}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <Label>Ngày sinh <span className="text-red-500">*</span></Label>
              <Input
                required
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              />
            </div>
            <div>
              <Label>Số điện thoại <span className="text-red-500">*</span></Label>
              <Input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="0912345678"
              />
            </div>
          </div>
        </div>

        {/* Thông tin lịch hẹn */}
        <div className="border rounded p-4">
          <h2 className="font-medium mb-3">Thông tin lịch hẹn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Chọn bác sĩ <span className="text-red-500">*</span></Label>
              <select
                required
                value={formData.doctor}
                onChange={(e) => handleChange('doctor', e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">-- Chọn bác sĩ --</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Ngày khám <span className="text-red-500">*</span></Label>
              <Input
                required
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => handleChange('appointmentDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label>Giờ khám <span className="text-red-500">*</span></Label>
              <select
                required
                value={formData.appointmentTime}
                onChange={(e) => handleChange('appointmentTime', e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">-- Chọn giờ --</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lý do khám */}
        <div className="border rounded p-4">
          <h2 className="font-medium mb-3">Lý do khám</h2>
          <div className="space-y-3">
            <div>
              <Label>Triệu chứng / Lý do <span className="text-red-500">*</span></Label>
              <textarea
                required
                value={formData.reason}
                onChange={(e) => handleChange('reason', e.target.value)}
                className="w-full border rounded px-3 py-2 min-h-[80px]"
                placeholder="Mô tả triệu chứng hoặc lý do khám..."
              />
            </div>
            <div>
              <Label>Ghi chú thêm (tùy chọn)</Label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="w-full border rounded px-3 py-2 min-h-[60px]"
                placeholder="Ghi chú thêm cho bác sĩ..."
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => onNavigate('dashboard')}>
            Hủy
          </Button>
          <Button type="submit">
            Xác nhận đặt lịch
          </Button>
        </div>
      </form>
    </div>
  );
}
