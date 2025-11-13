// ==================== CORE TYPES ====================

export type UserRole = 'patient' | 'doctor' | 'receptionist' | 'manager';

export type AppointmentStatus =
  | 'pending'        // Đã đặt, chờ đến
  | 'checked_in'     // Đã check-in, được cấp số
  | 'waiting'        // Đang chờ khám
  | 'in_progress'    // Đang khám
  | 'completed'      // Hoàn thành
  | 'cancelled';     // Đã hủy

export type ShiftType = 'morning' | 'afternoon' | 'evening';

export type QueueNumberType =
  | 'general'        // Số chung (G-xxx)
  | 'room';          // Số theo phòng (P1-AM-xxx)

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export type PaymentMethod = 'cash' | 'momo' | 'zalopay' | 'vnpay';

export type CertificateStatus = 'pending' | 'approved' | 'rejected';

// ==================== USER MODELS ====================

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address?: string;
  role: UserRole;
  createdAt: string;
}

export interface Patient extends User {
  role: 'patient';
  occupation?: string;
  insuranceNumber?: string;
  emergencyContact?: string;
  medicalHistory?: string;
}

export interface Doctor extends User {
  role: 'doctor';
  specialty: string;
  degree: string;
  experience: number; // năm kinh nghiệm
  consultationFee: number;
  certificates: DoctorCertificate[];
  certificateStatus: CertificateStatus;
}

export interface DoctorCertificate {
  id: string;
  doctorId: string;
  certificateName: string;
  issuer: string; // Cơ quan cấp
  issueDate: string;
  expiryDate?: string;
  fileUrl: string;
  status: CertificateStatus;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

// ==================== APPOINTMENT MODELS ====================

export interface Appointment {
  id: string;
  bookingId: string; // Mã đặt chỗ (duy nhất)
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientDateOfBirth: string;

  appointmentDate: string; // YYYY-MM-DD
  shift: ShiftType;

  doctorId?: string;
  doctorName?: string;
  specialty?: string;
  roomNumber?: string;

  reason: string; // Lý do khám
  notes?: string; // Ghi chú đặc biệt (dị ứng, etc)

  status: AppointmentStatus;
  source: 'online' | 'walk_in'; // Hẹn trước hoặc vãng lai

  // Queue info
  queueNumber?: string; // Số thứ tự (G-003 hoặc P1-AM-008)
  queueNumberType?: QueueNumberType;
  checkedInAt?: string;
  calledAt?: string;

  createdAt: string;
  updatedAt: string;
}

// ==================== SHIFT & SCHEDULE ====================

export interface Shift {
  type: ShiftType;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  duration: number;  // giờ (mặc định 4)
}

export interface DoctorSchedule {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string; // YYYY-MM-DD
  shift: ShiftType;
  roomNumber: string;
  maxPatients: number; // Số bệnh nhân tối đa
  currentPatients: number; // Số bệnh nhân hiện tại
  status: 'available' | 'full' | 'cancelled';
  createdAt: string;
}

// ==================== QUEUE MANAGEMENT ====================

export interface QueueNumber {
  id: string;
  number: string; // G-003 hoặc P1-AM-008
  type: QueueNumberType;
  appointmentId: string;
  patientName: string;
  source: 'online' | 'walk_in';
  status: 'waiting' | 'called' | 'in_progress' | 'completed' | 'missed';
  roomNumber?: string;
  shift?: ShiftType;
  issuedAt: string;
  calledAt?: string;
}

// ==================== EXAMINATION ====================

export interface Examination {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;

  // Thông tin khám
  symptoms: string; // Triệu chứng
  diagnosis: string; // Chẩn đoán

  // Sinh hiệu
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;

  // Điều trị
  treatmentPlan: string;
  notes?: string;

  // Chuyển tuyến
  referralType?: 'lab' | 'imaging' | 'specialist';
  referralNotes?: string;
  referralQueueNumber?: string;

