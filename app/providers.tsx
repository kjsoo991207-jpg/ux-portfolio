'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

const MY_IPS = ['24.43.240.235']

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    if (isLocalhost) return

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
    })

    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        if (MY_IPS.includes(data.ip)) {
          posthog.opt_out_capturing()
        }
      })
      .catch(() => {})
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
