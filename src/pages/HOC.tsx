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
    const { currentUser } = useContext(CurrentUserContext)

    const router = useRouter()

    useEffect(() => {
      if (isEmpty(currentUser)) {
        router.replace('/') // перенаправляем на страницу логина, если пользователь не авторизован
      }
    }, [currentUser])

    if (!currentUser) {
      return null // можно вернуть спиннер или null, пока идет проверка
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
