import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import type { ComponentType } from 'react'
import { useContext, useEffect } from 'react'

import { CurrentUserContext } from '@/components/CurrentUserProvider/CurrentUserProvider'

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    const { currentUser, isLoading } = useContext(CurrentUserContext)
    const router = useRouter()

    useEffect(() => {
      if (isEmpty(currentUser) && !isLoading) {
        router.replace('/')
      }
    }, [currentUser])

    if (!currentUser) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
