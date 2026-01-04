// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role: "owner" | "admin" | "manager" | "staff";
  department: string;
  permissions: UserPermissions;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPermissions {
  email: { view: boolean; send: boolean; manage: boolean };
  bookings: { view: boolean; create: boolean; edit: boolean; cancel: boolean; viewRevenue: boolean };
  guests: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  invoices: { view: boolean; approve: boolean; export: boolean };
  analytics: { viewOwn: boolean; viewDepartment: boolean; viewAll: boolean };
}

// Guest types
export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  company?: string;
  preferences?: GuestPreferences;
  vipStatus: "regular" | "silver" | "gold" | "platinum" | "vip";
  source: string;
  stats: {
    totalBookings: number;
    totalSpend: number;
    averageBookingValue: number;
    lastStay?: string;
    firstStay?: string;
  };
  marketingOptIn: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GuestPreferences {
  roomType?: string;
  floorPreference: "low" | "mid" | "high" | "any";
  bedType: "single" | "double" | "king" | "twin" | "any";
  smokingRoom: boolean;
  specialNeeds: {
    accessibility: boolean;
    dietary: string[];
    allergies: string[];
  };
}

// Room types
export interface Room {
  id: string;
  roomNumber: string;
  roomType: "single" | "double" | "twin" | "suite" | "deluxe" | "family" | "presidential";
  floor: number;
  building: string;
  description?: string;
  amenities: string[];
  bedConfiguration: {
    type: string;
    count: number;
    extraBedAvailable: boolean;
  };
  maxOccupancy: {
    adults: number;
    children: number;
    total: number;
  };
  pricing: {
    baseRate: number;
    currency: string;
    weekendRate?: number;
  };
  status: "available" | "occupied" | "maintenance" | "blocked" | "cleaning";
  housekeepingStatus: "clean" | "dirty" | "inspected" | "in_progress";
  isSmokingAllowed: boolean;
  isAccessible: boolean;
  isPetFriendly: boolean;
  isActive: boolean;
  images: Array<{ url: string; caption?: string; isPrimary: boolean }>;
  createdAt: string;
  updatedAt: string;
}

// Booking types
export interface Booking {
  id: string;
  bookingReference: string;
  guest: Guest | string;
  room: Room | string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  status: BookingStatus;
  source: string;
  pricing: {
    roomRate: number;
    currency: string;
    subtotal: number;
    taxes: { vat: number; cityTax: number; other: number };
    extras: Array<{ name: string; quantity: number; unitPrice: number; total: number }>;
    discounts: Array<{ name: string; type: "percentage" | "fixed"; value: number; amount: number }>;
  };
  totalAmount: number;
  amountPaid: number;
  paymentStatus: "unpaid" | "deposit_paid" | "paid" | "partially_refunded" | "refunded";
  specialRequests?: string;
  internalNotes?: string;
  createdBy?: User | string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled" | "no_show";

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
