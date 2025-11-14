import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Calendar, Clock, MapPin, User, CheckCircle2, XCircle, AlertCircle, Users } from 'lucide-react';

interface ScheduleRequest {
  id: string;
  type: 'add' | 'delete' | 'leave';
  staffType: 'doctor' | 'receptionist';
  staffId: string;
  staffName: string;
  date: string;
  shift?: 'morning' | 'afternoon' | 'evening';
  roomNumber?: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNote?: string;
}

interface StaffSchedule {
  id: string;
  staffType: 'doctor' | 'receptionist';
  staffId: string;
  staffName: string;
  date: string;
  shift: 'morning' | 'afternoon' | 'evening';
  roomNumber?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface ManagerScheduleScreenProps {
  onBack: () => void;
}

export function ManagerScheduleScreen({ onBack }: ManagerScheduleScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'requests' | 'schedules'>('requests');
  const [filterStatus, setFilterStatus] = useState<string>('pending');
  const [filterStaffType, setFilterStaffType] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<ScheduleRequest | null>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewNote, setReviewNote] = useState('');

  // Mock data - Yêu cầu thay đổi lịch
  const [scheduleRequests, setScheduleRequests] = useState<ScheduleRequest[]>([
    {
      id: 'REQ001',
      type: 'add',
      staffType: 'doctor',
      staffId: 'DR001',
      staffName: 'BS. Nguyễn Văn An',
      date: '2025-11-20',
      shift: 'morning',
      roomNumber: 'P101',
      status: 'pending',
      requestedAt: '2025-11-13T10:00:00Z',
    },
    {
      id: 'REQ002',
      type: 'delete',
      staffType: 'doctor',
      staffId: 'DR002',
      staffName: 'BS. Trần Thị Mai',
      date: '2025-11-18',
      shift: 'afternoon',
      roomNumber: 'P102',
      reason: 'Có việc đột xuất',
      status: 'pending',
      requestedAt: '2025-11-13T11:30:00Z',
    },
    {
      id: 'REQ003',
      type: 'leave',
      staffType: 'receptionist',
      staffId: 'RT001',
      staffName: 'Lễ tân Hoa',
      date: '2025-11-22',
      shift: 'morning',
      reason: 'Nghỉ phép',
      status: 'pending',
      requestedAt: '2025-11-13T14:00:00Z',
    },
    {
      id: 'REQ004',
      type: 'add',
      staffType: 'doctor',
      staffId: 'DR001',
      staffName: 'BS. Nguyễn Văn An',
      date: '2025-11-15',
      shift: 'evening',
      roomNumber: 'P103',
      status: 'approved',
      requestedAt: '2025-11-10T09:00:00Z',
      reviewedAt: '2025-11-10T10:00:00Z',
      reviewedBy: 'Admin',
      reviewNote: 'Đã phê duyệt',
    },
  ]);

  // Mock data - Lịch làm việc
  const staffSchedules: StaffSchedule[] = [
    {
      id: 'SCH001',
      staffType: 'doctor',
      staffId: 'DR001',
      staffName: 'BS. Nguyễn Văn An',
      date: '2025-11-13',
      shift: 'morning',
      roomNumber: 'P101',
      status: 'scheduled',
    },
    {
      id: 'SCH002',
      staffType: 'doctor',
      staffId: 'DR002',
      staffName: 'BS. Trần Thị Mai',
      date: '2025-11-13',
      shift: 'afternoon',
      roomNumber: 'P102',
      status: 'scheduled',
    },
    {
      id: 'SCH003',
      staffType: 'receptionist',
      staffId: 'RT001',
      staffName: 'Lễ tân Hoa',
      date: '2025-11-13',
      shift: 'morning',
      status: 'scheduled',
    },
    {
      id: 'SCH004',
      staffType: 'receptionist',
      staffId: 'RT002',
      staffName: 'Lễ tân Lan',
      date: '2025-11-13',
      shift: 'afternoon',
      status: 'scheduled',
    },
  ];

