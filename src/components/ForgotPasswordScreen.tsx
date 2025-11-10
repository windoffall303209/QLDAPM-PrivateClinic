import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ForgotPasswordScreenProps {
  onNavigateToLogin: () => void;
}

export function ForgotPasswordScreen({ onNavigateToLogin }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');

  const handleSendReset = () => {
    if (email) {
      alert('Đã gửi link đổi mật khẩu đến email của bạn');
      onNavigateToLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md border rounded bg-white p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold mb-2">Quên mật khẩu</h1>
          <p className="text-sm text-gray-600">Nhập email để nhận link đổi mật khẩu</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email hoặc số điện thoại</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com hoặc 0123456789"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button onClick={handleSendReset} className="w-full">
            Gửi link đổi mật khẩu
          </Button>

          <div className="text-center border-t pt-4">
            <button
              onClick={onNavigateToLogin}
              className="text-sm text-blue-600 hover:underline"
            >
              ← Quay lại đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
