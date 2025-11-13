import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  Printer,
  Download,
  Eye,
  Calendar,
  Clock,
  User,
  Phone,
  Hash,
  MapPin,
  FileText
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Appointment } from '../types';

interface ReceptionistQueueScreenProps {
  onBack: () => void;
}

export function ReceptionistQueueScreen({ onBack }: ReceptionistQueueScreenProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showTicketDialog, setShowTicketDialog] = useState(false);

  // Mock data - Danh sách đã check-in
  const checkedInAppointments: Appointment[] = [
    {
      id: '1',
      bookingId: 'BK2024111301',
      patientId: 'PT001',
      patientName: 'Nguyễn Văn An',
      patientPhone: '0901234567',
      patientDateOfBirth: '1990-05-15',
      appointmentDate: '2025-11-13',
      shift: 'morning',
      doctorId: 'DR001',
      doctorName: 'BS. Trần Thị Mai',
      specialty: 'Tim mạch',
      roomNumber: 'P101',
      reason: 'Khám định kỳ tim mạch',
      notes: 'Dị ứng Penicillin',
      status: 'checked_in',
      source: 'online',
      queueNumber: 'P1-AM-005',
      queueNumberType: 'room',
      checkedInAt: '2025-11-13T08:05:00Z',
      createdAt: '2025-11-12T10:00:00Z',
      updatedAt: '2025-11-13T08:05:00Z',
    },
    {
      id: '2',
      bookingId: 'BK2024111302',
      patientId: 'PT002',
      patientName: 'Lê Thị Bình',
      patientPhone: '0912345678',
      patientDateOfBirth: '1985-08-20',
      appointmentDate: '2025-11-13',
      shift: 'afternoon',
      reason: 'Khám tổng quát',
      status: 'checked_in',
      source: 'online',
      queueNumber: 'G-012',
      queueNumberType: 'general',
      checkedInAt: '2025-11-13T13:10:00Z',
      createdAt: '2025-11-12T14:30:00Z',
      updatedAt: '2025-11-13T13:10:00Z',
    },
    {
      id: '3',
      bookingId: 'WALK2024111303',
      patientId: 'PT003',
      patientName: 'Trần Văn Cường',
      patientPhone: '0923456789',
      patientDateOfBirth: '1995-03-10',
      appointmentDate: '2025-11-13',
      shift: 'morning',
      doctorId: 'DR002',
      doctorName: 'BS. Nguyễn Văn Bình',
      specialty: 'Nội tổng quát',
      roomNumber: 'P102',
      reason: 'Đau bụng',
      status: 'checked_in',
      source: 'walk_in',
      queueNumber: 'P2-AM-003',
      queueNumberType: 'room',
      checkedInAt: '2025-11-13T08:20:00Z',
      createdAt: '2025-11-13T08:15:00Z',
      updatedAt: '2025-11-13T08:20:00Z',
    },
  ];

  const handlePrintTicket = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowTicketDialog(true);
  };

  const handleDownloadPDF = (appointment: Appointment) => {
    // Simulate PDF download
    alert(`Đang tải phiếu thông tin của ${appointment.patientName} (PDF)`);
  };

  const handlePrint = () => {
    window.print();
  };

  const getShiftLabel = (shift: string) => {
    switch (shift) {
      case 'morning': return 'Sáng (8h-12h)';
      case 'afternoon': return 'Chiều (13h-17h)';
      case 'evening': return 'Tối (18h-22h)';
      default: return shift;
    }
  };

  const getSourceBadge = (source: string) => {
    if (source === 'online') {
      return <Badge className="bg-blue-500">Hẹn trước</Badge>;
    }
    return <Badge variant="secondary">Vãng lai</Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked_in':
        return <Badge className="bg-green-500">Đã check-in</Badge>;
      case 'waiting':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Chờ khám</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Đang khám</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Hoàn thành</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Danh sách đã Check-in
                </CardTitle>
                <CardDescription>
                  Quản lý và xuất phiếu thông tin cho bệnh nhân
                </CardDescription>
              </div>
              <Button variant="outline" onClick={onBack}>
                Quay lại
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Queue List */}
        <div className="space-y-3">
          {checkedInAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Patient & Appointment Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{appointment.patientName}</h3>
                          {getSourceBadge(appointment.source)}
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{appointment.patientPhone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Sinh: {new Date(appointment.patientDateOfBirth).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Queue Number Display */}
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">
                          {appointment.queueNumber}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Số thứ tự
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Appointment Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Mã đặt chỗ:</span>
                          <span className="font-mono font-medium">{appointment.bookingId}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Ngày khám:</span>
                          <span className="font-medium">
                            {new Date(appointment.appointmentDate).toLocaleDateString('vi-VN')}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Ca khám:</span>
                          <Badge variant="outline">{getShiftLabel(appointment.shift)}</Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {appointment.doctorName && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Bác sĩ:</span>
                            <span className="font-medium">{appointment.doctorName}</span>
                          </div>
                        )}

                        {appointment.specialty && (
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Chuyên khoa:</span>
                            <Badge variant="secondary">{appointment.specialty}</Badge>
                          </div>
                        )}

                        {appointment.roomNumber && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Phòng:</span>
                            <span className="font-medium">{appointment.roomNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Lý do khám:</div>
                      <div className="text-sm">{appointment.reason}</div>
                    </div>

                    {appointment.notes && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="text-xs text-yellow-800 font-semibold mb-1">Ghi chú quan trọng:</div>
                        <div className="text-sm text-yellow-900">{appointment.notes}</div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        Check-in lúc: {appointment.checkedInAt && new Date(appointment.checkedInAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handlePrintTicket(appointment)}
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Xem phiếu
                    </Button>
                    <Button
                      onClick={() => handleDownloadPDF(appointment)}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Tải PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {checkedInAppointments.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                Chưa có bệnh nhân check-in
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Ticket Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Phiếu thông tin bệnh nhân</DialogTitle>
            <DialogDescription>
              Xuất phiếu thông tin để in hoặc hiển thị cho bệnh nhân
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              {/* Ticket Preview */}
              <div className="border-2 border-dashed rounded-lg p-6 space-y-4 bg-white">
                {/* Header */}
                <div className="text-center border-b pb-4">
                  <h2 className="text-lg font-bold">PHÒNG KHÁM ĐA KHOA ABC</h2>
                  <p className="text-sm text-muted-foreground">123 Đường ABC, Quận 1, TP.HCM</p>
                  <p className="text-sm text-muted-foreground">ĐT: 028 1234 5678</p>
                </div>

                {/* Title */}
                <div className="text-center">
                  <h3 className="text-xl font-bold">PHIẾU KHÁM BỆNH</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Queue Number */}
                <div className="text-center bg-primary/10 rounded-lg py-4">
                  <p className="text-sm text-muted-foreground mb-2">Số thứ tự của bạn</p>
                  <p className="text-5xl font-bold text-primary">{selectedAppointment.queueNumber}</p>
                </div>

                {/* Patient Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Họ tên:</span>
                    <span className="font-medium">{selectedAppointment.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày sinh:</span>
                    <span className="font-medium">
                      {new Date(selectedAppointment.patientDateOfBirth).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Số điện thoại:</span>
                    <span className="font-medium">{selectedAppointment.patientPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mã đặt chỗ:</span>
                    <span className="font-mono font-medium">{selectedAppointment.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nguồn:</span>
                    {getSourceBadge(selectedAppointment.source)}
                  </div>
                </div>

                <Separator />

                {/* Appointment Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ca khám:</span>
                    <span className="font-medium">{getShiftLabel(selectedAppointment.shift)}</span>
                  </div>
                  {selectedAppointment.doctorName && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bác sĩ:</span>
                      <span className="font-medium">{selectedAppointment.doctorName}</span>
                    </div>
                  )}
                  {selectedAppointment.specialty && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chuyên khoa:</span>
                      <span className="font-medium">{selectedAppointment.specialty}</span>
                    </div>
                  )}
                  {selectedAppointment.roomNumber && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phòng khám:</span>
                      <span className="font-medium text-lg">{selectedAppointment.roomNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Thời gian cấp số:</span>
                    <span className="font-medium">
                      {selectedAppointment.checkedInAt &&
                        new Date(selectedAppointment.checkedInAt).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      }
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-muted-foreground border-t pt-4">
                  <p>Vui lòng chờ đến khi số của bạn được gọi</p>
                  <p>Cảm ơn bạn đã tin tưởng sử dụng dịch vụ!</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={handlePrint} className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  In phiếu
                </Button>
                <Button
                  onClick={() => handleDownloadPDF(selectedAppointment)}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tải PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
