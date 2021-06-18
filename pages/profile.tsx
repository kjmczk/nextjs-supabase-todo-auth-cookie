import Link from 'next/link';
import { Card, Space, Typography } from '@supabase/ui';
import { supabase } from '../utils/supabaseClient';

import type { GetServerSideProps } from 'next';
import type { User } from '@supabase/supabase-js';

type Props = {
  user: User | null;
};

export default function Profile({ user }: Props) {
  return (
    <div className="max-w-max mx-auto p-4">
      <Card>
        <Space direction="vertical" size={6}>
          <Typography.Text>You are signed in</Typography.Text>

          <Typography.Text strong>Email: {user?.email}</Typography.Text>

          <Typography.Text type="success">
            User data retrieved server-side (from Cookie in getServerSideProps):
          </Typography.Text>

          <Typography.Text>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Typography.Text>

          <Typography.Text>
            <Link href="/">
              <a className="underline">Static example with useSWR</a>
            </Link>
          </Typography.Text>
        </Space>
      </Card>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }
  // If there is a user, return it.
  return { props: { user } };
};
