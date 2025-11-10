import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Screen } from "../App";

interface DoctorApprovalScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface DoctorApplication {
  id: string;
  doctorName: string;
  email: string;
  phone: string;
  specialty: string;
  experience: number;
  applicationDate: string;
  status: "pending" | "approved" | "rejected";
  degree: string;
}

export function DoctorApprovalScreen({ onNavigate }: DoctorApprovalScreenProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<DoctorApplication | null>(null);

  const applications: DoctorApplication[] = [
    {
      id: "1",
      doctorName: "Nguyễn Văn Minh",
      email: "minh.nguyen@email.com",
      phone: "0123456789",
      specialty: "Tim mạch",
      experience: 8,
      applicationDate: "15/09/2024",
      status: "pending",
      degree: "Tiến sĩ Y học",
    },
    {
      id: "2",
      doctorName: "Trần Thị Lan",
      email: "lan.tran@email.com",
      phone: "0987654321",
      specialty: "Nhi khoa",
      experience: 5,
      applicationDate: "18/09/2024",
      status: "pending",
      degree: "Thạc sĩ Y học",
    },
    {
      id: "3",
      doctorName: "Lê Hoàng Nam",
      email: "nam.le@email.com",
      phone: "0369258147",
      specialty: "Da liễu",
      experience: 10,
      applicationDate: "20/09/2024",
      status: "approved",
      degree: "Bác sĩ chuyên khoa II",
    },
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    alert('Đã phê duyệt đơn đăng ký');
  };

  const handleReject = (id: string) => {
    const reason = prompt('Lý do từ chối:');
    if (reason) {
      alert('Đã từ chối đơn đăng ký');
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Phê duyệt bác sĩ</h1>
        <p className="text-sm text-gray-600">Quản lý đơn đăng ký của bác sĩ</p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-3">
        <Input
          placeholder="Tìm kiếm tên hoặc chuyên khoa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ duyệt</option>
          <option value="approved">Đã duyệt</option>
          <option value="rejected">Đã từ chối</option>
        </select>
      </div>

      {/* Table */}
      <div className="border rounded overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">STT</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Họ tên</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Chuyên khoa</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Học vị</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Kinh nghiệm</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Ngày nộp</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Trạng thái</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app, index) => (
              <tr key={app.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium">
                  <div>{app.doctorName}</div>
                  <div className="text-xs text-gray-600">{app.email}</div>
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">{app.specialty}</td>
                <td className="px-4 py-3 text-sm">{app.degree}</td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">{app.experience} năm</td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">{app.applicationDate}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {app.status === 'pending' ? 'Chờ duyệt' :
                     app.status === 'approved' ? 'Đã duyệt' : 'Từ chối'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-1 whitespace-nowrap">
                    <Button size="sm" variant="outline" onClick={() => setSelectedApp(app)}>
                      Chi tiết
                    </Button>
                    {app.status === 'pending' && (
                      <>
                        <Button size="sm" onClick={() => handleApprove(app.id)}>
                          Duyệt
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleReject(app.id)}>
                          Từ chối
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredApplications.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Không tìm thấy đơn đăng ký nào
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-lg font-semibold mb-4">Chi tiết đơn đăng ký</h2>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Họ tên:</span>
                  <div className="font-medium">{selectedApp.doctorName}</div>
                </div>
                <div>
                  <span className="text-gray-600">Chuyên khoa:</span>
                  <div>{selectedApp.specialty}</div>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <div>{selectedApp.email}</div>
                </div>
                <div>
                  <span className="text-gray-600">Điện thoại:</span>
                  <div>{selectedApp.phone}</div>
                </div>
                <div>
                  <span className="text-gray-600">Học vị:</span>
                  <div>{selectedApp.degree}</div>
                </div>
                <div>
                  <span className="text-gray-600">Kinh nghiệm:</span>
                  <div>{selectedApp.experience} năm</div>
                </div>
                <div>
                  <span className="text-gray-600">Ngày nộp:</span>
                  <div>{selectedApp.applicationDate}</div>
                </div>
                <div>
                  <span className="text-gray-600">Trạng thái:</span>
                  <div>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      selectedApp.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      selectedApp.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedApp.status === 'pending' ? 'Chờ duyệt' :
                       selectedApp.status === 'approved' ? 'Đã duyệt' : 'Từ chối'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              {selectedApp.status === 'pending' && (
                <>
                  <Button onClick={() => { handleApprove(selectedApp.id); setSelectedApp(null); }}>
                    Phê duyệt
                  </Button>
                  <Button variant="outline" onClick={() => { handleReject(selectedApp.id); setSelectedApp(null); }}>
                    Từ chối
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setSelectedApp(null)}>
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
