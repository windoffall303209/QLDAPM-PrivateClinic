import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  Users,
  Phone as PhoneIcon,
  AlertCircle,
  Clock,
  ArrowRight,
  Volume2,
  Eye
} from 'lucide-react';
import { QueueNumber } from '../types';

interface DoctorQueueScreenProps {
  onCallPatient: (queueNumber: QueueNumber) => void;
  onPreparePatient: (queueNumber: QueueNumber) => void;
  onStartExamination: (queueNumber: QueueNumber) => void;
}

export function DoctorQueueScreen({
  onCallPatient,
  onPreparePatient,
  onStartExamination
}: DoctorQueueScreenProps) {
  const [selectedQueue, setSelectedQueue] = useState<QueueNumber | null>(null);

  // Mock data - Danh sách bệnh nhân chờ khám
  const [queueList, setQueueList] = useState<QueueNumber[]>([
    {
      id: 'Q001',
      number: 'P101-001',
      type: 'room',
      appointmentId: 'APT001',
      patientName: 'Nguyễn Văn An',
      source: 'online',
      status: 'waiting',
      roomNumber: 'P101',
      shift: 'morning',
      issuedAt: '2025-11-13T08:05:00Z',
    },
    {
      id: 'Q002',
      number: 'P101-002',
      type: 'room',
      appointmentId: 'APT002',
      patientName: 'Trần Thị Bình',
      source: 'online',
      status: 'waiting',
      roomNumber: 'P101',
      shift: 'morning',
      issuedAt: '2025-11-13T08:12:00Z',
    },
    {
      id: 'Q003',
      number: 'P101-003',
      type: 'room',
      appointmentId: 'APT003',
      patientName: 'Lê Văn Cường',
      source: 'walk_in',
      status: 'waiting',
      roomNumber: 'P101',
      shift: 'morning',
      issuedAt: '2025-11-13T08:20:00Z',
    },
    {
      id: 'Q004',
      number: 'P101-004',
      type: 'room',
      appointmentId: 'APT004',
      patientName: 'Phạm Thị Dung',
      source: 'online',
      status: 'waiting',
      roomNumber: 'P101',
      shift: 'morning',
      issuedAt: '2025-11-13T08:25:00Z',
    },
  ]);

  const handleCallPatient = (queue: QueueNumber) => {
    // Cập nhật trạng thái
    setQueueList(prev =>
      prev.map(q =>
        q.id === queue.id
          ? { ...q, status: 'called' as const, calledAt: new Date().toISOString() }
          : q
      )
    );

    // Gửi thông báo lên LCD/Loa/App
    onCallPatient({
      ...queue,
      status: 'called',
      calledAt: new Date().toISOString()
    });
  };

  const handlePreparePatient = (queue: QueueNumber) => {
    // Gọi chuẩn bị (bệnh nhân tiếp theo)
    onPreparePatient(queue);
  };

  const handleStartExamination = (queue: QueueNumber) => {
    // Bắt đầu khám
    setQueueList(prev =>
      prev.map(q =>
        q.id === queue.id
          ? { ...q, status: 'in_progress' as const }
          : q
      )
    );

    onStartExamination(queue);
  };

  const getStatusBadge = (status: QueueNumber['status']) => {
    switch (status) {
      case 'waiting':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Chờ khám</Badge>;
      case 'called':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Đã gọi</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Đang khám</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Hoàn thành</Badge>;
      case 'missed':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Bỏ lỡ</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSourceBadge = (source: 'online' | 'walk_in') => {
    if (source === 'online') {
      return <Badge className="bg-blue-500">Hẹn trước</Badge>;
    }
    return <Badge variant="outline">Vãng lai</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Queue List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Danh sách bệnh nhân chờ khám
            </CardTitle>
            <CardDescription>
              Sắp xếp theo số thứ tự tăng dần • Phòng P101 • Mã số: P101-xxx
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queueList.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Không có bệnh nhân chờ khám</p>
                </div>
              ) : (
                queueList.map((queue) => (
                  <Card
                    key={queue.id}
                    className={`transition-all ${
                      selectedQueue?.id === queue.id
                        ? 'border-2 border-primary shadow-md'
                        : queue.status === 'in_progress'
                        ? 'border-2 border-green-500'
                        : ''
                    }`}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start justify-between gap-2 sm:gap-4">
                        {/* Left: Queue Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                              {queue.number}
                            </div>
                            {getSourceBadge(queue.source)}
                            {getStatusBadge(queue.status)}
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-base sm:text-lg font-semibold">{queue.patientName}</h3>
                            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>
                                  Cấp số: {new Date(queue.issuedAt).toLocaleTimeString('vi-VN', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              {queue.calledAt && (
                                <div className="flex items-center gap-1">
                                  <Volume2 className="h-4 w-4" />
                                  <span>
                                    Đã gọi: {new Date(queue.calledAt).toLocaleTimeString('vi-VN', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex flex-col gap-2">
                          {queue.status === 'waiting' && (
                            <>
                              <Button
                                onClick={() => handleCallPatient(queue)}
                                size="sm"
                                className="whitespace-nowrap"
                              >
                                <Volume2 className="h-4 w-4 mr-2" />
                                Gọi khám
                              </Button>
                              <Button
                                onClick={() => handlePreparePatient(queue)}
                                variant="outline"
                                size="sm"
                                className="whitespace-nowrap"
                              >
                                <PhoneIcon className="h-4 w-4 mr-2" />
                                Gọi chuẩn bị
                              </Button>
                            </>
                          )}

                          {queue.status === 'called' && (
                            <>
                              <Button
                                onClick={() => handleStartExamination(queue)}
                                size="sm"
                                className="whitespace-nowrap bg-green-600 hover:bg-green-700"
                              >
                                <ArrowRight className="h-4 w-4 mr-2" />
                                Bắt đầu khám
                              </Button>
                              <Button
                                onClick={() => handleCallPatient(queue)}
                                variant="outline"
                                size="sm"
                                className="whitespace-nowrap"
                              >
                                <Volume2 className="h-4 w-4 mr-2" />
                                Gọi lại
                              </Button>
                            </>
                          )}

                          {queue.status === 'in_progress' && (
                            <Button
                              onClick={() => setSelectedQueue(queue)}
                              size="sm"
                              className="whitespace-nowrap bg-green-600 hover:bg-green-700"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Đang khám...
                            </Button>
                          )}
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
                <p className="font-medium text-blue-900">Hướng dẫn sử dụng:</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• <strong>Gọi khám:</strong> Thông báo lên LCD/Loa/App, bệnh nhân vào phòng khám</li>
                  <li>• <strong>Gọi chuẩn bị:</strong> Thông báo cho bệnh nhân tiếp theo chuẩn bị</li>
                  <li>• <strong>Bắt đầu khám:</strong> Chuyển sang màn hình khám bệnh</li>
                  <li>• <strong>Thời gian chờ:</strong> Hiển thị thời gian từ khi cấp số đến hiện tại</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
