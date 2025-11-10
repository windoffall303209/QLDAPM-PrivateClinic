import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Screen } from '../App';

interface PrescriptionScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
}

export function PrescriptionScreen({ onNavigate }: PrescriptionScreenProps) {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentMed, setCurrentMed] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    quantity: ''
  });

  const addMedication = () => {
    if (!currentMed.name || !currentMed.dosage) {
      alert('Vui lòng nhập tên thuốc và liều lượng');
      return;
    }

    const newMed: Medication = {
      id: Date.now().toString(),
      name: currentMed.name,
      dosage: currentMed.dosage,
      frequency: currentMed.frequency,
      duration: currentMed.duration,
      quantity: parseInt(currentMed.quantity) || 0
    };

    setMedications([...medications, newMed]);
    setCurrentMed({ name: '', dosage: '', frequency: '', duration: '', quantity: '' });
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleSubmit = () => {
    if (medications.length === 0) {
      alert('Vui lòng thêm ít nhất 1 loại thuốc');
      return;
    }
    alert('Đã lưu đơn thuốc');
    onNavigate('dashboard');
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Kê đơn thuốc</h1>
        <p className="text-sm text-gray-600">Bệnh nhân: Nguyễn Văn A</p>
      </div>

      {/* Form thêm thuốc */}
      <div className="border rounded p-4 mb-6">
        <h2 className="font-medium mb-3">Thêm thuốc</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
          <div>
            <Label className="text-sm">Tên thuốc</Label>
            <Input
              value={currentMed.name}
              onChange={(e) => setCurrentMed({...currentMed, name: e.target.value})}
              placeholder="Paracetamol"
              className="text-sm"
            />
          </div>
          <div>
            <Label className="text-sm">Liều lượng</Label>
            <Input
              value={currentMed.dosage}
              onChange={(e) => setCurrentMed({...currentMed, dosage: e.target.value})}
              placeholder="500mg"
              className="text-sm"
            />
          </div>
          <div>
            <Label className="text-sm">Tần suất</Label>
            <select
              value={currentMed.frequency}
              onChange={(e) => setCurrentMed({...currentMed, frequency: e.target.value})}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Chọn</option>
              <option value="1 lần/ngày">1 lần/ngày</option>
              <option value="2 lần/ngày">2 lần/ngày</option>
              <option value="3 lần/ngày">3 lần/ngày</option>
              <option value="Khi cần">Khi cần</option>
            </select>
          </div>
          <div>
            <Label className="text-sm">Thời gian</Label>
            <Input
              value={currentMed.duration}
              onChange={(e) => setCurrentMed({...currentMed, duration: e.target.value})}
              placeholder="7 ngày"
              className="text-sm"
            />
          </div>
          <div>
            <Label className="text-sm">Số lượng</Label>
            <Input
              type="number"
              value={currentMed.quantity}
              onChange={(e) => setCurrentMed({...currentMed, quantity: e.target.value})}
              placeholder="20"
              className="text-sm"
            />
          </div>
        </div>
        <Button size="sm" onClick={addMedication}>+ Thêm thuốc</Button>
      </div>

      {/* Danh sách thuốc đã kê */}
      <div className="border rounded mb-6 overflow-x-auto">
        <h2 className="font-medium p-4 border-b">Danh sách thuốc ({medications.length})</h2>
        {medications.length > 0 ? (
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">STT</th>
                <th className="px-4 py-3 text-left">Tên thuốc</th>
                <th className="px-4 py-3 text-left">Liều lượng</th>
                <th className="px-4 py-3 text-left">Tần suất</th>
                <th className="px-4 py-3 text-left">Thời gian</th>
                <th className="px-4 py-3 text-left">Số lượng</th>
                <th className="px-4 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med, index) => (
                <tr key={med.id} className="border-t">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{med.name}</td>
                  <td className="px-4 py-3">{med.dosage}</td>
                  <td className="px-4 py-3">{med.frequency}</td>
                  <td className="px-4 py-3">{med.duration}</td>
                  <td className="px-4 py-3">{med.quantity}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeMedication(med.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-gray-500 text-sm">
            Chưa có thuốc nào được kê
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => onNavigate('examination')}>
          Quay lại
        </Button>
        <Button onClick={handleSubmit}>
          Lưu đơn thuốc
        </Button>
      </div>
    </div>
  );
}
