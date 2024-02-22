import { useEffect } from 'react'
import { Outlet, useRouteLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useRouteLoaderData()
  const submit = useSubmit()

  useEffect(() => {
    if (!token) return

    if (token === 'EXPIRED') {
      submit(null, {action: '/logout', method: 'POST'})
      return
    }

    const tokenDuration = getTokenDuration()
    console.log(tokenDuration)

    setTimeout(() => {
      submit(null, {action: '/logout', method: 'POST'})
    }, tokenDuration)
  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
