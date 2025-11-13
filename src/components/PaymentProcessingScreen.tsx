import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import {
  CreditCard,
  Wallet,
  Receipt,
  CheckCircle2,
  Download,
  Printer,
  DollarSign,
  Calendar,
  User,
  Phone,
  Hash
} from 'lucide-react';
import { Payment, PaymentMethod, PaymentItem } from '../types';

interface PaymentProcessingScreenProps {
  onBack: () => void;
}

export function PaymentProcessingScreen({ onBack }: PaymentProcessingScreenProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [processedInvoice, setProcessedInvoice] = useState<Payment | null>(null);

  // Mock data - Danh sách hóa đơn chờ thanh toán
  const [pendingInvoices, setPendingInvoices] = useState<Payment[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2025111301',
      appointmentId: 'APT001',
      patientId: 'PT001',
      patientName: 'Nguyễn Văn An',
      items: [
        {
          id: '1',
          description: 'Khám tổng quát - Tim mạch',
          type: 'consultation',
          quantity: 1,
          unitPrice: 300000,
          total: 300000,
        },
        {
          id: '2',
          description: 'Xét nghiệm máu',
          type: 'lab',
          quantity: 1,
          unitPrice: 150000,
          total: 150000,
        },
        {
          id: '3',
          description: 'Thuốc điều trị',
          type: 'medication',
          quantity: 3,
          unitPrice: 50000,
          total: 150000,
        },
      ],
      subtotal: 600000,
      discount: 0,
      total: 600000,
      method: 'cash',
      status: 'pending',
      createdAt: '2025-11-13T09:00:00Z',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025111302',
      appointmentId: 'APT002',
      patientId: 'PT002',
      patientName: 'Lê Thị Bình',
      items: [
        {
          id: '1',
          description: 'Khám chuyên khoa - Nhi',
          type: 'consultation',
          quantity: 1,
          unitPrice: 250000,
          total: 250000,
        },
      ],
      subtotal: 250000,
      discount: 0,
      total: 250000,
      method: 'cash',
      status: 'pending',
      createdAt: '2025-11-13T10:30:00Z',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2025111303',
      appointmentId: 'APT003',
      patientId: 'PT003',
      patientName: 'Trần Văn Cường',
      items: [
        {
          id: '1',
          description: 'Khám tổng quát',
          type: 'consultation',
          quantity: 1,
          unitPrice: 200000,
          total: 200000,
        },
        {
          id: '2',
          description: 'Chụp X-quang ngực',
          type: 'imaging',
          quantity: 1,
          unitPrice: 180000,
          total: 180000,
        },
      ],
      subtotal: 380000,
      discount: 0,
      total: 380000,
      method: 'cash',
      status: 'paid',
      paidAt: '2025-11-13T11:00:00Z',
      createdAt: '2025-11-13T10:45:00Z',
    },
  ]);

  const selectedInvoiceData = pendingInvoices.find((inv) => inv.id === selectedInvoice);

  const handlePayment = () => {
    if (!selectedInvoice || !paymentMethod) {
      alert('Vui lòng chọn hóa đơn và phương thức thanh toán!');
      return;
    }

    if (!selectedInvoiceData) return;

    // Simulate payment processing
    const updatedInvoice: Payment = {
      ...selectedInvoiceData,
      method: paymentMethod,
      status: 'paid',
      paidAt: new Date().toISOString(),
      invoiceUrl: `/invoices/${selectedInvoiceData.invoiceNumber}.pdf`,
    };

    // Update invoice list
    setPendingInvoices((prev) =>
      prev.map((inv) => (inv.id === selectedInvoice ? updatedInvoice : inv))
    );

    setProcessedInvoice(updatedInvoice);
    setShowSuccessDialog(true);
  };

  const handleDownloadInvoice = (invoice: Payment) => {
    // Simulate PDF download
    alert(`Đang tải hóa đơn ${invoice.invoiceNumber}.pdf...`);
  };

  const handlePrintInvoice = (invoice: Payment) => {
    // Simulate print
    setProcessedInvoice(invoice);
    setShowInvoiceDialog(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessDialog(false);
    setSelectedInvoice(null);
    setPaymentMethod('');
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'cash':
        return <DollarSign className="h-5 w-5" />;
      case 'momo':
      case 'zalopay':
      case 'vnpay':
        return <Wallet className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case 'cash':
        return 'Tiền mặt';
      case 'momo':
        return 'Momo';
      case 'zalopay':
        return 'ZaloPay';
      case 'vnpay':
        return 'VNPay';
      default:
        return method;
    }
  };

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Đã thanh toán</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Chờ thanh toán</Badge>;
      case 'refunded':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Đã hoàn tiền</Badge>;
      case 'failed':
        return <Badge variant="destructive">Thất bại</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-6 w-6" />
                  Xử lý thanh toán
                </CardTitle>
                <CardDescription>
                  Chọn hóa đơn và phương thức thanh toán
                </CardDescription>
              </div>
              <Button variant="outline" onClick={onBack}>
                Quay lại
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Invoice Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Danh sách hóa đơn</CardTitle>
              <CardDescription>
                Chọn hóa đơn cần thanh toán
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingInvoices.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Không có hóa đơn</p>
                  </div>
                ) : (
                  <RadioGroup value={selectedInvoice || ''} onValueChange={setSelectedInvoice}>
                    {pendingInvoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className={`border rounded-lg p-4 ${
                          selectedInvoice === invoice.id
                            ? 'border-primary bg-primary/5'
                            : invoice.status === 'paid'
                            ? 'opacity-50'
                            : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem
                            value={invoice.id}
                            id={invoice.id}
                            disabled={invoice.status === 'paid'}
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <Label htmlFor={invoice.id} className="font-medium cursor-pointer">
                                  {invoice.invoiceNumber}
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {invoice.patientName}
                                </p>
                              </div>
                              {getStatusBadge(invoice.status)}
                            </div>

                            <div className="text-sm space-y-1">
                              {invoice.items.map((item, idx) => (
                                <div key={idx} className="text-muted-foreground">
                                  • {item.description}
                                </div>
                              ))}
                            </div>

                            <Separator className="my-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Tổng cộng:</span>
                              <span className="text-lg font-bold">
                                {invoice.total.toLocaleString('vi-VN')} đ
                              </span>
                            </div>

                            {invoice.status === 'paid' && invoice.paidAt && (
                              <div className="text-xs text-muted-foreground mt-2">
                                Đã thanh toán: {new Date(invoice.paidAt).toLocaleString('vi-VN')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right: Payment Details */}
          <div className="space-y-4">
            {selectedInvoiceData ? (
              <>
                {/* Invoice Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Chi tiết hóa đơn</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mã hóa đơn:</span>
                        <span className="font-mono font-medium">{selectedInvoiceData.invoiceNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bệnh nhân:</span>
                        <span className="font-medium">{selectedInvoiceData.patientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ngày tạo:</span>
                        <span>{new Date(selectedInvoiceData.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Items */}
                    <div className="space-y-2">
                      {selectedInvoiceData.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <div>
                            <div>{item.description}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.quantity} x {item.unitPrice.toLocaleString('vi-VN')} đ
                            </div>
                          </div>
                          <div className="font-medium">{item.total.toLocaleString('vi-VN')} đ</div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tạm tính:</span>
                        <span>{selectedInvoiceData.subtotal.toLocaleString('vi-VN')} đ</span>
                      </div>
                      {selectedInvoiceData.discount > 0 && (
                        <div className="flex justify-between text-red-500">
                          <span>Giảm giá:</span>
                          <span>-{selectedInvoiceData.discount.toLocaleString('vi-VN')} đ</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Tổng cộng:</span>
                        <span className="text-primary">{selectedInvoiceData.total.toLocaleString('vi-VN')} đ</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method Selection */}
                {selectedInvoiceData.status === 'pending' && (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Phương thức thanh toán</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                              <RadioGroupItem value="cash" id="cash" />
                              <Label htmlFor="cash" className="flex-1 cursor-pointer flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Tiền mặt
                              </Label>
                            </div>

                            <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                              <RadioGroupItem value="momo" id="momo" />
                              <Label htmlFor="momo" className="flex-1 cursor-pointer flex items-center gap-2">
                                <Wallet className="h-5 w-5" />
                                Momo
                              </Label>
                            </div>

                            <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                              <RadioGroupItem value="zalopay" id="zalopay" />
                              <Label htmlFor="zalopay" className="flex-1 cursor-pointer flex items-center gap-2">
                                <Wallet className="h-5 w-5" />
                                ZaloPay
                              </Label>
                            </div>

                            <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                              <RadioGroupItem value="vnpay" id="vnpay" />
                              <Label htmlFor="vnpay" className="flex-1 cursor-pointer flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                VNPay
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </CardContent>
                    </Card>

                    {/* Confirm Button */}
                    <Button onClick={handlePayment} className="w-full" size="lg">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Xác nhận thanh toán
                    </Button>
                  </>
                )}

                {selectedInvoiceData.status === 'paid' && (
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                        <CheckCircle2 className="h-6 w-6" />
                        <span className="font-semibold">Đã thanh toán</span>
                      </div>
                      <Button onClick={() => handleDownloadInvoice(selectedInvoiceData)} variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Tải hóa đơn (PDF)
                      </Button>
                      <Button onClick={() => handlePrintInvoice(selectedInvoiceData)} variant="outline" className="w-full">
                        <Printer className="h-4 w-4 mr-2" />
                        In hóa đơn
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-16">
                  <Receipt className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    Chọn hóa đơn để thanh toán
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Chọn một hóa đơn từ danh sách bên trái
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
              Thanh toán thành công!
            </DialogTitle>
            <DialogDescription>
              Hóa đơn đã được thanh toán và lưu vào hệ thống
            </DialogDescription>
          </DialogHeader>

          {processedInvoice && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-green-800 mb-1">Mã hóa đơn</p>
                <p className="text-xl font-bold font-mono text-green-900">{processedInvoice.invoiceNumber}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số tiền:</span>
                  <span className="font-bold">{processedInvoice.total.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phương thức:</span>
                  <span className="font-medium">{getPaymentMethodLabel(processedInvoice.method)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Thời gian:</span>
                  <span>{processedInvoice.paidAt && new Date(processedInvoice.paidAt).toLocaleString('vi-VN')}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleDownloadInvoice(processedInvoice)} variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Tải hóa đơn
                </Button>
                <Button onClick={() => {
                  handlePrintInvoice(processedInvoice);
                  setShowSuccessDialog(false);
                }} variant="outline" className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  In hóa đơn
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleCloseSuccess} className="w-full">
              Hoàn tất
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Print Preview Dialog */}
      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Hóa đơn điện tử</DialogTitle>
            <DialogDescription>
              Xem trước hóa đơn trước khi in
            </DialogDescription>
          </DialogHeader>

          {processedInvoice && (
            <div className="border rounded-lg p-6 space-y-4 bg-white">
              {/* Header */}
              <div className="text-center border-b pb-4">
                <h2 className="text-xl font-bold">PHÒNG KHÁM ĐA KHOA ABC</h2>
                <p className="text-sm text-muted-foreground">123 Đường ABC, Quận 1, TP.HCM</p>
                <p className="text-sm text-muted-foreground">ĐT: 028 1234 5678</p>
              </div>

              {/* Title */}
              <div className="text-center">
                <h3 className="text-lg font-bold">HÓA ĐƠN THANH TOÁN</h3>
                <p className="text-sm font-mono text-muted-foreground">{processedInvoice.invoiceNumber}</p>
              </div>

              {/* Patient & Date */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Bệnh nhân:</p>
                  <p className="font-medium">{processedInvoice.patientName}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Ngày:</p>
                  <p className="font-medium">{new Date(processedInvoice.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>

              <Separator />

              {/* Items Table */}
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Dịch vụ</th>
                    <th className="text-center py-2">SL</th>
                    <th className="text-right py-2">Đơn giá</th>
                    <th className="text-right py-2">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {processedInvoice.items.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2">{item.description}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">{item.unitPrice.toLocaleString('vi-VN')}</td>
                      <td className="text-right font-medium">{item.total.toLocaleString('vi-VN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Separator />

              {/* Total */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{processedInvoice.subtotal.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span>{processedInvoice.total.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phương thức thanh toán:</span>
                  <span className="font-medium">{getPaymentMethodLabel(processedInvoice.method)}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-muted-foreground border-t pt-4">
                <p>Cảm ơn quý khách đã sử dụng dịch vụ!</p>
                <p>Hóa đơn được in lúc: {new Date().toLocaleString('vi-VN')}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvoiceDialog(false)}>
              Đóng
            </Button>
            <Button onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" />
              In hóa đơn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
