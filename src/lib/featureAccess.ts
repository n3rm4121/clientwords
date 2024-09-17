import { SubscriptionTier } from "@/models/user.model";

interface FeatureLimits {
  [SubscriptionTier.FREE]: number;
  [SubscriptionTier.PRO]: number;
  [SubscriptionTier.BUSINESS]: number;
}

const testimonialLimits: FeatureLimits = {
  [SubscriptionTier.FREE]: 10,
  [SubscriptionTier.PRO]: Infinity,
  [SubscriptionTier.BUSINESS]: Infinity,
};

const spaceLimits: FeatureLimits = {
  [SubscriptionTier.FREE]: 1,
  [SubscriptionTier.PRO]: 1,
  [SubscriptionTier.BUSINESS]: 5,
};

export function canCollectTestimonial(tier: SubscriptionTier, currentCount: number): boolean {
  return currentCount <= testimonialLimits[tier];
}

export function canCreateSpace(tier: SubscriptionTier, currentCount: number): boolean {
  return currentCount <= spaceLimits[tier];
}

export function hasAdvancedCustomization(tier: SubscriptionTier): boolean {
  return tier !== SubscriptionTier.FREE;
}

export function hasAnalytics(tier: SubscriptionTier): boolean {
  return tier !== SubscriptionTier.FREE;
}

export function hasAdvancedAnalytics(tier: SubscriptionTier): boolean {
  return tier === SubscriptionTier.BUSINESS;
}