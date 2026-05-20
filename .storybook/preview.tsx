import type { Preview } from '@storybook/react-vite'
import * as React from 'react'
import '../src/index.css'

/**
 * Stories render with the `.mm-magnify` class applied by default — a
 * Storybook-only token override (see src/index.css) that boosts every v2
 * design token to ~1.75× its production value. Components naturally lay
 * out bigger in REAL pixel space (no CSS zoom or transform), so Radix
 * portals position correctly.
 *
 * Foundations/Examples stories opt out via `parameters: { magnify: false }`
 * so they render at production-true 1× sizing.
 */
const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'megamax bg', value: '#171717' },
        { name: 'light gray', value: '#e5e5e5' },
        { name: 'pure black', value: '#000000' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
  decorators: [
    (Story, ctx) => {
      // Default: magnify ON (token-override, see .mm-magnify in index.css).
      // Stories opt out with `parameters: { magnify: false }` for true 1× sizing.
      //
      // Apply to BOTH the wrapper AND <body> so Radix portal content (which
      // mounts to document.body, outside the wrapper) also inherits the
      // magnified token values.
      const magnify = ctx.parameters?.magnify !== false
      React.useEffect(() => {
        document.body.classList.toggle('mm-magnify', magnify)
        return () => {
          document.body.classList.remove('mm-magnify')
        }
      }, [magnify])
      // CSS Studio — visual CSS editor overlay. Same wire-up as megamax-ds.
      React.useEffect(() => {
        import('cssstudio').then(({ startStudio }) => startStudio())
      }, [])
      return (
        <div
          className={magnify ? 'mm-magnify' : undefined}
          style={{ padding: '40px', display: 'inline-block' }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
