import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Screen } from "../App";

interface DoctorScheduleScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface ScheduleSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  patientName?: string;
  status: "available" | "booked" | "completed";
  room?: string;
}

export function DoctorScheduleScreen({ onNavigate }: DoctorScheduleScreenProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const scheduleSlots: ScheduleSlot[] = [
    {
      id: "1",
      date: "2024-09-22",
      startTime: "08:00",
      endTime: "09:00",
      status: "booked",
      patientName: "Nguyễn Văn A",
      room: "P101",
    },
    {
      id: "2",
      date: "2024-09-22",
      startTime: "09:00",
      endTime: "10:00",
      status: "booked",
      patientName: "Lê Thị B",
      room: "P101",
    },
    {
      id: "3",
      date: "2024-09-22",
      startTime: "10:00",
      endTime: "11:00",
      status: "available",
      room: "P101",
    },
    {
      id: "4",
      date: "2024-09-22",
      startTime: "14:00",
      endTime: "15:00",
      status: "booked",
      patientName: "Trần Văn C",
      room: "P101",
    },
    {
      id: "5",
      date: "2024-09-22",
      startTime: "15:00",
      endTime: "16:00",
      status: "completed",
      patientName: "Phạm Thị D",
      room: "P101",
    },
  ];

  const todaySlots = scheduleSlots.filter(slot => slot.date === selectedDate);
  const stats = {
    total: todaySlots.length,
    booked: todaySlots.filter(s => s.status === 'booked').length,
    completed: todaySlots.filter(s => s.status === 'completed').length,
    available: todaySlots.filter(s => s.status === 'available').length,
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-5xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-base sm:text-lg lg:text-xl font-semibold mb-1">Lịch làm việc</h1>
        <p className="text-xs sm:text-sm text-gray-600">Quản lý lịch khám bệnh</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
        <div className="border rounded p-2 sm:p-3 text-center">
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold">{stats.total}</div>
          <div className="text-xs sm:text-sm text-gray-600">Tổng ca</div>
        </div>
        <div className="border rounded p-2 sm:p-3 text-center">
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-600">{stats.booked}</div>
          <div className="text-xs sm:text-sm text-gray-600">Đã đặt</div>
        </div>
        <div className="border rounded p-2 sm:p-3 text-center">
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-600">{stats.completed}</div>
          <div className="text-xs sm:text-sm text-gray-600">Hoàn thành</div>
        </div>
        <div className="border rounded p-2 sm:p-3 text-center">
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-600">{stats.available}</div>
          <div className="text-xs sm:text-sm text-gray-600">Còn trống</div>
        </div>
      </div>

      {/* Date Picker */}
      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium mb-2">Chọn ngày</label>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full sm:max-w-xs text-sm"
        />
      </div>

      {/* Schedule Table */}
      <div className="border rounded overflow-x-auto">
        <h2 className="text-sm sm:text-base font-medium p-3 sm:p-4 border-b">Lịch ngày {new Date(selectedDate).toLocaleDateString('vi-VN')}</h2>
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium">Giờ</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Bệnh nhân</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Phòng</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Trạng thái</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {todaySlots.map((slot) => (
              <tr key={slot.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {slot.startTime} - {slot.endTime}
                </td>
                <td className="px-4 py-3 text-sm">
                  {slot.patientName || <span className="text-gray-400">Trống</span>}
                </td>
                <td className="px-4 py-3 text-sm">{slot.room}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    slot.status === 'available' ? 'bg-gray-100 text-gray-800' :
                    slot.status === 'booked' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {slot.status === 'available' ? 'Trống' :
                     slot.status === 'booked' ? 'Đã đặt' : 'Hoàn thành'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  {slot.status === 'booked' && (
                    <Button size="sm" onClick={() => onNavigate('examination')}>
                      Khám
                    </Button>
                  )}
                  {slot.status === 'completed' && (
                    <Button size="sm" variant="outline">
                      Xem
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {todaySlots.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Không có lịch làm việc trong ngày này
          </div>
        )}
      </div>
    </div>
  );
}
