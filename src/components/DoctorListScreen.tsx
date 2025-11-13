import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { UserRole, Screen } from '../App';
import { User, GraduationCap, Calendar, Phone, Stethoscope, DollarSign } from 'lucide-react';

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
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const handleViewDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailDialog(true);
  };

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
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="mb-3 sm:mb-4">
        <h1 className="text-base sm:text-lg lg:text-xl font-semibold mb-1">Danh sách bác sĩ</h1>
        <p className="text-xs sm:text-sm text-gray-600">Tổng: {doctors.length} bác sĩ</p>
      </div>

      {/* Filters */}
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Input
          placeholder="Tìm tên/chuyên khoa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-xs text-sm"
        />
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="all">Tất cả</option>
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
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">STT</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Họ tên</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Chuyên khoa</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Học vị</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">KN</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Lịch LV</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Phí</th>
              <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor, index) => (
              <tr key={doctor.id} className="border-t hover:bg-gray-50">
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm">{index + 1}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap">BS. {doctor.name}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{doctor.specialty}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm">{doctor.degree}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{doctor.experience}n</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{doctor.schedule}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{doctor.consultationFee.toLocaleString('vi-VN')}đ</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm">
                  <div className="flex gap-1 whitespace-nowrap">
                    <Button size="sm" variant="outline" className="text-xs px-2" onClick={() => handleViewDetails(doctor)}>Chi tiết</Button>
                    {userRole === 'patient' && (
                      <Button size="sm" onClick={() => onNavigate('appointment-booking')} className="text-xs px-2">
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
          <div className="p-6 sm:p-8 text-center text-sm text-gray-500">
            Không tìm thấy bác sĩ nào
          </div>
        )}
      </div>

      {/* Doctor Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <User className="h-6 w-6" />
              Thông tin chi tiết bác sĩ
            </DialogTitle>
            <DialogDescription>
              Xem đầy đủ thông tin và kinh nghiệm của bác sĩ
            </DialogDescription>
          </DialogHeader>

          {selectedDoctor && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">BS. {selectedDoctor.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500">{selectedDoctor.specialty}</Badge>
                    <Badge variant="outline">{selectedDoctor.degree}</Badge>
                  </div>
                </div>
              </div>

              {/* Detailed Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <GraduationCap className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Học vị</p>
                    <p className="font-semibold">{selectedDoctor.degree}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Stethoscope className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Kinh nghiệm</p>
                    <p className="font-semibold">{selectedDoctor.experience} năm</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Lịch làm việc</p>
                    <p className="font-semibold">{selectedDoctor.schedule}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phí khám</p>
                    <p className="font-semibold">{selectedDoctor.consultationFee.toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg sm:col-span-2">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Số điện thoại</p>
                    <p className="font-semibold">{selectedDoctor.phone}</p>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Giới thiệu</h4>
                <p className="text-sm text-muted-foreground">
                  Bác sĩ {selectedDoctor.name} là chuyên gia {selectedDoctor.specialty.toLowerCase()}
                  với {selectedDoctor.experience} năm kinh nghiệm. Tốt nghiệp với học vị {selectedDoctor.degree},
                  bác sĩ đã điều trị thành công cho hàng nghìn bệnh nhân và luôn được đánh giá cao
                  về chuyên môn cũng như thái độ chăm sóc tận tâm.
                </p>
              </div>

              {/* Action Buttons */}
              {userRole === 'patient' && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setShowDetailDialog(false);
                      onNavigate('appointment-booking');
                    }}
                  >
                    Đặt lịch khám
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetailDialog(false)}
                  >
                    Đóng
                  </Button>
                </div>
              )}

              {userRole !== 'patient' && (
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowDetailDialog(false)}
                  >
                    Đóng
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}