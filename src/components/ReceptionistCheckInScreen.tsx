import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Search, UserPlus, CheckCircle, Clock, Calendar, User, Phone, Hash } from 'lucide-react';
import { Appointment } from '../types';

interface ReceptionistCheckInScreenProps {
  onNavigateToCreateProfile: () => void;
  onCheckInComplete: (appointment: Appointment, queueNumber: string) => void;
}

export function ReceptionistCheckInScreen({
  onNavigateToCreateProfile,
  onCheckInComplete
}: ReceptionistCheckInScreenProps) {
  const [searchType, setSearchType] = useState<'phone' | 'booking_id'>('phone');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Appointment | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Mock data - Danh sách lịch hẹn
  const mockAppointments: Appointment[] = [
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
      status: 'pending',
      source: 'online',
      createdAt: '2025-11-12T10:00:00Z',
      updatedAt: '2025-11-12T10:00:00Z',
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
      status: 'pending',
      source: 'online',
      createdAt: '2025-11-12T14:30:00Z',
      updatedAt: '2025-11-12T14:30:00Z',
    },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }

    // Tìm kiếm trong mock data
    const result = mockAppointments.find((apt) => {
      if (searchType === 'phone') {
        return apt.patientPhone.includes(searchQuery);
      } else {
        return apt.bookingId.toLowerCase() === searchQuery.toLowerCase();
      }
    });

    setSearchResult(result || null);
    setShowResult(true);
  };

  const handleCheckIn = () => {
    if (!searchResult) return;

    // Sinh số thứ tự
    let queueNumber = '';

    if (searchResult.roomNumber && searchResult.shift) {
      // Cấp số theo phòng (đã biết phòng/ca)
      const shiftCode = searchResult.shift === 'morning' ? 'AM' : searchResult.shift === 'afternoon' ? 'PM' : 'EV';
      const roomCode = searchResult.roomNumber.replace('P', '');
      queueNumber = `P${roomCode}-${shiftCode}-${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`;
    } else {
      // Cấp số chung (chưa biết phòng)
      queueNumber = `G-${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`;
    }

    // Cập nhật trạng thái
    const updatedAppointment: Appointment = {
      ...searchResult,
      status: 'checked_in',
      queueNumber: queueNumber,
      queueNumberType: searchResult.roomNumber ? 'room' : 'general',
      checkedInAt: new Date().toISOString(),
    };

    onCheckInComplete(updatedAppointment, queueNumber);
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-6 w-6" />
              Tra cứu và Check-in bệnh nhân
            </CardTitle>
            <CardDescription>
              Tra cứu thông tin đăng ký bằng số điện thoại hoặc mã đặt chỗ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Type Selector */}
            <div className="flex gap-2">
              <Button
                variant={searchType === 'phone' ? 'default' : 'outline'}
                onClick={() => setSearchType('phone')}
                className="flex-1"
              >
                <Phone className="h-4 w-4 mr-2" />
                Số điện thoại
              </Button>
              <Button
                variant={searchType === 'booking_id' ? 'default' : 'outline'}
                onClick={() => setSearchType('booking_id')}
                className="flex-1"
              >
                <Hash className="h-4 w-4 mr-2" />
                Mã đặt chỗ
              </Button>
            </div>

            {/* Search Input */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="search">
                  {searchType === 'phone' ? 'Nhập số điện thoại' : 'Nhập mã đặt chỗ'}
                </Label>
                <Input
                  id="search"
                  placeholder={
                    searchType === 'phone'
                      ? 'VD: 0901234567'
                      : 'VD: BK2024111301'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="mt-6">
                <Search className="h-4 w-4 mr-2" />
                Tra cứu
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onNavigateToCreateProfile}
                className="flex-1"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Tạo hồ sơ mới (Walk-in)
              </Button>
            </div>

            <Separator />

            {/* Search Results */}
            {showResult && (
              <>
                {searchResult ? (
                  <Card className="border-2 border-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{searchResult.patientName}</CardTitle>
                          <CardDescription className="mt-1">
                            Ngày sinh: {new Date(searchResult.patientDateOfBirth).toLocaleDateString('vi-VN')}
                          </CardDescription>
                        </div>
                        {getSourceBadge(searchResult.source)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Patient Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{searchResult.patientPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono">{searchResult.bookingId}</span>
                        </div>
                      </div>

                      {/* Appointment Info */}
                      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {new Date(searchResult.appointmentDate).toLocaleDateString('vi-VN')}
                          </span>
                          <Badge variant="outline">{getShiftLabel(searchResult.shift)}</Badge>
                        </div>

                        {searchResult.doctorName && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{searchResult.doctorName}</span>
                            {searchResult.specialty && (
                              <Badge variant="secondary">{searchResult.specialty}</Badge>
                            )}
                          </div>
                        )}

                        {searchResult.roomNumber && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Phòng: <strong>{searchResult.roomNumber}</strong></span>
                          </div>
                        )}

                        <div>
                          <Label className="text-xs text-muted-foreground">Lý do khám:</Label>
                          <p className="text-sm mt-1">{searchResult.reason}</p>
                        </div>

                        {searchResult.notes && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                            <Label className="text-xs text-yellow-800 font-semibold">Ghi chú quan trọng:</Label>
                            <p className="text-sm text-yellow-900 mt-1">{searchResult.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <Label>Trạng thái:</Label>
                        {searchResult.status === 'pending' && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <Clock className="h-3 w-3 mr-1" />
                            Chưa check-in
                          </Badge>
                        )}
                        {searchResult.status === 'checked_in' && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Đã check-in
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      {searchResult.status === 'pending' && (
                        <Button onClick={handleCheckIn} className="w-full" size="lg">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Xác nhận Check-in và Cấp số
                        </Button>
                      )}

                      {searchResult.status === 'checked_in' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-center text-green-800 font-semibold">
                            ✓ Bệnh nhân đã check-in thành công
                          </p>
                          {searchResult.queueNumber && (
                            <p className="text-center text-2xl font-bold text-green-600 mt-2">
                              Số thứ tự: {searchResult.queueNumber}
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-2 border-dashed">
                    <CardContent className="text-center py-12">
                      <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-medium text-muted-foreground mb-2">
                        Không tìm thấy kết quả
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Không tìm thấy lịch hẹn với thông tin đã nhập
                      </p>
                      <Button
                        variant="outline"
                        onClick={onNavigateToCreateProfile}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Tạo hồ sơ mới
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Helper Card */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Hướng dẫn sử dụng</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong>• Quầy Express:</strong> Cho bệnh nhân đã đặt lịch trước (online booking)</p>
            <p><strong>• Tra cứu:</strong> Nhập SĐT hoặc mã đặt chỗ để tìm lịch hẹn</p>
            <p><strong>• Check-in:</strong> Xác nhận bệnh nhân đã đến và cấp số thứ tự</p>
            <p><strong>• Walk-in:</strong> Tạo hồ sơ mới cho bệnh nhân vãng lai (chưa đặt lịch)</p>
            <p><strong>• Số thứ tự:</strong> G-xxx (số chung), P1-AM-xxx (số theo phòng/ca)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
