import React from 'react'
import { useUser, RequireAuth } from '../hooks/authUser'

import { Card, Typography, Space } from '@supabase/ui'
import Header from '../components/Header'
import Head from '../components/Head'

export default function Profile() {

  const { user } = useUser()

  return (
    <>
      <Head />
      {/* <Header /> */}
      {user && (
        <div style={{ maxWidth: '620px', margin: '96px auto' }}>
          <Card>
            <Space direction="vertical" size={6}>
              <Typography.Text>you're signed in</Typography.Text>
              <Typography.Text strong>Email: {user.email}</Typography.Text>
              <Typography.Text type="success">User data:</Typography.Text>

              <Typography.Text>
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </Typography.Text>
            </Space>
          </Card>
        </div>
      )}
    </>
  )
}
