import * as React from "react"
import NextLink from "next/link"
import type { LinkProps as NextLinkProps } from "next/link"
// Para App Router (recomendado en Next.js 15)
import { useRouter } from "next/navigation"
// Si sigues usando Pages Router, mantén: import { useRouter } from "next/router"

import { isRelative } from "lib/utils"

interface LinkProps extends Omit<NextLinkProps, 'passHref' | 'as'> {
  href: string
  children?: React.ReactElement
  // Si necesitas mantener compatibilidad con Pages Router, incluye estas props
  // passHref?: boolean
  // as?: string
}

export function Link({ href, children, ...props }: LinkProps) {
  const router = useRouter()

  if (!href) {
    return null
  }

  // Use Next Link for internal links, and <a> for others.
  if (isRelative(href)) {
    // Disable prefetching in preview mode.
    // En App Router, isPreview no existe, usa una alternativa o elimina esta lógica
    // const linkProps = router.isPreview ? { prefetch: false, ...props } : props
    const linkProps = props // Simplificado para App Router

    return (
      <NextLink href={href} {...linkProps}>
        {children}
      </NextLink>
    )
  }

  // Solución 1: Tipado explícito para external links
  if (!children) {
    return (
      <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {href}
      </a>
    )
  }

  return React.cloneElement(children, {
    href,
    ...props
  } as React.HTMLAttributes<HTMLElement>)
}

// Versión alternativa si prefieres más control de tipos
export function LinkAlternative({ href, children, ...props }: LinkProps) {
  const router = useRouter()

  if (!href) {
    return null
  }

  if (isRelative(href)) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    )
  }

  // Para links externos, renderiza un elemento <a>
  if (!children) {
    return <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>{href}</a>
  }

  // Verifica que children sea un elemento válido antes de clonarlo
  if (!React.isValidElement(children)) {
    console.warn('Link children must be a valid React element for external links')
    return <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>{String(children)}</a>
  }

  return React.cloneElement(children as React.ReactElement<any>, {
    href,
    target: "_blank", // Para links externos
    rel: "noopener noreferrer", // Seguridad para links externos
    ...props
  })
}

// Si necesitas mantener compatibilidad con Pages Router
export function LinkPagesRouter({ href, passHref, as, children, ...props }: LinkProps & { passHref?: boolean, as?: string }) {
  const router = useRouter()

  if (!href) {
    return null
  }

  if (isRelative(href)) {
    // Para Pages Router con isPreview
    const linkProps = (router as any).isPreview ? { prefetch: false, ...props } : props

    return (
      <NextLink as={as} href={href} passHref={passHref} {...linkProps}>
        {children}
      </NextLink>
    )
  }

  if (!children) {
    return <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>{href}</a>
  }

  return React.cloneElement(children as React.ReactElement<any>, {
    href,
    ...props
  } as React.HTMLAttributes<HTMLElement>)
}
