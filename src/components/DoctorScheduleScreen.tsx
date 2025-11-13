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
      date: '2025-11-15',
      shift: 'evening',
      roomNumber: 'P103',
      maxPatients: 10,
      currentPatients: 3,
      status: 'available',
      createdAt: '2025-11-01T10:00:00Z',
    },
  ]);

  const handleAddSchedule = () => {
    // Kiểm tra trùng lặp
    const duplicate = schedules.find(
      (s) =>
        s.date === newSchedule.date &&
        s.shift === newSchedule.shift &&
        s.doctorId === 'DR001'
    );

    if (duplicate) {
      alert('Bạn đã có lịch làm việc vào ca này rồi!');
      return;
    }

    const schedule: DoctorSchedule = {
      id: Date.now().toString(),
      doctorId: 'DR001',
      doctorName: 'BS. Nguyễn Văn An',
      date: newSchedule.date,
      shift: newSchedule.shift,
      roomNumber: newSchedule.roomNumber,
      maxPatients: 12,
      currentPatients: 0,
      status: 'available',
      createdAt: new Date().toISOString(),
    };

    setSchedules([...schedules, schedule]);
    setShowAddDialog(false);
    setNewSchedule({
      date: new Date().toISOString().split('T')[0],
      shift: 'morning',
      roomNumber: 'P101',
    });
  };

  const handleDeleteSchedule = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa ca làm việc này?')) {
      setSchedules(schedules.filter((s) => s.id !== id));
    }
  };

  const handleLeaveRequest = () => {
    if (!leaveRequest.reason.trim()) {
      alert('Vui lòng nhập lý do nghỉ');
      return;
    }

    // In real app, send to admin for approval
    alert(`Đã gửi yêu cầu nghỉ ngày ${new Date(leaveRequest.date).toLocaleDateString('vi-VN')} - Ca ${getShiftLabel(leaveRequest.shift)}\nLý do: ${leaveRequest.reason}`);
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

                          <div className="grid grid-cols-2 gap-4 text-sm">
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
    </div>
  );
}