  const getRequestTypeBadge = (type: ScheduleRequest['type']) => {
    switch (type) {
      case 'add':
        return <Badge className="bg-green-500">Thêm ca</Badge>;
      case 'delete':
        return <Badge variant="destructive">Xóa ca</Badge>;
      case 'leave':
        return <Badge className="bg-yellow-500">Nghỉ phép</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: ScheduleRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Đã duyệt</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Từ chối</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStaffTypeBadge = (type: 'doctor' | 'receptionist') => {
    if (type === 'doctor') {
      return <Badge variant="outline" className="bg-blue-50">Bác sĩ</Badge>;
    }
    return <Badge variant="outline" className="bg-purple-50">Lễ tân</Badge>;
  };

  const getShiftLabel = (shift: string) => {
    switch (shift) {
      case 'morning':
        return 'Sáng (8h-12h)';
      case 'afternoon':
        return 'Chiều (13h-17h)';
      case 'evening':
        return 'Tối (18h-22h)';
      default:
        return shift;
    }
  };

  const handleReviewRequest = (request: ScheduleRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setShowReviewDialog(true);
  };

  const handleConfirmReview = (action: 'approve' | 'reject') => {
    if (!selectedRequest) return;

    const updatedRequest: ScheduleRequest = {
      ...selectedRequest,
      status: action === 'approve' ? 'approved' : 'rejected',
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'Admin',
      reviewNote: reviewNote || (action === 'approve' ? 'Đã phê duyệt' : 'Đã từ chối'),
    };

    setScheduleRequests((prev) =>
      prev.map((req) => (req.id === selectedRequest.id ? updatedRequest : req))
    );

    setShowReviewDialog(false);
    setReviewNote('');
    setSelectedRequest(null);
    alert(`Đã ${action === 'approve' ? 'phê duyệt' : 'từ chối'} yêu cầu!`);
  };

  const filteredRequests = scheduleRequests.filter((req) => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesStaffType = filterStaffType === 'all' || req.staffType === filterStaffType;
    return matchesStatus && matchesStaffType;
  });

  const filteredSchedules = staffSchedules.filter((sch) => {
    const matchesStaffType = filterStaffType === 'all' || sch.staffType === filterStaffType;
    return matchesStaffType;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
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
                  Phê duyệt yêu cầu và quản lý lịch làm việc của bác sĩ và lễ tân
                </CardDescription>
              </div>
              <Button variant="outline" onClick={onBack}>
                Quay lại
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as 'requests' | 'schedules')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="requests">
              Yêu cầu thay đổi ({scheduleRequests.filter(r => r.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="schedules">
              Lịch làm việc
            </TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="status-filter">Trạng thái</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="pending">Chờ duyệt</SelectItem>
                        <SelectItem value="approved">Đã duyệt</SelectItem>
                        <SelectItem value="rejected">Từ chối</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <Label htmlFor="staff-type-filter">Loại nhân viên</Label>
                    <Select value={filterStaffType} onValueChange={setFilterStaffType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="doctor">Bác sĩ</SelectItem>
                        <SelectItem value="receptionist">Lễ tân</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredRequests.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Không có yêu cầu nào</p>
                    </div>
                  ) : (
                    filteredRequests.map((request) => (
                      <Card key={request.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              {/* Header */}
                              <div className="flex items-center gap-2 flex-wrap">
                                {getRequestTypeBadge(request.type)}
                                {getStaffTypeBadge(request.staffType)}
                                {getStatusBadge(request.status)}
                              </div>

                              {/* Staff Info */}
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{request.staffName}</span>
                                <span className="text-sm text-muted-foreground">({request.staffId})</span>
                              </div>

                              {/* Schedule Info */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  <span>Ngày: {new Date(request.date).toLocaleDateString('vi-VN')}</span>
                                </div>
                                {request.shift && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span>Ca: {getShiftLabel(request.shift)}</span>
                                  </div>
                                )}
                                {request.roomNumber && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 text-muted-foreground" />
                                    <span>Phòng: {request.roomNumber}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>Yêu cầu: {new Date(request.requestedAt).toLocaleString('vi-VN')}</span>
                                </div>
                              </div>

                              {/* Reason */}
                              {request.reason && (
                                <div className="text-sm bg-yellow-50 border border-yellow-200 rounded p-2">
                                  <strong>Lý do:</strong> {request.reason}
                                </div>
                              )}

                              {/* Review Info */}
                              {request.status !== 'pending' && request.reviewedAt && (
                                <div className="text-sm bg-gray-50 rounded p-2">
                                  <p><strong>Xét duyệt bởi:</strong> {request.reviewedBy}</p>
                                  <p><strong>Thời gian:</strong> {new Date(request.reviewedAt).toLocaleString('vi-VN')}</p>
                                  {request.reviewNote && <p><strong>Ghi chú:</strong> {request.reviewNote}</p>}
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            {request.status === 'pending' && (
                              <div className="flex flex-col gap-2">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => {
                                    setSelectedRequest(request);
                                    setReviewNote('');
                                    setShowReviewDialog(true);
                                  }}
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-2" />
                                  Phê duyệt
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => {
                                    setSelectedRequest(request);
                                    setReviewNote('');
                                    setShowReviewDialog(true);
                                  }}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Từ chối
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedules Tab */}
          <TabsContent value="schedules">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Lịch làm việc hiện tại</CardTitle>
                  <Select value={filterStaffType} onValueChange={setFilterStaffType}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="doctor">Bác sĩ</SelectItem>
                      <SelectItem value="receptionist">Lễ tân</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-sm font-medium">Loại</th>
                        <th className="text-left p-3 text-sm font-medium">Nhân viên</th>
                        <th className="text-left p-3 text-sm font-medium">Ngày</th>
                        <th className="text-left p-3 text-sm font-medium">Ca</th>
                        <th className="text-left p-3 text-sm font-medium">Phòng</th>
                        <th className="text-left p-3 text-sm font-medium">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSchedules.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-muted-foreground">
                            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Không có lịch làm việc</p>
                          </td>
                        </tr>
                      ) : (
                        filteredSchedules.map((schedule) => (
                          <tr key={schedule.id} className="border-b hover:bg-muted/50">
                            <td className="p-3 text-sm">{getStaffTypeBadge(schedule.staffType)}</td>
                            <td className="p-3 text-sm">
                              <div className="font-medium">{schedule.staffName}</div>
                              <div className="text-xs text-muted-foreground">{schedule.staffId}</div>
                            </td>
                            <td className="p-3 text-sm">{new Date(schedule.date).toLocaleDateString('vi-VN')}</td>
                            <td className="p-3 text-sm">{getShiftLabel(schedule.shift)}</td>
                            <td className="p-3 text-sm">{schedule.roomNumber || '-'}</td>
                            <td className="p-3 text-sm">
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {schedule.status === 'scheduled' ? 'Đã lên lịch' : schedule.status}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xét duyệt yêu cầu</DialogTitle>
            <DialogDescription>
              {selectedRequest && `${selectedRequest.staffName} - ${selectedRequest.type === 'add' ? 'Thêm ca' : selectedRequest.type === 'delete' ? 'Xóa ca' : 'Nghỉ phép'}`}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                <p><strong>Nhân viên:</strong> {selectedRequest.staffName}</p>
                <p><strong>Ngày:</strong> {new Date(selectedRequest.date).toLocaleDateString('vi-VN')}</p>
                {selectedRequest.shift && <p><strong>Ca:</strong> {getShiftLabel(selectedRequest.shift)}</p>}
                {selectedRequest.roomNumber && <p><strong>Phòng:</strong> {selectedRequest.roomNumber}</p>}
                {selectedRequest.reason && <p><strong>Lý do:</strong> {selectedRequest.reason}</p>}
              </div>

              <div>
                <Label htmlFor="review-note">Ghi chú xét duyệt (tùy chọn)</Label>
                <Input
                  id="review-note"
                  placeholder="Nhập ghi chú..."
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={() => handleConfirmReview('reject')}>
              <XCircle className="h-4 w-4 mr-2" />
              Từ chối
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleConfirmReview('approve')}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Phê duyệt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
