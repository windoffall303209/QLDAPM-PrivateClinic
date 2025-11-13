import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Calendar, Clock, User, CheckCircle2, AlertCircle, Copy } from 'lucide-react';
import { ShiftType, SHIFTS, SPECIALTIES } from '../types';

interface AppointmentBookingScreenProps {
  onNavigate: (screen: string) => void;
}

export function AppointmentBookingScreen({ onNavigate }: AppointmentBookingScreenProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    dateOfBirth: '',
    phone: '',
    specialty: '',
    doctor: '',
    appointmentDate: '',
    shift: '' as ShiftType | '',
    reason: '',
    notes: '',
  });

  const [bookingResult, setBookingResult] = useState<{
    bookingId: string;
    success: boolean;
  } | null>(null);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Mock data - Danh sách bác sĩ
  const doctors = [
    { id: '1', name: 'BS. Nguyễn Văn An', specialty: 'cardiology' },
    { id: '2', name: 'BS. Trần Thị Bình', specialty: 'pediatrics' },
    { id: '3', name: 'BS. Lê Minh Cường', specialty: 'neurology' },
    { id: '4', name: 'BS. Phạm Thị Dung', specialty: 'dermatology' },
    { id: '5', name: 'BS. Hoàng Văn Em', specialty: 'gastroenterology' },
  ];

  // Mock data - Danh sách lịch hẹn hiện có (để kiểm tra trùng)
  const existingAppointments = [
    { patientPhone: '0901234567', date: '2025-11-13', shift: 'morning' },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Sinh Booking ID tự động
  const generateBookingId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const sequence = String(Math.floor(Math.random() * 100) + 1).padStart(2, '0');

    return `BK${year}${month}${day}${sequence}`;
  };

  // Kiểm tra ca có hợp lệ không (cho phép đặt trong ngày nếu chưa tới ca)
  const isShiftAvailable = (selectedDate: string, selectedShift: ShiftType) => {
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);

    // Nếu ngày khác ngày hôm nay, cho phép
    if (
      selectedDateTime.toDateString() !== now.toDateString()
    ) {
      return true;
    }

    // Nếu là ngày hôm nay, kiểm tra ca
    const currentHour = now.getHours();
    const shiftData = SHIFTS[selectedShift];
    const shiftStartHour = parseInt(shiftData.startTime.split(':')[0]);

    // Chỉ cho phép nếu ca chưa bắt đầu
    return currentHour < shiftStartHour;
  };

  // Kiểm tra trùng lịch
  const checkDuplicateAppointment = (
    phone: string,
    date: string,
    shift: ShiftType
  ) => {
    return existingAppointments.some(
      (apt) => apt.patientPhone === phone && apt.date === date && apt.shift === shift
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.patientName || !formData.phone || !formData.appointmentDate || !formData.shift || !formData.reason) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    // Kiểm tra ca có hợp lệ không
    if (!isShiftAvailable(formData.appointmentDate, formData.shift)) {
      alert('Ca khám đã bắt đầu hoặc đã qua! Vui lòng chọn ca khác.');
      return;
    }

    // Kiểm tra trùng lịch
    if (checkDuplicateAppointment(formData.phone, formData.appointmentDate, formData.shift)) {
      alert('Bạn đã có lịch hẹn vào ngày và ca này rồi! Vui lòng chọn ngày/ca khác.');
      return;
    }

    // Sinh Booking ID
    const bookingId = generateBookingId();

    // Success
    setBookingResult({
      bookingId,
      success: true,
    });
    setShowSuccessDialog(true);
  };

  const handleCopyBookingId = () => {
    if (bookingResult) {
      navigator.clipboard.writeText(bookingResult.bookingId);
      alert('Đã sao chép mã đặt chỗ!');
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessDialog(false);
    onNavigate('dashboard');
  };

  const getShiftLabel = (shift: ShiftType) => {
    const shiftData = SHIFTS[shift];
    return `${
      shift === 'morning' ? 'Sáng' : shift === 'afternoon' ? 'Chiều' : 'Tối'
    } (${shiftData.startTime}-${shiftData.endTime})`;
  };

  const getAvailableShifts = () => {
    if (!formData.appointmentDate) return ['morning', 'afternoon', 'evening'] as ShiftType[];

    const selectedDate = new Date(formData.appointmentDate);
    const now = new Date();

    // Nếu không phải hôm nay, cho phép tất cả ca
    if (selectedDate.toDateString() !== now.toDateString()) {
      return ['morning', 'afternoon', 'evening'] as ShiftType[];
    }

    // Nếu là hôm nay, chỉ hiển thị ca chưa tới
    const currentHour = now.getHours();
    const availableShifts: ShiftType[] = [];

    if (currentHour < 8) {
      availableShifts.push('morning', 'afternoon', 'evening');
    } else if (currentHour < 13) {
      availableShifts.push('afternoon', 'evening');
    } else if (currentHour < 18) {
      availableShifts.push('evening');
    }

    return availableShifts;
  };

  const filteredDoctors = formData.specialty
    ? doctors.filter((d) => d.specialty === formData.specialty)
    : doctors;

  const availableShifts = getAvailableShifts();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Đặt lịch khám bệnh
            </CardTitle>
            <CardDescription>
              Điền thông tin để đặt lịch hẹn khám bệnh
            </CardDescription>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin bệnh nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">
                    Họ và tên <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="patientName"
                    required
                    value={formData.patientName}
                    onChange={(e) => handleChange('patientName', e.target.value)}
                    placeholder="Nguyễn Văn An"
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Ngày sinh <span className="text-red-500">*</span></Label>
                  <Input
                    id="dateOfBirth"
                    required
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">
                    Số điện thoại <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="0912345678"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin lịch hẹn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="appointmentDate">
                    Ngày khám <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="appointmentDate"
                    required
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => handleChange('appointmentDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="shift">
                    Ca khám <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.shift}
                    onValueChange={(value) => handleChange('shift', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn ca khám" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableShifts.length === 0 ? (
                        <SelectItem value="" disabled>
                          Không còn ca khám khả dụng
                        </SelectItem>
                      ) : (
                        availableShifts.map((shift) => (
                          <SelectItem key={shift} value={shift}>
                            {getShiftLabel(shift)}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {formData.appointmentDate && availableShifts.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">
                      Không còn ca khám khả dụng cho ngày này. Vui lòng chọn ngày khác.
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="specialty">Chuyên khoa (tùy chọn)</Label>
                  <Select
                    value={formData.specialty}
                    onValueChange={(value) => {
                      handleChange('specialty', value);
                      handleChange('doctor', ''); // Reset doctor selection
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chuyên khoa" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALTIES.map((spec) => (
                        <SelectItem key={spec.value} value={spec.value}>
                          {spec.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="doctor">Bác sĩ (tùy chọn)</Label>
                  <Select
                    value={formData.doctor}
                    onValueChange={(value) => handleChange('doctor', value)}
                    disabled={filteredDoctors.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn bác sĩ" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.specialty && filteredDoctors.length === 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Không có bác sĩ nào thuộc chuyên khoa này
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reason */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lý do khám</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reason">
                  Triệu chứng / Lý do <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="reason"
                  required
                  value={formData.reason}
                  onChange={(e) => handleChange('reason', e.target.value)}
                  placeholder="Mô tả triệu chứng hoặc lý do khám bệnh..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="notes">Ghi chú thêm (tùy chọn)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Các thông tin bổ sung như dị ứng, tiền sử bệnh..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Info Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Lưu ý:</strong> Bạn có thể đặt lịch cho ngày hôm nay nếu ca khám chưa bắt đầu.
              Hệ thống sẽ tự động kiểm tra và chỉ hiển thị các ca khám còn khả dụng.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => onNavigate('dashboard')}>
                  Hủy
                </Button>
                <Button type="submit">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Xác nhận đặt lịch
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
              Đặt lịch thành công!
            </DialogTitle>
            <DialogDescription>
              Lịch hẹn của bạn đã được xác nhận
            </DialogDescription>
          </DialogHeader>

          {bookingResult && (
            <div className="space-y-4">
              {/* Booking ID */}
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Mã đặt chỗ của bạn</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold font-mono break-all">{bookingResult.bookingId}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyBookingId}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Vui lòng lưu lại mã này để tra cứu và check-in
                </p>
              </div>

              {/* Appointment Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bệnh nhân:</span>
                  <span className="font-medium">{formData.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số điện thoại:</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ngày khám:</span>
                  <span className="font-medium">
                    {new Date(formData.appointmentDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ca khám:</span>
                  <Badge variant="outline">{getShiftLabel(formData.shift)}</Badge>
                </div>
                {formData.doctor && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bác sĩ:</span>
                    <span className="font-medium">
                      {doctors.find((d) => d.id === formData.doctor)?.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>Các bước tiếp theo:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Đến phòng khám đúng ngày và ca đã đặt</li>
                    <li>Mang theo mã đặt chỗ hoặc số điện thoại để check-in</li>
                    <li>Bạn sẽ nhận được thông báo nhắc lịch trước 24 giờ</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleCloseSuccess} className="w-full">
              Hoàn tất
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
