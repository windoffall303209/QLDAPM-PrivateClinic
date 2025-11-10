import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Screen } from '../App';

interface ExaminationScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function ExaminationScreen({ onNavigate }: ExaminationScreenProps) {
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [examData, setExamData] = useState({
    symptoms: '',
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    diagnosis: '',
    treatment: '',
    notes: ''
  });

  const waitingPatients = [
    { id: '1', name: 'Nguyễn Văn A', time: '08:00', reason: 'Đau đầu, chóng mặt' },
    { id: '2', name: 'Lê Thị B', time: '08:30', reason: 'Ho, sốt' },
    { id: '3', name: 'Trần Văn C', time: '09:00', reason: 'Đau bụng' },
  ];

  const handleChange = (field: string, value: string) => {
    setExamData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đã lưu thông tin khám bệnh');
    onNavigate('dashboard');
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Khám bệnh</h1>
        <p className="text-sm text-gray-600">Nhập thông tin khám cho bệnh nhân</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-1 border rounded p-3">
          <h2 className="font-medium mb-3 text-sm">Bệnh nhân chờ khám</h2>
          <div className="space-y-2">
            {waitingPatients.map(patient => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient.id)}
                className={`p-2 border rounded cursor-pointer text-sm ${
                  selectedPatient === patient.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{patient.name}</div>
                <div className="text-xs text-gray-600">{patient.time} - {patient.reason}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedPatient ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border rounded p-4">
                <h3 className="font-medium mb-3">Thông tin khám</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Triệu chứng</Label>
                    <textarea
                      value={examData.symptoms}
                      onChange={(e) => handleChange('symptoms', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm min-h-[60px]"
                      placeholder="Mô tả triệu chứng..."
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Chẩn đoán</Label>
                    <textarea
                      value={examData.diagnosis}
                      onChange={(e) => handleChange('diagnosis', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm min-h-[60px]"
                      placeholder="Chẩn đoán bệnh..."
                    />
                  </div>
                </div>
              </div>

              <div className="border rounded p-4">
                <h3 className="font-medium mb-3">Sinh hiệu</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-sm">Huyết áp</Label>
                    <Input
                      value={examData.bloodPressure}
                      onChange={(e) => handleChange('bloodPressure', e.target.value)}
                      placeholder="120/80"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Nhịp tim</Label>
                    <Input
                      value={examData.heartRate}
                      onChange={(e) => handleChange('heartRate', e.target.value)}
                      placeholder="75 bpm"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Nhiệt độ</Label>
                    <Input
                      value={examData.temperature}
                      onChange={(e) => handleChange('temperature', e.target.value)}
                      placeholder="37°C"
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="border rounded p-4">
                <h3 className="font-medium mb-3">Điều trị</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm">Phương pháp điều trị</Label>
                    <textarea
                      value={examData.treatment}
                      onChange={(e) => handleChange('treatment', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm min-h-[60px]"
                      placeholder="Kê đơn thuốc, chỉ định xét nghiệm..."
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Ghi chú</Label>
                    <textarea
                      value={examData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm min-h-[50px]"
                      placeholder="Lưu ý thêm..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => onNavigate('prescription')}>
                  Kê đơn thuốc
                </Button>
                <Button type="submit">
                  Lưu thông tin
                </Button>
              </div>
            </form>
          ) : (
            <div className="border rounded p-8 text-center text-gray-500">
              Chọn bệnh nhân để bắt đầu khám
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
