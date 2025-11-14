import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Calendar, Clock, MapPin, Plus, Trash2, AlertCircle } from 'lucide-react';
import { DoctorSchedule, ShiftType, SHIFTS } from '../types';

interface DoctorScheduleScreenProps {
  onNavigate?: (screen: string) => void;
}

export function DoctorScheduleScreen({ onNavigate }: DoctorScheduleScreenProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    title: '',
    description: '',
    type: 'success' as 'success' | 'error' | 'info'
  });

  // Form state for adding new schedule
  const [newSchedule, setNewSchedule] = useState({
    date: new Date().toISOString().split('T')[0],
    shift: 'morning' as ShiftType,
    roomNumber: 'P101',
  });

  // Form state for leave request
  const [leaveRequest, setLeaveRequest] = useState({
    date: new Date().toISOString().split('T')[0],
    shift: 'morning' as ShiftType,
    reason: '',
  });

  // Mock data - Danh sách lịch làm việc
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([
    {
      id: '1',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-13',
      shift: 'morning',
      roomNumber: 'P101',
      maxPatients: 12,
      currentPatients: 5,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '2',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-13',
      shift: 'afternoon',
      roomNumber: 'P101',
      maxPatients: 12,
      currentPatients: 8,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '3',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-14',
      shift: 'morning',
      roomNumber: 'P102',
      maxPatients: 12,
      currentPatients: 12,
      status: 'full',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '4',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-14',
      shift: 'afternoon',
      roomNumber: 'P102',
      maxPatients: 12,
      currentPatients: 7,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '5',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-15',
      shift: 'morning',
      roomNumber: 'P103',
      maxPatients: 12,
      currentPatients: 3,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '6',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-15',
      shift: 'evening',
      roomNumber: 'P103',
      maxPatients: 10,
      currentPatients: 3,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '7',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-16',
      shift: 'morning',
      roomNumber: 'P101',
      maxPatients: 12,
      currentPatients: 0,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '8',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-16',
      shift: 'afternoon',
      roomNumber: 'P101',
      maxPatients: 12,
      currentPatients: 4,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '9',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-17',
      shift: 'morning',
      roomNumber: 'P102',
      maxPatients: 12,
      currentPatients: 6,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '10',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-17',
      shift: 'afternoon',
      roomNumber: 'P102',
      maxPatients: 12,
      currentPatients: 9,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '11',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-18',
      shift: 'morning',
      roomNumber: 'P103',
      maxPatients: 12,
      currentPatients: 2,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
    {
      id: '12',
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: '2025-11-18',
      shift: 'evening',
      roomNumber: 'P103',
      maxPatients: 10,
      currentPatients: 5,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
  ]);

  const handleAddSchedule = () => {
    // Hiển thị thông báo phê duyệt
    setNotificationMessage({
      title: 'Yêu cầu đã được gửi!',
      description: 'Yêu cầu thêm lịch làm việc đã được gửi đến Giám đốc phòng khám. Bạn sẽ nhận được thông báo qua email khi yêu cầu được xét duyệt.',
      type: 'success'
    });
    setShowNotification(true);

    // Trong thực tế, yêu cầu sẽ được gửi đến Manager để phê duyệt
    // và chỉ được thêm vào lịch sau khi được phê duyệt

    setShowAddDialog(false);
    setNewSchedule({
      date: new Date().toISOString().split('T')[0],
      shift: 'morning',
      roomNumber: 'P101',
    });
  };

  const handleDeleteSchedule = (id: string) => {
    // Hiển thị thông báo phê duyệt
    setNotificationMessage({
      title: 'Yêu cầu xóa ca làm việc',
      description: 'Yêu cầu xóa ca làm việc đã được gửi đến Giám đốc phòng khám. Bạn cần đợi sự phê duyệt trước khi ca làm việc được xóa khỏi hệ thống.',
      type: 'info'
    });
    setShowNotification(true);

    // Trong thực tế, yêu cầu xóa sẽ được gửi đến Manager để phê duyệt
    // và chỉ được xóa sau khi được phê duyệt
  };

  const handleLeaveRequest = () => {
    if (!leaveRequest.reason.trim()) {
      setNotificationMessage({
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập lý do nghỉ trước khi gửi yêu cầu.',
        type: 'error'
      });
      setShowNotification(true);
      return;
    }

    // In real app, send to admin for approval
    setNotificationMessage({
      title: 'Đã gửi yêu cầu nghỉ phép',
      description: `Yêu cầu nghỉ ngày ${new Date(leaveRequest.date).toLocaleDateString('vi-VN')} - Ca ${getShiftLabel(leaveRequest.shift)} đã được gửi. Lý do: ${leaveRequest.reason}`,
      type: 'success'
    });
    setShowNotification(true);

    setShowLeaveDialog(false);
    setLeaveRequest({
      date: new Date().toISOString().split('T')[0],
      shift: 'morning',
      reason: '',
    });
  };

  const getShiftLabel = (shift: ShiftType) => {
    const shiftData = SHIFTS[shift];
    return `${shift === 'morning' ? 'Sáng' : shift === 'afternoon' ? 'Chiều' : 'Tối'} (${shiftData.startTime}-${shiftData.endTime})`;
  };

  const getStatusBadge = (schedule: DoctorSchedule) => {
    if (schedule.status === 'full') {
      return <Badge variant="secondary" className="bg-red-100 text-red-800">Đầy</Badge>;
    }
    if (schedule.status === 'cancelled') {
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Đã hủy</Badge>;
    }
    return <Badge variant="secondary" className="bg-green-100 text-green-800">Còn chỗ</Badge>;
  };

  // Filter schedules by date
  const filteredSchedules = schedules.filter((s) => {
    if (selectedDate) {
      return s.date === selectedDate;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Quản lý lịch làm việc
                </CardTitle>
                <CardDescription>
                  Mỗi ca làm việc kéo dài 4 giờ • Tối đa 12 bệnh nhân/ca
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowLeaveDialog(true)}>
                  Đăng ký nghỉ
                </Button>
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm ca làm việc
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Date Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Label htmlFor="date-filter">Lọc theo ngày:</Label>
              <Input
                id="date-filter"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="max-w-xs"
              />
              <Button variant="outline" onClick={() => setSelectedDate('')}>
                Xem tất cả
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule List */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate
                ? `Lịch làm việc ngày ${new Date(selectedDate).toLocaleDateString('vi-VN')}`
                : 'Tất cả lịch làm việc'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredSchedules.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Không có lịch làm việc</p>
                </div>
              ) : (
                filteredSchedules.map((schedule) => (
                  <Card key={schedule.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left: Schedule Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-2xl font-bold text-primary">
                              {getShiftLabel(schedule.shift)}
                            </div>
                            {getStatusBadge(schedule)}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Ngày:</span>
                              <span className="font-medium">
                                {new Date(schedule.date).toLocaleDateString('vi-VN')}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Giờ:</span>
                              <span className="font-medium">
                                {SHIFTS[schedule.shift].startTime} - {SHIFTS[schedule.shift].endTime}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Phòng:</span>
                              <span className="font-medium">{schedule.roomNumber}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Bệnh nhân:</span>
                              <span className="font-medium">
                                {schedule.currentPatients}/{schedule.maxPatients}
                              </span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    schedule.status === 'full' ? 'bg-red-500' : 'bg-green-500'
                                  }`}
                                  style={{
                                    width: `${(schedule.currentPatients / schedule.maxPatients) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-medium text-blue-900">Hướng dẫn quản lý lịch làm việc:</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• <strong>Mỗi ca:</strong> Kéo dài 4 giờ (Sáng 8h-12h, Chiều 13h-17h, Tối 18h-22h)</li>
                  <li>• <strong>Số bệnh nhân:</strong> Tối đa 12 bệnh nhân/ca</li>
                  <li>• <strong>Đăng ký ca:</strong> Chọn ngày, ca, phòng khám → Hệ thống kiểm tra trùng lặp</li>
                  <li>• <strong>Đăng ký nghỉ:</strong> Gửi yêu cầu đến Admin để phê duyệt</li>
                  <li>• <strong>Xóa ca:</strong> Chỉ xóa được ca chưa có bệnh nhân đăng ký</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Schedule Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm ca làm việc mới</DialogTitle>
            <DialogDescription>
              Đăng ký ca làm việc cho ngày và giờ cụ thể
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="new-date">Ngày làm việc</Label>
              <Input
                id="new-date"
                type="date"
                value={newSchedule.date}
                onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <Label htmlFor="new-shift">Ca làm việc</Label>
              <Select
                value={newSchedule.shift}
                onValueChange={(value) => setNewSchedule({ ...newSchedule, shift: value as ShiftType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Sáng (8h-12h)</SelectItem>
                  <SelectItem value="afternoon">Chiều (13h-17h)</SelectItem>
                  <SelectItem value="evening">Tối (18h-22h)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="new-room">Phòng khám</Label>
              <Select
                value={newSchedule.roomNumber}
                onValueChange={(value) => setNewSchedule({ ...newSchedule, roomNumber: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P101">Phòng 101</SelectItem>
                  <SelectItem value="P102">Phòng 102</SelectItem>
                  <SelectItem value="P103">Phòng 103</SelectItem>
                  <SelectItem value="P104">Phòng 104</SelectItem>
                  <SelectItem value="P105">Phòng 105</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddSchedule}>
              Thêm ca làm việc
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Leave Request Dialog */}
      <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đăng ký nghỉ</DialogTitle>
            <DialogDescription>
              Gửi yêu cầu nghỉ làm đến Admin để phê duyệt
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="leave-date">Ngày nghỉ</Label>
              <Input
                id="leave-date"
                type="date"
                value={leaveRequest.date}
                onChange={(e) => setLeaveRequest({ ...leaveRequest, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <Label htmlFor="leave-shift">Ca nghỉ</Label>
              <Select
                value={leaveRequest.shift}
                onValueChange={(value) => setLeaveRequest({ ...leaveRequest, shift: value as ShiftType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Sáng (8h-12h)</SelectItem>
                  <SelectItem value="afternoon">Chiều (13h-17h)</SelectItem>
                  <SelectItem value="evening">Tối (18h-22h)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="leave-reason">Lý do nghỉ *</Label>
              <Textarea
                id="leave-reason"
                placeholder="Nhập lý do nghỉ..."
                value={leaveRequest.reason}
                onChange={(e) => setLeaveRequest({ ...leaveRequest, reason: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLeaveDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleLeaveRequest}>
              Gửi yêu cầu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification Dialog */}
      <Dialog open={showNotification} onOpenChange={setShowNotification}>
        <DialogContent className="max-w-[280px]">
          <div className="flex items-start gap-3">
            {notificationMessage.type === 'success' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {notificationMessage.type === 'error' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 flex-shrink-0">
                <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            {notificationMessage.type === 'info' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
            <div className="flex-1 space-y-2">
              <h3 className={`text-sm font-semibold ${
                notificationMessage.type === 'success' ? 'text-green-900' :
                notificationMessage.type === 'error' ? 'text-red-900' :
                'text-blue-900'
              }`}>
                {notificationMessage.title}
              </h3>
              <p className="text-sm text-gray-600">
                {notificationMessage.description}
              </p>
              <Button
                size="sm"
                onClick={() => setShowNotification(false)}
                className={`w-full mt-3 ${
                  notificationMessage.type === 'success' ? 'bg-green-600 hover:bg-green-700' :
                  notificationMessage.type === 'error' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Đã hiểu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
