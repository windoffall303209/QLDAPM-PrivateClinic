import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileText, Download, Calendar, Filter, User, Clock, MapPin, FileSpreadsheet } from 'lucide-react';

interface ActivityLog {
  id: string;
  timestamp: string;
  action: 'check_in' | 'issue_number' | 'call_patient' | 'cancel' | 'complete';
  patientName: string;
  patientId: string;
  queueNumber?: string;
  roomNumber?: string;
  doctorName?: string;
  receptionistName: string;
  receptionistId: string;
  notes?: string;
}

interface ActivityLogScreenProps {
  onBack: () => void;
}

export function ActivityLogScreen({ onBack }: ActivityLogScreenProps) {
  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [filterReceptionist, setFilterReceptionist] = useState<string>('all');
  const [filterDoctor, setFilterDoctor] = useState<string>('all');
  const [filterRoom, setFilterRoom] = useState<string>('all');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [reportPeriod, setReportPeriod] = useState<'day' | 'week' | 'month'>('day');

  // Mock data - Nhật ký hoạt động
  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      timestamp: '2025-11-13T08:05:30Z',
      action: 'check_in',
      patientName: 'Nguyễn Văn An',
      patientId: 'PT001',
      queueNumber: 'P101-001',
      roomNumber: 'P101',
      doctorName: 'BS. Trần Thị Mai',
      receptionistName: 'Lễ tân Hoa',
      receptionistId: 'RT001',
    },
    {
      id: '2',
      timestamp: '2025-11-13T08:12:15Z',
      action: 'check_in',
      patientName: 'Trần Thị Bình',
      patientId: 'PT002',
      queueNumber: 'P101-002',
      roomNumber: 'P101',
      doctorName: 'BS. Trần Thị Mai',
      receptionistName: 'Lễ tân Hoa',
      receptionistId: 'RT001',
    },
    {
      id: '3',
      timestamp: '2025-11-13T08:15:00Z',
      action: 'call_patient',
      patientName: 'Nguyễn Văn An',
      patientId: 'PT001',
      queueNumber: 'P101-001',
      roomNumber: 'P101',
      doctorName: 'BS. Trần Thị Mai',
      receptionistName: 'Lễ tân Hoa',
      receptionistId: 'RT001',
    },
    {
      id: '4',
      timestamp: '2025-11-13T08:20:00Z',
      action: 'check_in',
      patientName: 'Lê Văn Cường',
      patientId: 'PT003',
      queueNumber: 'P102-001',
      roomNumber: 'P102',
      doctorName: 'BS. Nguyễn Văn Đức',
      receptionistName: 'Lễ tân Lan',
      receptionistId: 'RT002',
    },
    {
      id: '5',
      timestamp: '2025-11-13T08:45:00Z',
      action: 'complete',
      patientName: 'Nguyễn Văn An',
      patientId: 'PT001',
      queueNumber: 'P101-001',
      roomNumber: 'P101',
      doctorName: 'BS. Trần Thị Mai',
      receptionistName: 'Lễ tân Hoa',
      receptionistId: 'RT001',
    },
    {
      id: '6',
      timestamp: '2025-11-13T09:00:00Z',
      action: 'cancel',
      patientName: 'Phạm Thị Dung',
      patientId: 'PT004',
      roomNumber: 'P101',
      doctorName: 'BS. Trần Thị Mai',
      receptionistName: 'Lễ tân Hoa',
      receptionistId: 'RT001',
      notes: 'Bệnh nhân hủy lịch hẹn',
    },
  ];

  const getActionBadge = (action: ActivityLog['action']) => {
    switch (action) {
      case 'check_in':
        return <Badge className="bg-blue-500">Check-in</Badge>;
      case 'issue_number':
        return <Badge className="bg-purple-500">Cấp số</Badge>;
      case 'call_patient':
        return <Badge className="bg-green-500">Gọi khám</Badge>;
      case 'complete':
        return <Badge className="bg-gray-500">Hoàn thành</Badge>;
      case 'cancel':
        return <Badge variant="destructive">Hủy</Badge>;
      default:
        return <Badge variant="secondary">{action}</Badge>;
    }
  };

  const getActionLabel = (action: ActivityLog['action']) => {
    switch (action) {
      case 'check_in':
        return 'Check-in';
      case 'issue_number':
        return 'Cấp số thứ tự';
      case 'call_patient':
        return 'Gọi khám';
      case 'complete':
        return 'Hoàn thành khám';
      case 'cancel':
        return 'Hủy lịch hẹn';
      default:
        return action;
    }
  };

  const filteredLogs = activityLogs.filter((log) => {
    const logDate = new Date(log.timestamp).toISOString().split('T')[0];
    const matchesDate = filterDate === '' || logDate === filterDate;
    const matchesReceptionist = filterReceptionist === 'all' || log.receptionistId === filterReceptionist;
    const matchesDoctor = filterDoctor === 'all' || log.doctorName?.includes(filterDoctor);
    const matchesRoom = filterRoom === 'all' || log.roomNumber === filterRoom;
    const matchesAction = filterAction === 'all' || log.action === filterAction;

    return matchesDate && matchesReceptionist && matchesDoctor && matchesRoom && matchesAction;
  });

  const handleExportExcel = () => {
    alert('Đang xuất báo cáo Excel...\nChức năng sẽ được triển khai với thư viện xlsx');
  };

  const handleExportPDF = () => {
    alert('Đang xuất báo cáo PDF...\nChức năng sẽ được triển khai với thư viện jsPDF');
  };

  const getReportSummary = () => {
    const checkIns = filteredLogs.filter(l => l.action === 'check_in').length;
    const calls = filteredLogs.filter(l => l.action === 'call_patient').length;
    const completes = filteredLogs.filter(l => l.action === 'complete').length;
    const cancels = filteredLogs.filter(l => l.action === 'cancel').length;

    return { checkIns, calls, completes, cancels };
  };

  const summary = getReportSummary();

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
                  Nhật ký hoạt động
                </CardTitle>
                <CardDescription>
                  Lưu toàn bộ lịch sử check-in, cấp số, gọi lượt, hủy (log không sửa/xóa)
                </CardDescription>
              </div>
              <Button variant="outline" onClick={onBack}>
                Quay lại
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Summary Card - Single Row */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-around items-center gap-4">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-blue-600">{summary.checkIns}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Check-in</p>
              </div>
              <div className="text-center border-l pl-4">
                <p className="text-2xl md:text-3xl font-bold text-green-600">{summary.calls}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Gọi khám</p>
              </div>
              <div className="text-center border-l pl-4">
                <p className="text-2xl md:text-3xl font-bold text-gray-600">{summary.completes}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Hoàn thành</p>
              </div>
              <div className="text-center border-l pl-4">
                <p className="text-2xl md:text-3xl font-bold text-red-600">{summary.cancels}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Hủy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Bộ lọc và báo cáo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Date Filter */}
              <div>
                <Label htmlFor="date-filter">Ngày</Label>
                <Input
                  id="date-filter"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>

              {/* Receptionist Filter */}
              <div>
                <Label htmlFor="receptionist-filter">Lễ tân</Label>
                <Select value={filterReceptionist} onValueChange={setFilterReceptionist}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="RT001">Lễ tân Hoa</SelectItem>
                    <SelectItem value="RT002">Lễ tân Lan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Doctor Filter */}
              <div>
                <Label htmlFor="doctor-filter">Bác sĩ</Label>
                <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Mai">BS. Trần Thị Mai</SelectItem>
                    <SelectItem value="Đức">BS. Nguyễn Văn Đức</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Room Filter */}
              <div>
                <Label htmlFor="room-filter">Phòng</Label>
                <Select value={filterRoom} onValueChange={setFilterRoom}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="P101">Phòng 101</SelectItem>
                    <SelectItem value="P102">Phòng 102</SelectItem>
                    <SelectItem value="P103">Phòng 103</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Filter */}
              <div>
                <Label htmlFor="action-filter">Hành động</Label>
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="check_in">Check-in</SelectItem>
                    <SelectItem value="call_patient">Gọi khám</SelectItem>
                    <SelectItem value="complete">Hoàn thành</SelectItem>
                    <SelectItem value="cancel">Hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Report Period & Export */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Label>Báo cáo theo:</Label>
                <div className="flex gap-2">
                  <Button
                    variant={reportPeriod === 'day' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setReportPeriod('day')}
                  >
                    Ngày
                  </Button>
                  <Button
                    variant={reportPeriod === 'week' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setReportPeriod('week')}
                  >
                    Tuần
                  </Button>
                  <Button
                    variant={reportPeriod === 'month' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setReportPeriod('month')}
                  >
                    Tháng
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleExportExcel} variant="outline" size="sm">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Xuất Excel
                </Button>
                <Button onClick={handleExportPDF} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Xuất PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử hoạt động ({filteredLogs.length} bản ghi)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium">Thời gian</th>
                    <th className="text-left p-3 text-sm font-medium">Hành động</th>
                    <th className="text-left p-3 text-sm font-medium">Bệnh nhân</th>
                    <th className="text-left p-3 text-sm font-medium">Số thứ tự</th>
                    <th className="text-left p-3 text-sm font-medium">Phòng</th>
                    <th className="text-left p-3 text-sm font-medium">Bác sĩ</th>
                    <th className="text-left p-3 text-sm font-medium">Lễ tân</th>
                    <th className="text-left p-3 text-sm font-medium">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Không có dữ liệu nhật ký</p>
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {new Date(log.timestamp).toLocaleString('vi-VN')}
                          </div>
                        </td>
                        <td className="p-3 text-sm">{getActionBadge(log.action)}</td>
                        <td className="p-3 text-sm">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{log.patientName}</div>
                              <div className="text-xs text-muted-foreground">{log.patientId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-sm font-mono font-medium">{log.queueNumber || '-'}</td>
                        <td className="p-3 text-sm">
                          {log.roomNumber && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              {log.roomNumber}
                            </div>
                          )}
                          {!log.roomNumber && '-'}
                        </td>
                        <td className="p-3 text-sm">{log.doctorName || '-'}</td>
                        <td className="p-3 text-sm text-muted-foreground">{log.receptionistName}</td>
                        <td className="p-3 text-sm text-muted-foreground">{log.notes || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-medium text-blue-900">Thông tin về nhật ký:</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• <strong>Lưu trữ:</strong> Tất cả hoạt động được lưu vĩnh viễn, không thể sửa/xóa</li>
                  <li>• <strong>Bộ lọc:</strong> Lọc theo ngày, lễ tân, bác sĩ, phòng khám, loại hành động</li>
                  <li>• <strong>Báo cáo:</strong> Xem báo cáo theo ngày/tuần/tháng</li>
                  <li>• <strong>Xuất dữ liệu:</strong> Xuất báo cáo dạng Excel hoặc PDF</li>
                  <li>• <strong>Mục đích:</strong> Theo dõi, kiểm tra và báo cáo hoạt động của phòng khám</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