  // Metadata
  isLocked: boolean; // Khóa sau 24h
  createdAt: string;
  lockedAt?: string;
}

export interface Prescription {
  id: string;
  examinationId: string;
  patientId: string;
  doctorId: string;
  medications: Medication[];
  createdAt: string;
}

export interface Medication {
  id: string;
  drugName: string;
  dosage: string;
  frequency: '1x/day' | '2x/day' | '3x/day' | 'as_needed';
  duration: number; // ngày
  quantity: number;
  instructions?: string;
}

// ==================== PAYMENT ====================

export interface Payment {
  id: string;
  invoiceNumber: string; // Số hóa đơn
  appointmentId: string;
  patientId: string;
  patientName: string;

  items: PaymentItem[];
  subtotal: number;
  discount: number;
  total: number;

  method: PaymentMethod;
  status: PaymentStatus;

  paidAt?: string;
  refundedAt?: string;
  refundReason?: string;

  // E-invoice
  invoiceUrl?: string;

  createdAt: string;
}

export interface PaymentItem {
  id: string;
  description: string;
  type: 'consultation' | 'medication' | 'lab' | 'imaging' | 'other';
  quantity: number;
  unitPrice: number;
  total: number;
}

// ==================== SYSTEM LOG ====================

export interface SystemLog {
  id: string;
  type: 'check_in' | 'queue_issued' | 'patient_called' | 'appointment_cancelled' | 'payment' | 'other';
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details?: Record<string, any>;
  timestamp: string;
}

// ==================== NOTIFICATION ====================

export interface Notification {
  id: string;
  userId: string;
  type: 'appointment_reminder' | 'appointment_change' | 'result_ready' | 'payment' | 'system';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  channels: ('app' | 'sms' | 'email')[];
  relatedId?: string; // appointmentId, examinationId, etc
  createdAt: string;
  sentAt?: string;
}

// ==================== REPORT ====================

export interface RevenueReport {
  period: {
    startDate: string;
    endDate: string;
  };
  totalRevenue: number;
  totalAppointments: number;
  averageRevenuePerVisit: number;

  byService: RevenueByCategory[];
  byDoctor: RevenueByDoctor[];
  bySpecialty: RevenueByCategory[];
  trends: RevenueTrend[];
}

export interface RevenueByCategory {
  category: string;
  count: number;
  revenue: number;
  percentage: number;
}

export interface RevenueByDoctor {
  doctorId: string;
  doctorName: string;
  specialty: string;
  appointmentCount: number;
  revenue: number;
  revenuePerVisit: number;
}

export interface RevenueTrend {
  period: string; // YYYY-MM
  revenue: number;
  appointments: number;
  growth?: number; // %
}

// ==================== UTILITY TYPES ====================

export interface SelectOption {
  value: string;
  label: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

// ==================== CONSTANTS ====================

export const SHIFTS: Record<ShiftType, Shift> = {
  morning: {
    type: 'morning',
    startTime: '08:00',
    endTime: '12:00',
    duration: 4,
  },
  afternoon: {
    type: 'afternoon',
    startTime: '13:00',
    endTime: '17:00',
    duration: 4,
  },
  evening: {
    type: 'evening',
    startTime: '18:00',
    endTime: '22:00',
    duration: 4,
  },
};

export const SPECIALTIES = [
  { value: 'cardiology', label: 'Tim mạch' },
  { value: 'pediatrics', label: 'Nhi khoa' },
  { value: 'neurology', label: 'Thần kinh' },
  { value: 'dermatology', label: 'Da liễu' },
  { value: 'gastroenterology', label: 'Tiêu hóa' },
  { value: 'orthopedics', label: 'Chấn thương chỉnh hình' },
  { value: 'ent', label: 'Tai Mũi Họng' },
  { value: 'ophthalmology', label: 'Mắt' },
  { value: 'general', label: 'Đa khoa' },
];
