import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { pinata } from 'frog/hubs'
import { neynar } from 'frog/middlewares'
import { serveStatic } from 'frog/serve-static'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  hub: pinata(),
}).use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  })
)

app.frame('/', (c) => {
  const { status, frameData, verified } = c

  const { fid } = frameData || {}

  const { displayName, followerCount, pfpUrl } = c.var.interactor || {}

  console.log('verified', verified)
  console.log('displayName', displayName)
  console.log('followerCount', followerCount)
  console.log('pfpUrl', pfpUrl)
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'red',
            fontSize: 65,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response' ? `Hello ${displayName}` : ' Welcome Brother!!   '}
        </div>
      </div>
    ),
    intents: [
      <Button value="neynar">📍Home</Button>,
      <Button action="/neynar">🎩
Check FID</Button>,
       <Button.Link href="https://warpcast.com/0xhen/0xf3bcfcda"></Button.Link>🎁Daily Reward</Button.Link>,
      <Button.Link href="https://warpcast.com/~/compose?text=Frame%20By%20@0xhen%20https://0xhen-vercel-frame.vercel.app/api">
        🔍Share
      </Button.Link>,
    ],
  })
})

app.frame('/neynar', (c) => {
    const { fid, followerCount, pfpUrl } = c.var.interactor || {}
    console.log('interactor: ', c.var.interactor)

  
    return c.res({
      image: (
        <div
          style={{
              alignItems: 'center',
              background:
                  'response'
                  ? 'linear-gradient(to right, #432889, #17101F)'
                  : 'black',
            backgroundSize: '100% 100%',
            color: 'yellow',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 28,
            fontSize: 45,
            height: '100%',
            width: '100%',
          }}
        >

        <span style={{ color: 'cyan' }}>FID: {fid}</span>
        <span style={{ color: 'cyan' }}>Followers: {followerCount}</span>
        
        
          <img
            style={{
              width: 200,
              height  : 200,
            }}
            src={pfpUrl}
          />
        </div>
      ),
    })
  })


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
