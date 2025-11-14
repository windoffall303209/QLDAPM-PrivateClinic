import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { UserPlus, IdCard, Phone, Calendar as CalendarIcon, User, MapPin, Mail, Briefcase, AlertCircle, CheckCircle2, Camera } from 'lucide-react';

interface PatientRegistrationScreenProps {
  onNavigate: (screen: string) => void;
}

interface PatientData {
  // Bắt buộc
  identityNumber: string; // CCCD/Hộ chiếu
  identityType: 'cccd' | 'passport';
  phone: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';

  // Tùy chọn
  address?: string;
  email?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  occupation?: string;

  // Hệ thống
  mrn?: string; // Medical Record Number
  identityImage?: string;
}

export function PatientRegistrationScreen({ onNavigate }: PatientRegistrationScreenProps) {
  const [step, setStep] = useState<'search' | 'new' | 'update'>('search');
  const [searchIdentity, setSearchIdentity] = useState('');
  const [searchType, setSearchType] = useState<'cccd' | 'phone'>('cccd');
  const [foundPatient, setFoundPatient] = useState<PatientData | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdMRN, setCreatedMRN] = useState('');

  const [formData, setFormData] = useState<PatientData>({
    identityNumber: '',
    identityType: 'cccd',
    phone: '',
    fullName: '',
    dateOfBirth: '',
    gender: 'male',
    address: '',
    email: '',
    emergencyContact: '',
    emergencyPhone: '',
    occupation: '',
  });

  const handleSearch = () => {
    if (!searchIdentity.trim()) {
      alert('Vui lòng nhập thông tin tra cứu');
      return;
    }

    // Mock search - Tìm kiếm bệnh nhân
    // Giả sử không tìm thấy
    const mockPatient = null; // Thực tế sẽ query database

    if (mockPatient) {
      setFoundPatient(mockPatient);
      setFormData(mockPatient);
      setStep('update');
    } else {
      // Không tìm thấy -> Chuyển sang form tạo mới
      alert('Không tìm thấy hồ sơ. Vui lòng tạo hồ sơ mới.');
      setStep('new');
      // Pre-fill identity number if searching by CCCD
      if (searchType === 'cccd') {
        setFormData(prev => ({ ...prev, identityNumber: searchIdentity }));
      }
    }
  };

  const generateMRN = () => {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    return `MRN${year}${random}`;
  };

  const checkDuplicate = (): string | null => {
    // Mock duplicate check
    // Trong thực tế sẽ check database
    // Trả về cảnh báo nếu phát hiện trùng
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation bắt buộc
    if (!formData.identityNumber || !formData.phone || !formData.fullName ||
        !formData.dateOfBirth || !formData.gender) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }

    // Check duplicate
    const duplicateWarning = checkDuplicate();
    if (duplicateWarning) {
      if (!confirm(duplicateWarning + '\n\nBạn có muốn tiếp tục?')) {
        return;
      }
    }

    // Tạo MRN mới nếu là bệnh nhân mới
    if (step === 'new') {
      const mrn = generateMRN();
      setCreatedMRN(mrn);
      setFormData(prev => ({ ...prev, mrn }));
      setShowSuccessDialog(true);
    } else {
      // Cập nhật bệnh nhân cũ
      alert('Đã cập nhật thông tin bệnh nhân thành công!');
      onNavigate('receptionist-check-in');
    }
  };

  const handleCreateAppointment = () => {
    setShowSuccessDialog(false);
    // Navigate to appointment booking with pre-filled patient info
    onNavigate('appointment-booking');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-6 w-6" />
              Quản lý hồ sơ bệnh nhân
            </CardTitle>
            <CardDescription>
              Tạo mới hoặc cập nhật thông tin hồ sơ bệnh nhân
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Search Section */}
        {step === 'search' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tra cứu bệnh nhân</CardTitle>
              <CardDescription>
                Tra cứu bằng CCCD hoặc số điện thoại
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={searchType === 'cccd' ? 'default' : 'outline'}
                  onClick={() => setSearchType('cccd')}
                  className="flex-1"
                >
                  <IdCard className="h-4 w-4 mr-2" />
                  CCCD/Hộ chiếu
                </Button>
                <Button
                  variant={searchType === 'phone' ? 'default' : 'outline'}
                  onClick={() => setSearchType('phone')}
                  className="flex-1"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Số điện thoại
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={searchType === 'cccd' ? 'Nhập số CCCD/Hộ chiếu' : 'Nhập số điện thoại'}
                    value={searchIdentity}
                    onChange={(e) => setSearchIdentity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch}>Tra cứu</Button>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setStep('new')}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Tạo hồ sơ mới ngay
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Registration/Update Form */}
        {(step === 'new' || step === 'update') && (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {step === 'new' ? 'Tạo hồ sơ bệnh nhân mới' : 'Cập nhật hồ sơ bệnh nhân'}
                </CardTitle>
                <CardDescription>
                  Các trường đánh dấu (*) là bắt buộc
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Thông tin định danh */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <IdCard className="h-5 w-5" />
                    Thông tin định danh
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="identityType">Loại giấy tờ *</Label>
                      <Select
                        value={formData.identityType}
                        onValueChange={(value: 'cccd' | 'passport') =>
                          setFormData(prev => ({ ...prev, identityType: value }))
                        }
                        disabled={step === 'update'}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cccd">CCCD</SelectItem>
                          <SelectItem value="passport">Hộ chiếu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="identityNumber">Số CCCD/Hộ chiếu *</Label>
                      <Input
                        id="identityNumber"
                        value={formData.identityNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, identityNumber: e.target.value }))}
                        placeholder="Nhập số giấy tờ"
                        disabled={step === 'update'}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Ảnh CCCD/Hộ chiếu</Label>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" className="flex-1">
                          <Camera className="h-4 w-4 mr-2" />
                          Chụp ảnh
                        </Button>
                        <Button type="button" variant="outline" className="flex-1">
                          <IdCard className="h-4 w-4 mr-2" />
                          Tải lên
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thông tin cá nhân */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Thông tin cá nhân
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName">Họ và tên *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Nhập họ và tên đầy đủ"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth">Ngày sinh *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="gender">Giới tính *</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value: 'male' | 'female' | 'other') =>
                          setFormData(prev => ({ ...prev, gender: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Nam</SelectItem>
                          <SelectItem value="female">Nữ</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Thông tin bổ sung (tùy chọn) */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Thông tin bổ sung (tùy chọn)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Nhập địa chỉ đầy đủ"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="occupation">Nghề nghiệp</Label>
                      <Input
                        id="occupation"
                        value={formData.occupation}
                        onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                        placeholder="Nhập nghề nghiệp"
                      />
                    </div>

                    <div>
                      <Label htmlFor="emergencyContact">Người liên hệ khẩn cấp</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                        placeholder="Họ tên người liên hệ"
                      />
                    </div>

                    <div>
                      <Label htmlFor="emergencyPhone">SĐT người liên hệ khẩn cấp</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                        placeholder="Số điện thoại"
                      />
                    </div>
                  </div>
                </div>

                {/* Alert */}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Lưu ý:</strong> Sau khi tạo hồ sơ, số CCCD/Hộ chiếu không thể thay đổi.
                    Hệ thống sẽ tự động kiểm tra trùng lặp dựa trên CCCD/SĐT và cảnh báo nếu phát hiện trùng.
                  </AlertDescription>
                </Alert>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep('search')}>
                    Hủy
                  </Button>
                  <Button type="submit" className="flex-1">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    {step === 'new' ? 'Tạo hồ sơ' : 'Cập nhật hồ sơ'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        )}
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              Tạo hồ sơ thành công!
            </DialogTitle>
            <DialogDescription>
              Hồ sơ bệnh nhân đã được tạo với mã MRN
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Mã bệnh nhân (MRN)</p>
              <p className="text-2xl font-bold font-mono">{createdMRN}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Vui lòng lưu lại mã này
              </p>
            </div>

            <div className="text-sm space-y-2">
              <p><strong>Họ tên:</strong> {formData.fullName}</p>
              <p><strong>CCCD:</strong> {formData.identityNumber}</p>
              <p><strong>SĐT:</strong> {formData.phone}</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowSuccessDialog(false);
              setStep('search');
              setFormData({
                identityNumber: '',
                identityType: 'cccd',
                phone: '',
                fullName: '',
                dateOfBirth: '',
                gender: 'male',
              });
            }}>
              Đóng
            </Button>
            <Button onClick={handleCreateAppointment}>
              Tạo lịch khám ngay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
