import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Screen } from '../App';

interface PaymentScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function PaymentScreen({ onNavigate }: PaymentScreenProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const invoices = [
    {
      id: 'INV-001',
      patientName: 'Nguyễn Văn A',
      date: '22/09/2024',
      services: 'Khám tổng quát + Xét nghiệm',
      amount: 650000,
      status: 'pending'
    },
    {
      id: 'INV-002',
      patientName: 'Lê Thị C',
      date: '21/09/2024',
      services: 'Khám tim mạch + Siêu âm',
      amount: 700000,
      status: 'paid'
    },
    {
      id: 'INV-003',
      patientName: 'Phạm Văn E',
      date: '20/09/2024',
      services: 'Khám da liễu',
      amount: 400000,
      status: 'pending'
    }
  ];

  const handlePayment = () => {
    if (!selectedInvoice || !paymentMethod) {
      alert('Vui lòng chọn hóa đơn và phương thức thanh toán');
      return;
    }
    alert('Thanh toán thành công!');
    onNavigate('dashboard');
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Thanh toán</h1>
        <p className="text-sm text-gray-600">Xử lý thanh toán viện phí</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Danh sách hóa đơn */}
        <div>
          <h2 className="font-medium mb-3">Danh sách hóa đơn</h2>
          <div className="border rounded overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left"></th>
                  <th className="px-3 py-2 text-left">Mã HĐ</th>
                  <th className="px-3 py-2 text-left">Bệnh nhân</th>
                  <th className="px-3 py-2 text-left">Số tiền</th>
                  <th className="px-3 py-2 text-left">TT</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(invoice => (
                  <tr key={invoice.id} className="border-t">
                    <td className="px-3 py-2">
                      <input
                        type="radio"
                        name="invoice"
                        checked={selectedInvoice === invoice.id}
                        onChange={() => setSelectedInvoice(invoice.id)}
                        disabled={invoice.status === 'paid'}
                      />
                    </td>
                    <td className="px-3 py-2">{invoice.id}</td>
                    <td className="px-3 py-2">{invoice.patientName}</td>
                    <td className="px-3 py-2">{invoice.amount.toLocaleString()}đ</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status === 'paid' ? 'Đã thanh toán' : 'Chưa TT'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chi tiết thanh toán */}
        <div>
          <h2 className="font-medium mb-3">Thông tin thanh toán</h2>
          {selectedInvoice ? (
            <div className="space-y-4">
              <div className="border rounded p-4">
                {(() => {
                  const invoice = invoices.find(i => i.id === selectedInvoice);
                  return invoice ? (
                    <>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mã hóa đơn:</span>
                          <span className="font-medium">{invoice.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bệnh nhân:</span>
                          <span>{invoice.patientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dịch vụ:</span>
                          <span>{invoice.services}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ngày:</span>
                          <span>{invoice.date}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-medium">
                          <span>Tổng tiền:</span>
                          <span className="text-lg">{invoice.amount.toLocaleString()}đ</span>
                        </div>
                      </div>
                    </>
                  ) : null;
                })()}
              </div>

              <div className="border rounded p-4">
                <Label className="text-sm mb-2 block">Phương thức thanh toán</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="text-sm">Tiền mặt</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="text-sm">Thẻ ATM/Visa</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="text-sm">Chuyển khoản</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                  Hủy
                </Button>
                <Button onClick={handlePayment}>
                  Xác nhận thanh toán
                </Button>
              </div>
            </div>
          ) : (
            <div className="border rounded p-8 text-center text-gray-500 text-sm">
              Chọn hóa đơn cần thanh toán
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
