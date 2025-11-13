import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  FileCheck,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  User,
  Award,
  Clock
} from 'lucide-react';
import { DoctorCertificate, SPECIALTIES } from '../types';

interface CertificateApprovalScreenProps {
  onBack: () => void;
}

export function CertificateApprovalScreen({ onBack }: CertificateApprovalScreenProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<DoctorCertificate | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Mock data - Danh sách chứng chỉ chờ duyệt
  const [certificates, setCertificates] = useState<DoctorCertificate[]>([
    {
      id: '1',
      doctorId: 'DR001',
      certificateName: 'Chứng chỉ hành nghề Bác sĩ',
      issuer: 'Bộ Y tế',
      issueDate: '2020-05-15',
      expiryDate: '2025-05-15',
      fileUrl: '/certificates/cert-001.pdf',
      status: 'pending',
    },
    {
      id: '2',
      doctorId: 'DR002',
      certificateName: 'Chứng chỉ chuyên khoa Tim mạch cấp II',
      issuer: 'Trường Đại học Y Hà Nội',
      issueDate: '2021-09-20',
      expiryDate: '2026-09-20',
      fileUrl: '/certificates/cert-002.pdf',
      status: 'pending',
    },
    {
      id: '3',
      doctorId: 'DR003',
      certificateName: 'Chứng chỉ Nhi khoa',
      issuer: 'Bệnh viện Nhi đồng 1',
      issueDate: '2022-03-10',
      fileUrl: '/certificates/cert-003.pdf',
      status: 'pending',
    },
    {
      id: '4',
      doctorId: 'DR004',
      certificateName: 'Chứng chỉ hành nghề Bác sĩ',
      issuer: 'Bộ Y tế',
      issueDate: '2019-12-01',
      expiryDate: '2024-12-01',
      fileUrl: '/certificates/cert-004.pdf',
      status: 'approved',
      reviewedBy: 'Admin Nguyễn Văn An',
      reviewedAt: '2024-09-20T10:00:00Z',
    },
    {
      id: '5',
      doctorId: 'DR005',
      certificateName: 'Chứng chỉ Da liễu',
      issuer: 'Viện Da liễu Trung ương',
      issueDate: '2023-06-15',
      fileUrl: '/certificates/cert-005.pdf',
      status: 'rejected',
      rejectionReason: 'Chứng chỉ không rõ ràng, vui lòng tải lại ảnh chất lượng cao hơn',
      reviewedBy: 'Admin Trần Thị Bình',
      reviewedAt: '2024-09-21T14:30:00Z',
    },
  ]);

  // Thông tin bác sĩ mock (trong thực tế sẽ join từ database)
  const doctorInfo: Record<string, { name: string; specialty: string; phone: string; email: string }> = {
    DR001: { name: 'BS. Nguyễn Văn An', specialty: 'Đa khoa', phone: '0901234567', email: 'an.nguyen@clinic.vn' },
    DR002: { name: 'BS. Trần Thị Mai', specialty: 'Tim mạch', phone: '0912345678', email: 'mai.tran@clinic.vn' },
    DR003: { name: 'BS. Lê Văn Cường', specialty: 'Nhi khoa', phone: '0923456789', email: 'cuong.le@clinic.vn' },
    DR004: { name: 'BS. Phạm Thị Dung', specialty: 'Thần kinh', phone: '0934567890', email: 'dung.pham@clinic.vn' },
    DR005: { name: 'BS. Hoàng Văn Em', specialty: 'Da liễu', phone: '0945678901', email: 'em.hoang@clinic.vn' },
  };

  const filteredCertificates = certificates.filter((cert) => {
    const doctor = doctorInfo[cert.doctorId];
    const matchesSearch =
      cert.certificateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (cert: DoctorCertificate) => {
    setSelectedCert(cert);
    setShowDetailDialog(true);
  };

  const handleApprove = (cert: DoctorCertificate) => {
    if (confirm(`Xác nhận phê duyệt chứng chỉ "${cert.certificateName}"?`)) {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === cert.id
            ? {
                ...c,
                status: 'approved',
                reviewedBy: 'Admin Nguyễn Văn An',
                reviewedAt: new Date().toISOString(),
              }
            : c
        )
      );
      alert('Đã phê duyệt chứng chỉ thành công!');
      setShowDetailDialog(false);
    }
  };

  const handleReject = (cert: DoctorCertificate) => {
    setSelectedCert(cert);
    setRejectReason('');
    setShowRejectDialog(true);
    setShowDetailDialog(false);
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối!');
      return;
    }

    if (selectedCert) {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === selectedCert.id
            ? {
                ...c,
                status: 'rejected',
                rejectionReason: rejectReason,
                reviewedBy: 'Admin Nguyễn Văn An',
                reviewedAt: new Date().toISOString(),
              }
            : c
        )
      );
      alert('Đã từ chối chứng chỉ!');
      setShowRejectDialog(false);
      setSelectedCert(null);
    }
  };

  const handleViewFile = (fileUrl: string) => {
    // Simulate viewing file
    alert(`Đang mở file: ${fileUrl}\n\n(Trong thực tế sẽ mở file PDF/hình ảnh)`);
  };

  const getStatusBadge = (status: DoctorCertificate['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Đã duyệt</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Từ chối</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = {
    total: certificates.length,
    pending: certificates.filter((c) => c.status === 'pending').length,
    approved: certificates.filter((c) => c.status === 'approved').length,
    rejected: certificates.filter((c) => c.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-6 w-6" />
                  Duyệt chứng chỉ bác sĩ
                </CardTitle>
                <CardDescription>
                  Xem xét và phê duyệt chứng chỉ hành nghề của bác sĩ
                </CardDescription>
              </div>
              <Button variant="outline" onClick={onBack}>
                Quay lại
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <Card>
            <CardContent className="pt-3 pb-3 px-2 sm:pt-4 sm:pb-4 sm:px-4 md:pt-6 md:pb-6">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">Tổng số</p>
                <p className="text-base sm:text-xl md:text-2xl font-bold">{stats.total}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-3 pb-3 px-2 sm:pt-4 sm:pb-4 sm:px-4 md:pt-6 md:pb-6">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">Chờ duyệt</p>
                <p className="text-base sm:text-xl md:text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-3 pb-3 px-2 sm:pt-4 sm:pb-4 sm:px-4 md:pt-6 md:pb-6">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">Đã duyệt</p>
                <p className="text-base sm:text-xl md:text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-3 pb-3 px-2 sm:pt-4 sm:pb-4 sm:px-4 md:pt-6 md:pb-6">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">Từ chối</p>
                <p className="text-base sm:text-xl md:text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="search">Tìm kiếm</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Tìm theo tên bác sĩ, chứng chỉ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="filter-status">Trạng thái</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="approved">Đã duyệt</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificate List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Danh sách chứng chỉ ({filteredCertificates.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredCertificates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Không có chứng chỉ nào</p>
                </div>
              ) : (
                filteredCertificates.map((cert) => {
                  const doctor = doctorInfo[cert.doctorId];
                  return (
                    <Card key={cert.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          {/* Left: Certificate Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Award className="h-5 w-5 text-primary" />
                              <h3 className="font-semibold">{cert.certificateName}</h3>
                              {getStatusBadge(cert.status)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{doctor?.name}</span>
                                </div>
                                <div className="text-muted-foreground ml-6">
                                  {doctor?.specialty} • {doctor?.phone}
                                </div>
                              </div>

                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Cơ quan cấp:</span>
                                </div>
                                <div className="ml-6">{cert.issuer}</div>
                              </div>

                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Ngày cấp:</span>
                                </div>
                                <div className="ml-6">
                                  {new Date(cert.issueDate).toLocaleDateString('vi-VN')}
                                </div>
                              </div>

                              {cert.expiryDate && (
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Hết hạn:</span>
                                  </div>
                                  <div className="ml-6">
                                    {new Date(cert.expiryDate).toLocaleDateString('vi-VN')}
                                  </div>
                                </div>
                              )}
                            </div>

                            {cert.status === 'rejected' && cert.rejectionReason && (
                              <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-xs text-red-800 font-semibold mb-1">Lý do từ chối:</p>
                                <p className="text-sm text-red-900">{cert.rejectionReason}</p>
                              </div>
                            )}

                            {cert.reviewedBy && cert.reviewedAt && (
                              <div className="mt-3 text-xs text-muted-foreground">
                                Đã xử lý bởi {cert.reviewedBy} •{' '}
                                {new Date(cert.reviewedAt).toLocaleString('vi-VN')}
                              </div>
                            )}
                          </div>

                          {/* Right: Actions */}
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetail(cert)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Chi tiết
                            </Button>

                            {cert.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(cert)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-2" />
                                  Duyệt
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleReject(cert)}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Từ chối
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết chứng chỉ</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết và file chứng chỉ
            </DialogDescription>
          </DialogHeader>

          {selectedCert && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tên chứng chỉ:</span>
                  <span className="font-medium">{selectedCert.certificateName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bác sĩ:</span>
                  <span className="font-medium">{doctorInfo[selectedCert.doctorId]?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cơ quan cấp:</span>
                  <span className="font-medium">{selectedCert.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ngày cấp:</span>
                  <span className="font-medium">
                    {new Date(selectedCert.issueDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                {selectedCert.expiryDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày hết hạn:</span>
                    <span className="font-medium">
                      {new Date(selectedCert.expiryDate).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trạng thái:</span>
                  {getStatusBadge(selectedCert.status)}
                </div>
              </div>

              <Button
                onClick={() => handleViewFile(selectedCert.fileUrl)}
                variant="outline"
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Xem file chứng chỉ
              </Button>

              {selectedCert.status === 'pending' && (
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleApprove(selectedCert)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Phê duyệt
                  </Button>
                  <Button
                    onClick={() => handleReject(selectedCert)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Từ chối
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối chứng chỉ</DialogTitle>
            <DialogDescription>
              Vui lòng nhập lý do từ chối chứng chỉ này
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="reject-reason">Lý do từ chối *</Label>
              <Textarea
                id="reject-reason"
                placeholder="VD: Chứng chỉ không rõ ràng, đã hết hạn, thiếu thông tin..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleConfirmReject}>
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
