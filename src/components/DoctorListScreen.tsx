import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { UserRole, Screen } from '../App';

interface DoctorListScreenProps {
  userRole: UserRole;
  onNavigate: (screen: Screen) => void;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degree: string;
  experience: number;
  schedule: string;
  consultationFee: number;
  phone: string;
}

export function DoctorListScreen({ userRole, onNavigate }: DoctorListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      specialty: 'Tim mạch',
      degree: 'Tiến sĩ',
      experience: 15,
      schedule: 'T2, T4, T6 (8h-17h)',
      consultationFee: 300000,
      phone: '0912345001'
    },
    {
      id: '2',
      name: 'Trần Thị Bình',
      specialty: 'Nhi khoa',
      degree: 'Thạc sĩ',
      experience: 12,
      schedule: 'T3, T5, T7 (8h-17h)',
      consultationFee: 250000,
      phone: '0912345002'
    },
    {
      id: '3',
      name: 'Lê Minh Cường',
      specialty: 'Thần kinh',
      degree: 'Tiến sĩ',
      experience: 20,
      schedule: 'T2, T5, CN (8h-12h)',
      consultationFee: 350000,
      phone: '0912345003'
    },
    {
      id: '4',
      name: 'Phạm Thị Dung',
      specialty: 'Da liễu',
      degree: 'Thạc sĩ',
      experience: 8,
      schedule: 'T3, T6, T7 (13h-17h)',
      consultationFee: 200000,
      phone: '0912345004'
    },
    {
      id: '5',
      name: 'Hoàng Văn Em',
      specialty: 'Tiêu hóa',
      degree: 'Bác sĩ',
      experience: 6,
      schedule: 'T2-T6 (8h-12h)',
      consultationFee: 200000,
      phone: '0912345005'
    }
  ];

  const specialties = ['all', 'Tim mạch', 'Nhi khoa', 'Thần kinh', 'Da liễu', 'Tiêu hóa'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-xl font-semibold mb-1">Danh sách bác sĩ</h1>
        <p className="text-sm text-gray-600">Tổng: {doctors.length} bác sĩ</p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-3">
        <Input
          placeholder="Tìm kiếm tên bác sĩ hoặc chuyên khoa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">Tất cả chuyên khoa</option>
          {specialties.slice(1).map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="border rounded overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-sm font-medium">STT</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Họ tên</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Chuyên khoa</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Học vị</th>
              <th className="px-3 py-2 text-left text-sm font-medium">KN</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Lịch làm việc</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Phí khám</th>
              <th className="px-3 py-2 text-left text-sm font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor, index) => (
              <tr key={doctor.id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2 text-sm">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium whitespace-nowrap">BS. {doctor.name}</td>
                <td className="px-3 py-2 text-sm whitespace-nowrap">{doctor.specialty}</td>
                <td className="px-3 py-2 text-sm">{doctor.degree}</td>
                <td className="px-3 py-2 text-sm whitespace-nowrap">{doctor.experience} năm</td>
                <td className="px-3 py-2 text-sm whitespace-nowrap">{doctor.schedule}</td>
                <td className="px-3 py-2 text-sm whitespace-nowrap">{doctor.consultationFee.toLocaleString('vi-VN')}đ</td>
                <td className="px-3 py-2 text-sm">
                  <div className="flex gap-1 whitespace-nowrap">
                    <Button size="sm" variant="outline">Chi tiết</Button>
                    {userRole === 'patient' && (
                      <Button size="sm" onClick={() => onNavigate('appointment-booking')}>
                        Đặt lịch
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredDoctors.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Không tìm thấy bác sĩ nào
          </div>
        )}
      </div>
    </div>
  );
}