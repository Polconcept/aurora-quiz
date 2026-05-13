export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '2498497057335985'

const getTestEventCode = () => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    return params.get('test_event_code') || undefined
  }
  return undefined
}

export const pageview = (testEventCode?: string) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    const code = testEventCode || getTestEventCode()
    if (code) {
      console.log('✅ FB Pixel: Tracking PageView with test code', code);
      (window as any).fbq('track', 'PageView', {}, { test_event_code: code })
    } else {
      console.log('✅ FB Pixel: Tracking PageView');
      (window as any).fbq('track', 'PageView')
    }
  } else {
    console.log('❌ FB Pixel: fbq not found for PageView');
  }
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}, testEventCode?: string) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    const code = testEventCode || getTestEventCode()
    if (code) {
      console.log(`✅ FB Pixel: Tracking ${name} with test code`, code);
      (window as any).fbq('track', name, options, { test_event_code: code })
    } else {
      console.log(`✅ FB Pixel: Tracking ${name}`);
      (window as any).fbq('track', name, options)
    }
  } else {
    console.log(`❌ FB Pixel: fbq not found for ${name}`);
  }
}
