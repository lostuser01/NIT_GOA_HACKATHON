// Authentication utilities for CityPulse
import { NextRequest } from "next/server";
import { User } from "./types";

// Simple JWT-like token generation (for demo - use proper JWT library in production)
export function generateToken(userId: string, email: string): string {
  const payload = {
    userId,
    email,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  // In production, use jsonwebtoken library
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());

    // Check if token is expired
    if (payload.exp < Date.now()) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
    };
  } catch (error) {
    return null;
  }
}

export function getUserFromRequest(request: NextRequest): { userId: string; email: string } | null {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);
  return verifyToken(token);
}

// Simple password hashing (for demo - use bcrypt in production)
export async function hashPassword(password: string): Promise<string> {
  // In production, use bcrypt:
  // const bcrypt = require('bcrypt');
  // return await bcrypt.hash(password, 10);

  // Simple hash for demo (NOT SECURE - replace with bcrypt)
  return `hashed_${password}_${Date.now()}`;
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  // In production, use bcrypt:
  // const bcrypt = require('bcrypt');
  // return await bcrypt.compare(password, hashedPassword);

  // For demo purposes, we'll do a simple check
  // In a real app, ALWAYS use bcrypt or similar
  return hashedPassword.includes(password);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function sanitizeUser(user: User): Omit<User, "password"> {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
}

// Middleware helper for protected routes
export async function requireAuth(request: NextRequest): Promise<{
  authorized: boolean;
  user: { userId: string; email: string } | null;
  error?: string;
}> {
  const user = getUserFromRequest(request);

  if (!user) {
    return {
      authorized: false,
      user: null,
      error: "Unauthorized - Please login",
    };
  }

  return {
    authorized: true,
    user,
  };
}
