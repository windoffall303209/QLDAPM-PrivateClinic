import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import {
  User,
  Clock,
  Activity,
  FileText,
  ArrowRight,
  Save,
  AlertCircle,
  Send,
  TestTube,
  Scan
} from 'lucide-react';

interface ExaminationScreenProps {
  onNavigate: (screen: string) => void;
}

interface PatientInQueue {
  id: string;
  queueNumber: string;
  name: string;
  age: number;
  time: string;
  reason: string;
  phone: string;
}

interface ExaminationRecord {
  id: string;
  patientId: string;
  createdAt: string;
}

export function ExaminationScreen({ onNavigate }: ExaminationScreenProps) {
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [showReferralSection, setShowReferralSection] = useState(false);

  const [examData, setExamData] = useState({
    symptoms: '',
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    diagnosis: '',
    treatment: '',
    notes: '',
  });

  const [referralData, setReferralData] = useState({
    type: '' as 'lab' | 'imaging' | 'specialist' | '',
    room: '', // Phòng sẽ chuyển đến
    notes: '',
    priority: 'normal' as 'normal' | 'urgent',
  });

  // Mock data - Danh sách phòng khám
  const mockRooms = [
    { id: 'P101', name: 'P101 - Nội khoa' },
    { id: 'P102', name: 'P102 - Tim mạch' },
    { id: 'P103', name: 'P103 - Ngoại khoa' },
    { id: 'P104', name: 'P104 - Tai mũi họng' },
    { id: 'P105', name: 'P105 - Mắt' },
    { id: 'LAB', name: 'Phòng xét nghiệm' },
    { id: 'IMG', name: 'Phòng chẩn đoán hình ảnh' },
  ];

  const waitingPatients: PatientInQueue[] = [
    {
      id: '1',
      queueNumber: 'P101-001',
      name: 'Nguyễn Văn An',
      age: 47,
      time: '08:00',
      reason: 'Khám tổng quát tim mạch',
      phone: '0901234567',
    },
    {
      id: '2',
      queueNumber: 'P101-002',
      name: 'Lê Thị Cẩm',
      age: 35,
      time: '08:30',
      reason: 'Khám tổng quát',
      phone: '0912345678',
    },
    {
      id: '3',
      queueNumber: 'P102-001',
      name: 'Phạm Minh Đức',
      age: 30,
      time: '09:00',
      reason: 'Khám sức khỏe định kỳ',
      phone: '0923456789',
    },
    {
      id: '4',
      queueNumber: 'P103-001',
      name: 'Hoàng Thị Phượng',
      age: 57,
      time: '09:30',
      reason: 'Tái khám sau phẫu thuật',
      phone: '0934567890',
    },
    {
      id: '5',
      queueNumber: 'P101-003',
      name: 'Trần Văn Hùng',
      age: 69,
      time: '10:00',
      reason: 'Kiểm tra huyết áp',
      phone: '0945678901',
    },
    {
      id: '6',
      queueNumber: 'P102-002',
      name: 'Nguyễn Thị Lan',
      age: 40,
      time: '10:30',
      reason: 'Khám da liễu',
      phone: '0956789012',
    },
  ];

  const handleChange = (field: string, value: string) => {
    setExamData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReferralChange = (field: string, value: string) => {
    setReferralData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!examData.symptoms || !examData.diagnosis) {
      alert('Vui lòng nhập đầy đủ triệu chứng và chẩn đoán!');
      return;
    }

    alert('Đã lưu thông tin khám bệnh thành công!');
    onNavigate('dashboard');
  };

  const handleReferral = () => {
    if (!referralData.type) {
      alert('Vui lòng chọn loại chuyển tuyến!');
      return;
    }

    if (!referralData.room) {
      alert('Vui lòng chọn phòng sẽ chuyển đến!');
      return;
    }

    const referralTypeLabel =
      referralData.type === 'lab' ? 'Xét nghiệm' :
      referralData.type === 'imaging' ? 'Chẩn đoán hình ảnh' :
      'Chuyên khoa';

    const selectedRoom = mockRooms.find(r => r.id === referralData.room);

    // Sinh số thứ tự cho phòng chuyển tuyến
    const referralQueueNumber = `${referralData.room}-${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`;

    alert(
      `Đã tạo phiếu chuyển tuyến nội bộ:\n\n` +
      `Loại: ${referralTypeLabel}\n` +
      `Phòng chuyển đến: ${selectedRoom?.name || referralData.room}\n` +
      `Số thứ tự: ${referralQueueNumber}\n` +
      `Ưu tiên: ${referralData.priority === 'urgent' ? 'Khẩn cấp' : 'Bình thường'}\n` +
      `Ghi chú: ${referralData.notes || 'Không có'}\n\n` +
      `Bệnh nhân sẽ nhận được thông báo và số thứ tự mới.`
    );

    setShowReferralSection(false);
    setReferralData({
      type: '',
      room: '',
      notes: '',
      priority: 'normal',
    });
  };

  const selectedPatientData = waitingPatients.find((p) => p.id === selectedPatient);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6" />
              Khám bệnh
            </CardTitle>
            <CardDescription>
              Nhập thông tin khám và điều trị cho bệnh nhân
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: Waiting Patients List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Bệnh nhân chờ khám</CardTitle>
              <CardDescription>Chọn bệnh nhân để bắt đầu khám</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {waitingPatients.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Không có bệnh nhân chờ</p>
                  </div>
                ) : (
                  waitingPatients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedPatient === patient.id
                          ? 'bg-primary/10 border-primary shadow-sm'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {patient.age} tuổi • {patient.phone}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {patient.queueNumber}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{patient.time}</span>
                      </div>
                      <div className="text-sm mt-2 text-muted-foreground">
                        {patient.reason}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right: Examination Form */}
          <div className="lg:col-span-2 space-y-4">
            {selectedPatient && selectedPatientData ? (
              <>
                {/* Patient Header */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{selectedPatientData.name}</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{selectedPatientData.age} tuổi</span>
                          <span>•</span>
                          <span>{selectedPatientData.phone}</span>
                          <span>•</span>
                          <Badge variant="outline">{selectedPatientData.queueNumber}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Symptoms & Diagnosis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Thông tin khám</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="symptoms">Triệu chứng *</Label>
                          <Textarea
                            id="symptoms"
                            value={examData.symptoms}
                            onChange={(e) => handleChange('symptoms', e.target.value)}
                            placeholder="Mô tả chi tiết triệu chứng của bệnh nhân..."
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label htmlFor="diagnosis">Chẩn đoán *</Label>
                          <Textarea
                            id="diagnosis"
                            value={examData.diagnosis}
                            onChange={(e) => handleChange('diagnosis', e.target.value)}
                            placeholder="Chẩn đoán bệnh..."
                            rows={4}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vital Signs */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Sinh hiệu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="bloodPressure">Huyết áp</Label>
                          <Input
                            id="bloodPressure"
                            value={examData.bloodPressure}
                            onChange={(e) => handleChange('bloodPressure', e.target.value)}
                            placeholder="120/80"
                          />
                        </div>
                        <div>
                          <Label htmlFor="heartRate">Nhịp tim (bpm)</Label>
                          <Input
                            id="heartRate"
                            value={examData.heartRate}
                            onChange={(e) => handleChange('heartRate', e.target.value)}
                            placeholder="75"
                          />
                        </div>
                        <div>
                          <Label htmlFor="temperature">Nhiệt độ (°C)</Label>
                          <Input
                            id="temperature"
                            value={examData.temperature}
                            onChange={(e) => handleChange('temperature', e.target.value)}
                            placeholder="37"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Treatment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Điều trị</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="treatment">Phương pháp điều trị</Label>
                        <Textarea
                          id="treatment"
                          value={examData.treatment}
                          onChange={(e) => handleChange('treatment', e.target.value)}
                          placeholder="Kê đơn thuốc, nghỉ ngơi, tái khám..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Ghi chú bổ sung</Label>
                        <Textarea
                          id="notes"
                          value={examData.notes}
                          onChange={(e) => handleChange('notes', e.target.value)}
                          placeholder="Lưu ý thêm..."
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Referral Section */}
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">Chuyển tuyến nội bộ</CardTitle>
                          <CardDescription>
                            Tạo phiếu chỉ định xét nghiệm hoặc chẩn đoán hình ảnh
                          </CardDescription>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowReferralSection(!showReferralSection)}
                        >
                          {showReferralSection ? 'Ẩn' : 'Hiển thị'}
                        </Button>
                      </div>
                    </CardHeader>
                    {showReferralSection && (
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="referral-type">Loại chuyển tuyến *</Label>
                            <Select
                              value={referralData.type}
                              onValueChange={(value) => handleReferralChange('type', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn loại..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lab">
                                  <div className="flex items-center gap-2">
                                    <TestTube className="h-4 w-4" />
                                    Xét nghiệm
                                  </div>
                                </SelectItem>
                                <SelectItem value="imaging">
                                  <div className="flex items-center gap-2">
                                    <Scan className="h-4 w-4" />
                                    Chẩn đoán hình ảnh (X-quang, CT, MRI)
                                  </div>
                                </SelectItem>
                                <SelectItem value="specialist">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Chuyển chuyên khoa khác
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="referral-room">Phòng chuyển đến *</Label>
                            <Select
                              value={referralData.room}
                              onValueChange={(value) => handleReferralChange('room', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn phòng..." />
                              </SelectTrigger>
                              <SelectContent>
                                {mockRooms.map((room) => (
                                  <SelectItem key={room.id} value={room.id}>
                                    {room.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="referral-priority">Mức độ ưu tiên</Label>
                            <Select
                              value={referralData.priority}
                              onValueChange={(value) => handleReferralChange('priority', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="normal">Bình thường</SelectItem>
                                <SelectItem value="urgent">Khẩn cấp</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="referral-notes">Ghi chú chỉ định</Label>
                          <Textarea
                            id="referral-notes"
                            value={referralData.notes}
                            onChange={(e) => handleReferralChange('notes', e.target.value)}
                            placeholder="Ghi rõ loại xét nghiệm, vị trí cần chụp..."
                            rows={3}
                          />
                        </div>

                        <Button
                          type="button"
                          onClick={handleReferral}
                          className="w-full"
                          variant="outline"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Tạo phiếu chuyển tuyến
                        </Button>
                      </CardContent>
                    )}
                  </Card>

                  {/* Action Buttons */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => onNavigate('prescription')}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Kê đơn thuốc
                        </Button>

                        <Button type="submit">
                          <Save className="h-4 w-4 mr-2" />
                          Lưu thông tin khám
                        </Button>

                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => onNavigate('dashboard')}
                        >
                          Hoàn thành và quay lại
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-16">
                  <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    Chọn bệnh nhân để bắt đầu khám
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Chọn một bệnh nhân từ danh sách bên trái
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
