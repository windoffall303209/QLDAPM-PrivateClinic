import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UserRole } from '../App';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onNavigateToRegister, onNavigateToForgotPassword }: LoginScreenProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');

  const handleLogin = () => {
    if (identifier && password) {
      onLogin(role);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md border rounded bg-white p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold mb-2">Đăng nhập</h1>
          <p className="text-sm text-gray-600">Đăng nhập vào hệ thống quản lý phòng khám</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="role">Vai trò</Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="patient">Bệnh nhân</option>
              <option value="doctor">Bác sĩ</option>
              <option value="receptionist">Lễ tân</option>
              <option value="manager">Quản lý</option>
            </select>
          </div>

          <div>
            <Label htmlFor="identifier">Số điện thoại hoặc Email</Label>
            <Input
              id="identifier"
              placeholder="0123456789 hoặc email@example.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button onClick={handleLogin} className="w-full">
            Đăng nhập
          </Button>

          <div className="text-center">
            <button
              onClick={onNavigateToForgotPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </button>
          </div>

          <div className="text-center border-t pt-4">
            <span className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <button
                onClick={onNavigateToRegister}
                className="text-blue-600 hover:underline"
              >
                Đăng ký ngay
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
