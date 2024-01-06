import { useBreakpoint as useBreakpointChakra } from '@chakra-ui/react'
import { useMemo } from 'react'

const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl']

function useBreakpoint(breakpoint: 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', up: boolean = true) {
  const currentBreakpoint = useBreakpointChakra({ ssr: false })

  return useMemo(() => {
    /*
      Workaround for @chakra-ui/react/useBreakpoint re-rendering twice
      with first render returning undefined
      Issue: https://github.com/chakra-ui/chakra-ui/issues/6401
    */
    if (!currentBreakpoint) return true

    const breakpointIndex = breakpoints.indexOf(breakpoint)
    const startIndex = up ? breakpointIndex : 0
    const endIndex = up ? breakpoints.length : breakpointIndex
    const includesBreakpoints = breakpoints.slice(startIndex, endIndex)
    return includesBreakpoints.includes(currentBreakpoint)
  }, [breakpoint, currentBreakpoint, up])
}

export default useBreakpoint
