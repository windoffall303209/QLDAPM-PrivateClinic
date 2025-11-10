import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Screen } from '../App';

interface MedicalHistoryScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  specialty: string;
  diagnosis: string;
  treatment: string;
  prescriptions: string;
}

export function MedicalHistoryScreen({ onNavigate }: MedicalHistoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      date: '20/09/2024',
      doctorName: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      diagnosis: 'Tăng huyết áp độ 1',
      treatment: 'Điều chỉnh chế độ ăn, tập thể dục, uống thuốc',
      prescriptions: 'Amlodipine 5mg, Aspirin 81mg'
    },
    {
      id: '2',
      date: '15/08/2024',
      doctorName: 'BS. Trần Thị B',
      specialty: 'Nội tổng quát',
      diagnosis: 'Viêm amidan cấp',
      treatment: 'Nghỉ ngơi, uống thuốc kháng sinh',
      prescriptions: 'Amoxicillin 500mg, Paracetamol 500mg'
    },
    {
      id: '3',
      date: '10/07/2024',
      doctorName: 'BS. Lê Minh C',
      specialty: 'Da liễu',
      diagnosis: 'Dị ứng da',
      treatment: 'Tránh tiếp xúc chất gây dị ứng, dùng thuốc bôi',
      prescriptions: 'Hydrocortisone cream, Loratadine 10mg'
    }
  ];

  const filteredRecords = medicalRecords.filter(record =>
    record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Lịch sử khám bệnh</h1>
        <p className="text-sm text-gray-600">Xem lại hồ sơ bệnh án</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Tìm kiếm bác sĩ hoặc chẩn đoán..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Table */}
      <div className="border rounded overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-sm font-medium">Ngày khám</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Bác sĩ</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Chuyên khoa</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Chẩn đoán</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2 text-sm whitespace-nowrap">{record.date}</td>
                <td className="px-3 py-2 text-sm whitespace-nowrap">{record.doctorName}</td>
                <td className="px-3 py-2 text-sm whitespace-nowrap">{record.specialty}</td>
                <td className="px-3 py-2 text-sm">{record.diagnosis}</td>
                <td className="px-3 py-2 text-sm">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedRecord(record)}
                  >
                    Chi tiết
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRecords.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Không tìm thấy hồ sơ nào
          </div>
        )}
      </div>

      {/* Detail Modal (simplified) */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-lg font-semibold mb-4">Chi tiết hồ sơ khám</h2>
            <div className="space-y-3 text-sm">
              <div className="flex">
                <span className="w-32 text-gray-600">Ngày khám:</span>
                <span className="font-medium">{selectedRecord.date}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">Bác sĩ:</span>
                <span>{selectedRecord.doctorName}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">Chuyên khoa:</span>
                <span>{selectedRecord.specialty}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">Chẩn đoán:</span>
                <span>{selectedRecord.diagnosis}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">Điều trị:</span>
                <span>{selectedRecord.treatment}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">Đơn thuốc:</span>
                <span>{selectedRecord.prescriptions}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSelectedRecord(null)}>
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
