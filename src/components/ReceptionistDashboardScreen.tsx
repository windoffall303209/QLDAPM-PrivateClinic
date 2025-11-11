import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Screen } from "../App";

interface ReceptionistDashboardScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface PatientAppointment {
  id: string;
  patientName: string;
  dateOfBirth: string;
  phone: string;
  appointmentTime: string;
  room: string;
  doctorName: string;
  status: "waiting" | "in_progress" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid";
  notes?: string;
}

export function ReceptionistDashboardScreen({
  onNavigate,
}: ReceptionistDashboardScreenProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const todayAppointments: PatientAppointment[] = [
    {
      id: "1",
      patientName: "Nguyễn Văn A",
      dateOfBirth: "15/03/1978",
      phone: "0123456789",
      appointmentTime: "08:00",
      room: "P101",
      doctorName: "BS. Trần Thị B",
      status: "completed",
      paymentStatus: "paid",
    },
    {
      id: "2",
      patientName: "Lê Thị C",
      dateOfBirth: "22/11/1990",
      phone: "0987654321",
      appointmentTime: "08:30",
      room: "P101",
      doctorName: "BS. Trần Thị B",
      status: "in_progress",
      paymentStatus: "pending",
    },
    {
      id: "3",
      patientName: "Phạm Minh D",
      dateOfBirth: "05/07/1995",
      phone: "0369258147",
      appointmentTime: "09:00",
      room: "P102",
      doctorName: "BS. Nguyễn Văn E",
      status: "waiting",
      paymentStatus: "pending",
    },
    {
      id: "4",
      patientName: "Hoàng Thị F",
      dateOfBirth: "10/02/1968",
      phone: "0741852963",
      appointmentTime: "09:30",
      room: "P103",
      doctorName: "BS. Lê Minh G",
      status: "waiting",
      paymentStatus: "pending",
      notes: "Dị ứng Penicillin",
    },
    {
      id: "5",
      patientName: "Trần Văn H",
      dateOfBirth: "18/09/1956",
      phone: "0852741963",
      appointmentTime: "10:00",
      room: "P101",
      doctorName: "BS. Trần Thị B",
      status: "waiting",
      paymentStatus: "pending",
      notes: "Cấp cứu - ưu tiên",
    },
    {
      id: "6",
      patientName: "Nguyễn Thị I",
      dateOfBirth: "25/04/1985",
      phone: "0963852741",
      appointmentTime: "10:30",
      room: "P102",
      doctorName: "BS. Nguyễn Văn E",
      status: "cancelled",
      paymentStatus: "pending",
    },
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting": return "Chờ khám";
      case "in_progress": return "Đang khám";
      case "completed": return "Hoàn thành";
      case "cancelled": return "Đã hủy";
      default: return status;
    }
  };

  const filteredAppointments = todayAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.phone.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="mb-3 sm:mb-4">
        <h1 className="text-base sm:text-lg lg:text-xl font-semibold mb-1">
          Danh sách lịch hẹn - {new Date().toLocaleDateString("vi-VN")}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">Tổng: {todayAppointments.length} bệnh nhân</p>
      </div>

      {/* Filters */}
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Input
          placeholder="Tìm tên/SĐT..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-xs text-sm"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="all">Tất cả</option>
          <option value="waiting">Chờ khám</option>
          <option value="in_progress">Đang khám</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
        <Button onClick={() => onNavigate("appointment-booking")} className="text-sm">
          + Đặt lịch
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">STT</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Tên BN</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Ngày sinh</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Giờ</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Phòng</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Bác sĩ</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Trạng thái</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={appointment.id} className="border-t hover:bg-gray-50">
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm">{index + 1}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium">
                  <div>{appointment.patientName}</div>
                  {appointment.notes && (
                    <div className="text-xs text-orange-600">{appointment.notes}</div>
                  )}
                </td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{appointment.dateOfBirth}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{appointment.appointmentTime}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm">{appointment.room}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{appointment.doctorName}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm">
                  <span className={`inline-block px-1.5 sm:px-2 py-1 rounded text-xs whitespace-nowrap ${
                    appointment.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                    appointment.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {getStatusText(appointment.status)}
                  </span>
                </td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm">
                  <div className="flex gap-1 whitespace-nowrap">
                    <Button size="sm" variant="outline" className="text-xs px-2">Chi tiết</Button>
                    {appointment.paymentStatus === "pending" && (
                      <Button size="sm" onClick={() => onNavigate("payment")} className="text-xs px-2">
                        TT
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAppointments.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Không tìm thấy bệnh nhân nào
          </div>
        )}
      </div>
    </div>
  );
}
