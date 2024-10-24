'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, User, CreditCard } from "lucide-react"
import { useSession } from "next-auth/react"
import React, { useState, useEffect } from 'react'
import { updateName } from "../../action"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"
// import { SubscriptionTier } from "@/types/user"
export enum SubscriptionTier {
  FREE = 'Free',
  PRO = 'Pro',
}

interface SubscriptionData {
  tier: SubscriptionTier
  endDate: string | null
}

export default function ProfileSettings() {
  const { data: session } = useSession()
  const [name, setName] = useState(session?.user?.name)
  const [email, setEmail] = useState(session?.user?.email)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      if (!session) return

      try {
        const data = await fetch('/api/user').then((res) => res.json())
        if (session?.user?.email !== data.userData.email) return

        setName(data.userData.name)
        setEmail(data.userData.email)
        // setSubscription(data.userData.subscription)
        setSubscription({
          tier: data.userData.subscriptionTier,
          endDate: data.userData.subscriptionEndDate
        })

      } catch (error) {
        console.error(error)
      }
    }

    getUserData()
  }, [session])

  const handleSaveName = async () => {
    setLoading(true)
    await updateName(session?.user?.id as string, name as string)
    toast.success('Name updated successfully')
    setIsEditing(false)
    setLoading(false)
  }

  const handleUpgradeSubscription = async (newTier: SubscriptionTier) => {
    setLoading(true)
    try {
      const response = await fetch('/api/upgrade-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTier }),
      })
      if (response.ok) {
        const data = await response.json()
        setSubscription(data.subscription)
      } else {
        throw new Error('Failed to upgrade subscription')
      }
    } catch (error) {
      console.error('Error upgrading subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRemainingDays = () => {
    if (!subscription?.endDate) return null
    const endDate = new Date(subscription.endDate)
    const now = new Date()
    const diffTime = endDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  return (
    <Card className="mb-12 p-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <User className="mr-3 text-blue-600" /> Profile Settings
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label>Name</Label>
          <Input
            disabled={!isEditing || loading}
            type="text"
            className="mt-1"
            value={name ?? ''}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing((prev) => !prev)}
              disabled={loading}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            {isEditing && (
              <Button onClick={handleSaveName} disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin mr-2" size={16} />
                ) : (
                  'Save'
                )}
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            className="mt-1"
            value={email ?? ''}
            disabled
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label>Subscription</Label>
          <div className="flex items-center space-x-2">
            <CreditCard className="text-blue-600" />
            <span className="font-medium">{subscription?.tier.toUpperCase() || 'Free'}</span>
            {subscription?.tier !== SubscriptionTier.FREE && getRemainingDays() !== null && (
              <span className="text-sm text-gray-500">
                ({getRemainingDays()} days remaining)
              </span>
            )}
          </div>
          {subscription?.tier === SubscriptionTier.FREE && (
            <div className="flex space-x-2 mt-2">
              <Button onClick={() => handleUpgradeSubscription(SubscriptionTier.PRO)} disabled={loading}>
                Upgrade to Pro
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}