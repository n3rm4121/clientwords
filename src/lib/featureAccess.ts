import { SubscriptionTier } from "@/models/user.model";

interface FeatureLimits {
  [SubscriptionTier.FREE]: number;
  [SubscriptionTier.PRO]: number;
  [SubscriptionTier.LifeTime]: number;
}

const testimonialLimits: FeatureLimits = {
  [SubscriptionTier.FREE]: 10,
  [SubscriptionTier.PRO]: Infinity,
  [SubscriptionTier.LifeTime]: Infinity,
};

const spaceLimits: FeatureLimits = {
  [SubscriptionTier.FREE]: 1,
  [SubscriptionTier.PRO]: Infinity,
  [SubscriptionTier.LifeTime]: Infinity,
};

export function canCollectTestimonial(tier: SubscriptionTier, currentCount: number): boolean {
  return currentCount <= testimonialLimits[tier];
}

export function canCreateSpace(tier: SubscriptionTier, currentCount: number): boolean {
  return currentCount < spaceLimits[tier];
}

export function hasAdvancedCustomization(tier: SubscriptionTier): boolean {
  return tier !== SubscriptionTier.FREE;
}
