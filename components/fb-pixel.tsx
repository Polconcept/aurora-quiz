'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import * as fpixel from '@/lib/fpixel'

function PixelEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    fpixel.pageview()
  }, [pathname, searchParams])

  return null
}

export function FacebookPixel() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const testEventCode = searchParams.get('test_event_code')
    if (testEventCode && (window as any).fbq) {
      console.log('FB Pixel: Manual Init with Test Code', testEventCode);
      (window as any).fbq('init', fpixel.FB_PIXEL_ID, {}, { test_event_code: testEventCode });
    }
  }, [searchParams])

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            const urlParams = new URLSearchParams(window.location.search);
            const testCode = urlParams.get('test_event_code');
            
            if (testCode) {
              fbq('init', '${fpixel.FB_PIXEL_ID}', {}, { test_event_code: testCode });
              fbq('track', 'PageView', {}, { test_event_code: testCode });
            } else {
              fbq('init', '${fpixel.FB_PIXEL_ID}');
              fbq('track', 'PageView');
            }
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${fpixel.FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <PixelEvents />
      </Suspense>
    </>
  )
}

