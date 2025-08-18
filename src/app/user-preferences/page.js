import React from 'react'
import {UserPreferences} from '@/views'
import ReduxProviderWrapper from "@/components/ReduxProviderWrapper";
function Page() {
  return (
    <ReduxProviderWrapper>
    <UserPreferences />
    </ReduxProviderWrapper>
  )
}

export default Page
