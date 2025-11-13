import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileText, Search, Filter, Download, Calendar, User, Clock, Activity } from 'lucide-react';
import { SystemLog } from '../types';

interface SystemLogScreenProps {
  onBack: () => void;
}

export function SystemLogScreen({ onBack }: SystemLogScreenProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock data - System logs
  const systemLogs: SystemLog[] = [
    {
      id: '1',
      type: 'check_in',
      userId: 'RT001',
      userName: 'Lễ tân Nguyễn Thị Mai',
      userRole: 'receptionist',
      action: 'Check-in bệnh nhân',
      details: {
        patientName: 'Nguyễn Văn An',
        patientPhone: '0901234567',
        queueNumber: 'P1-AM-005',
        bookingId: 'BK2025111301',
      },
      timestamp: '2025-11-13T08:05:00Z',
    },
    {
      id: '2',
      type: 'queue_issued',
      userId: 'RT001',
      userName: 'Lễ tân Nguyễn Thị Mai',
      userRole: 'receptionist',
      action: 'Cấp số thứ tự',
      details: {
        patientName: 'Lê Thị Bình',
        queueNumber: 'G-012',
        source: 'walk_in',
      },
      timestamp: '2025-11-13T08:15:00Z',
    },
    {
      id: '3',
      type: 'patient_called',
      userId: 'DR001',
      userName: 'BS. Trần Văn Cường',
      userRole: 'doctor',
      action: 'Gọi khám bệnh nhân',
      details: {
        patientName: 'Nguyễn Văn An',
        queueNumber: 'P1-AM-005',
        roomNumber: 'P101',
      },
      timestamp: '2025-11-13T08:30:00Z',
    },
    {
      id: '4',
      type: 'payment',
      userId: 'RT002',
      userName: 'Lễ tân Lê Thị Dung',
      userRole: 'receptionist',
      action: 'Xử lý thanh toán',
      details: {
        patientName: 'Trần Văn Cường',
        invoiceNumber: 'INV-2025111303',
        amount: 380000,
        method: 'momo',
      },
      timestamp: '2025-11-13T09:00:00Z',
    },
    {
      id: '5',
      type: 'appointment_cancelled',
      userId: 'PT002',
      userName: 'Phạm Thị Em',
      userRole: 'patient',
      action: 'Hủy lịch hẹn',
      details: {
        bookingId: 'BK2025111305',
        appointmentDate: '2025-11-15',
        shift: 'afternoon',
        reason: 'Bận việc đột xuất',
      },
      timestamp: '2025-11-13T09:30:00Z',
    },
    {
      id: '6',
      type: 'check_in',
      userId: 'RT001',
      userName: 'Lễ tân Nguyễn Thị Mai',
      userRole: 'receptionist',
      action: 'Check-in bệnh nhân',
      details: {
        patientName: 'Hoàng Văn Giang',
        patientPhone: '0934567890',
        queueNumber: 'P2-AM-003',
        bookingId: 'BK2025111307',
      },
      timestamp: '2025-11-13T10:00:00Z',
    },
  ];

  // Filter logs
  const filteredLogs = systemLogs.filter((log) => {
    // Filter by type
    if (filterType !== 'all' && log.type !== filterType) {
      return false;
    }

    // Filter by date
    if (filterDate) {
      const logDate = new Date(log.timestamp).toISOString().split('T')[0];
      if (logDate !== filterDate) {
        return false;
      }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        log.userName.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        JSON.stringify(log.details).toLowerCase().includes(query)
      );
    }

    return true;
  });

  const getLogTypeBadge = (type: SystemLog['type']) => {
    switch (type) {
      case 'check_in':
        return <Badge className="bg-blue-500">Check-in</Badge>;
      case 'queue_issued':
        return <Badge className="bg-purple-500">Cấp số</Badge>;
      case 'patient_called':
        return <Badge className="bg-green-500">Gọi khám</Badge>;
      case 'appointment_cancelled':
        return <Badge variant="destructive">Hủy lịch</Badge>;
      case 'payment':
        return <Badge className="bg-yellow-600">Thanh toán</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getRoleBadge = (role: SystemLog['userRole']) => {
    switch (role) {
      case 'patient':
        return <Badge variant="outline">Bệnh nhân</Badge>;
      case 'doctor':
        return <Badge variant="outline">Bác sĩ</Badge>;
      case 'receptionist':
        return <Badge variant="outline">Lễ tân</Badge>;
      case 'manager':
        return <Badge variant="outline">Quản lý</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const handleExport = () => {
    // Simulate export
    alert(`Xuất ${filteredLogs.length} bản ghi thành công!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Nhật ký hệ thống
                </CardTitle>
                <CardDescription>
                  Theo dõi tất cả hoạt động trong hệ thống
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Xuất Excel
                </Button>
                <Button variant="outline" onClick={onBack}>
                  Quay lại
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="filter-type">Loại hoạt động</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="check_in">Check-in</SelectItem>
                    <SelectItem value="queue_issued">Cấp số</SelectItem>
                    <SelectItem value="patient_called">Gọi khám</SelectItem>
                    <SelectItem value="payment">Thanh toán</SelectItem>
                    <SelectItem value="appointment_cancelled">Hủy lịch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="filter-date">Ngày</Label>
                <Input
                  id="filter-date"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="search">Tìm kiếm</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Tìm theo tên, hành động..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Tổng số</p>
                <p className="text-2xl font-bold">{filteredLogs.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredLogs.filter((l) => l.type === 'check_in').length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Cấp số</p>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredLogs.filter((l) => l.type === 'queue_issued').length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Gọi khám</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredLogs.filter((l) => l.type === 'patient_called').length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Thanh toán</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {filteredLogs.filter((l) => l.type === 'payment').length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Danh sách nhật ký ({filteredLogs.length} bản ghi)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Không có bản ghi nào</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <Card key={log.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left: Log Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getLogTypeBadge(log.type)}
                            {getRoleBadge(log.userRole)}
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(log.timestamp).toLocaleString('vi-VN')}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{log.userName}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Activity className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{log.action}</span>
                            </div>

                            {/* Details */}
                            <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                              <p className="font-medium mb-2">Chi tiết:</p>
                              {Object.entries(log.details).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-muted-foreground capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                                  </span>
                                  <span className="font-medium">
                                    {typeof value === 'number'
                                      ? value.toLocaleString('vi-VN') + (key === 'amount' ? ' đ' : '')
                                      : value
                                    }
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
