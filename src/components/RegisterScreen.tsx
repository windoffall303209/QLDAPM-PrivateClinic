import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UserRole } from '../App';

interface RegisterScreenProps {
  onRegister: (role: UserRole) => void;
  onNavigateToLogin: () => void;
}

export function RegisterScreen({ onRegister, onNavigateToLogin }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as UserRole,
    agreeTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    if (formData.fullName && formData.phone && formData.email && formData.password && formData.agreeTerms) {
      onRegister(formData.role);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md border rounded bg-white p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold mb-2">Đăng ký tài khoản</h1>
          <p className="text-sm text-gray-600">Tạo tài khoản mới để sử dụng hệ thống</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              id="fullName"
              placeholder="Nguyễn Văn A"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0123456789"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="role">Vai trò</Label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="patient">Bệnh nhân</option>
              <option value="doctor">Bác sĩ</option>
              <option value="receptionist">Lễ tân</option>
              <option value="manager">Quản lý</option>
            </select>
          </div>

          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeTerms}
              onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="terms" className="text-sm">
              Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật
            </Label>
          </div>

          <Button onClick={handleRegister} className="w-full">
            Đăng ký
          </Button>

          <div className="text-center border-t pt-4">
            <span className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-blue-600 hover:underline"
              >
                Đăng nhập ngay
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
