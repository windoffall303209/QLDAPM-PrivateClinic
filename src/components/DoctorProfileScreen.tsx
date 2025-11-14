import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import {
  User,
  Stethoscope,
  Award,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  Trash2
} from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  fileUrl: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
}

interface DoctorProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  specialties: string[];
  qualifications: string[];
  licenseNumber: string;
  experience: number;
  bio: string;
  certificates: Certificate[];
}

interface DoctorProfileScreenProps {
  onBack: () => void;
}

export function DoctorProfileScreen({ onBack }: DoctorProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<DoctorProfile>({
    id: 'DR001',
    fullName: 'BS. Nguyễn Văn An',
    email: 'nguyenvanan@phongkham.vn',
    phone: '0901234567',
    specialties: ['Tim mạch', 'Nội khoa'],
    qualifications: ['Bác sĩ Đa khoa', 'Thạc sĩ Tim mạch'],
    licenseNumber: 'BS123456',
    experience: 10,
    bio: 'Bác sĩ chuyên khoa Tim mạch với hơn 10 năm kinh nghiệm trong điều trị các bệnh lý tim mạch.',
    certificates: [
      {
        id: '1',
        name: 'Chứng chỉ hành nghề Y khoa',
        issuer: 'Bộ Y tế',
        issueDate: '2020-01-15',
        fileUrl: '/certificates/cert1.pdf',
        verified: true,
        verifiedBy: 'Admin',
        verifiedAt: '2020-01-20',
      },
      {
        id: '2',
        name: 'Chứng chỉ chuyên khoa Tim mạch cấp I',
        issuer: 'Đại học Y Hà Nội',
        issueDate: '2021-06-10',
        expiryDate: '2026-06-10',
        fileUrl: '/certificates/cert2.pdf',
        verified: true,
        verifiedBy: 'Admin',
        verifiedAt: '2021-06-15',
      },
      {
        id: '3',
        name: 'Chứng chỉ CPR (Cấp cứu hồi sức)',
        issuer: 'Hội Tim mạch Việt Nam',
        issueDate: '2024-03-01',
        expiryDate: '2026-03-01',
        fileUrl: '/certificates/cert3.pdf',
        verified: false,
      },
    ],
  });

  const [newQualification, setNewQualification] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('');

  const handleSave = () => {
    // In real app, save to backend
    setIsEditing(false);
    alert('Thông tin hồ sơ đã được cập nhật!');
  };

  const handleAddQualification = () => {
    if (newQualification.trim()) {
      setProfile({
        ...profile,
        qualifications: [...profile.qualifications, newQualification.trim()],
      });
      setNewQualification('');
    }
  };

  const handleRemoveQualification = (index: number) => {
    setProfile({
      ...profile,
      qualifications: profile.qualifications.filter((_, i) => i !== index),
    });
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      setProfile({
        ...profile,
        specialties: [...profile.specialties, newSpecialty.trim()],
      });
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (index: number) => {
    setProfile({
      ...profile,
      specialties: profile.specialties.filter((_, i) => i !== index),
    });
  };

  const handleUploadCertificate = () => {
    // In real app, handle file upload
    alert('Chức năng tải lên chứng chỉ sẽ được triển khai với file upload component');
  };

  const handleViewCertificate = (cert: Certificate) => {
    alert(`Xem chứng chỉ: ${cert.name}\nFile: ${cert.fileUrl}`);
  };

  const handleDeleteCertificate = (certId: string) => {
    if (confirm('Bạn có chắc muốn xóa chứng chỉ này?')) {
      setProfile({
        ...profile,
        certificates: profile.certificates.filter((c) => c.id !== certId),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6" />
                  Hồ sơ bác sĩ
                </CardTitle>
                <CardDescription>
                  Quản lý thông tin cá nhân, chuyên khoa, bằng cấp và chứng chỉ
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onBack}>
                  Quay lại
                </Button>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>
                    Chỉnh sửa
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-5 w-5" />
              Thông tin cơ bản
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="licenseNumber">Số chứng chỉ hành nghề</Label>
                <Input
                  id="licenseNumber"
                  value={profile.licenseNumber}
                  onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="experience">Số năm kinh nghiệm</Label>
                <Input
                  id="experience"
                  type="number"
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Giới thiệu</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Chuyên khoa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {profile.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {specialty}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSpecialty(index)}
                      className="ml-2 hover:text-red-600"
                    >
                      ×
                    </button>
                  )}
                </Badge>
              ))}
              {profile.specialties.length === 0 && (
                <p className="text-sm text-muted-foreground">Chưa có chuyên khoa</p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Input
                  placeholder="Thêm chuyên khoa mới..."
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSpecialty()}
                />
                <Button onClick={handleAddSpecialty}>Thêm</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-5 w-5" />
              Bằng cấp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {profile.qualifications.map((qualification, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>{qualification}</span>
                  </div>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveQualification(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {profile.qualifications.length === 0 && (
                <p className="text-sm text-muted-foreground">Chưa có bằng cấp</p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Input
                  placeholder="Thêm bằng cấp mới..."
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddQualification()}
                />
                <Button onClick={handleAddQualification}>Thêm</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Certificates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Chứng chỉ
                </CardTitle>
                <CardDescription>
                  Tải lên và xác minh các chứng chỉ hành nghề
                </CardDescription>
              </div>
              {isEditing && (
                <Button onClick={handleUploadCertificate} size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Tải lên chứng chỉ
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profile.certificates.map((cert) => (
                <Card key={cert.id} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{cert.name}</h3>
                          {cert.verified ? (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Đã xác minh
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Chờ xác minh
                            </Badge>
                          )}
                        </div>

                        <div className="text-sm text-muted-foreground space-y-1">
                          <p><strong>Cơ quan cấp:</strong> {cert.issuer}</p>
                          <p><strong>Ngày cấp:</strong> {new Date(cert.issueDate).toLocaleDateString('vi-VN')}</p>
                          {cert.expiryDate && (
                            <p><strong>Ngày hết hạn:</strong> {new Date(cert.expiryDate).toLocaleDateString('vi-VN')}</p>
                          )}
                          {cert.verified && cert.verifiedBy && (
                            <p className="text-green-600">
                              <strong>Đã xác minh bởi:</strong> {cert.verifiedBy} vào {cert.verifiedAt && new Date(cert.verifiedAt).toLocaleDateString('vi-VN')}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCertificate(cert)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Xem
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => alert(`Tải xuống: ${cert.fileUrl}`)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Tải
                        </Button>
                        {isEditing && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteCertificate(cert.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {profile.certificates.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Chưa có chứng chỉ nào</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Lưu ý:</strong> Tất cả chứng chỉ cần được xác minh bởi Giám đốc phòng khám trước khi có hiệu lực.
            Vui lòng đảm bảo các chứng chỉ được tải lên là bản gốc hoặc bản sao có công chứng.
          </AlertDescription>
        </Alert>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Hủy
            </Button>
            <Button onClick={handleSave}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Lưu thay đổi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
