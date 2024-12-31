import { z } from "zod";

// Enum schemas
const RolesSchema = z.enum(["BASIC", "ADMIN", "SUPERADMIN"]);

const RealEstateTypeSchema = z.enum([
  "LAND",
  "APARTMENT",
  "VILLA",
  "BUILDING",
  "WARHOUSE",
]);

const PaymentMethodTypeSchema = z.enum(["CASH", "INSTALLMENT", "BOTH"]);

const OverlookingTypeSchema = z.enum([
  "MAINSTREET",
  "SUBSTREET",
  "SEA",
  "BACK",
]);

const RentOrSellSchema = z.enum(["RENT", "SELL", "BOTH"]);

const StatusSchema = z.enum(["UNDER_REVIEW", "SOLD", "APPROVED"]);

const AdvisorTypeSchema = z.enum(["OWNER", "PROKER", "COMPANY"]);

// Model schemas
export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
});

export const SessionSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.date().nullable(),
  phone: z.string().nullable(),
  hashedPassword: z.string().nullable(),
  image: z.string().nullable(),
  dateOfBirth: z.date().nullable(),
  role: RolesSchema.default("BASIC"),
  language: z.string().nullable(),
  prefrences: z.record(z.unknown()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
});

export const RealEstateSchema = z.object({
  id: z.string(),
  type: RealEstateTypeSchema,
  title: z.string(),
  description: z.string(),
  details: z.record(z.unknown()).nullable(),
  paymentMethod: PaymentMethodTypeSchema,
  rentOrSell: RentOrSellSchema,
  price: z.number(),
  size: z.number(),
  overlooking: OverlookingTypeSchema,
  status: StatusSchema.default("UNDER_REVIEW"),
  createdAt: z.date(),
  updatedAt: z.date(),
  advisorType: AdvisorTypeSchema.nullable(),
  userId: z.string(),
  images: z.array(z.string()),
});

// Example of how to use these schemas
export const validateUser = (data: unknown) => UserSchema.parse(data);
export const validateRealEstate = (data: unknown) =>
  RealEstateSchema.parse(data);
