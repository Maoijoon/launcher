import { GameLaunchInfo } from 'flashpoint-launcher';
import React from 'react';

export default function NgRuffleEmbed(props: GameLaunchInfo) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = window.ext.hooks.useNavigate();
  const ruffleJsUrl = React.useMemo(() => `${window.ext.utils.getFileServerURL()}/ruffle/webhosted/latest/ruffle.js`, []);

  React.useEffect(() => {
    // useEffect calls on a ref change, so we must be careful here
    if (!(window as any).RufflePatched) {
      const windowAny = window as any;

      // Patch fetch func
      windowAny.RufflePatched = true;
      windowAny._fetch = window.fetch;

      window.fetch = async (resource, options) => {
        // Get request as URL object
        let resourceURL = new URL(resource instanceof Request ? resource.url : resource);

        // ??? (I think this was for some obscure edge case I can't find examples of anymore)
        if (resourceURL.protocol == 'blob:')
        {resourceURL = new URL(resourceURL.pathname);}

        // Don't redirect if the requested URL is local
        if (resourceURL.hostname.includes('localhost'))
        {return await windowAny._fetch(resource, options);}

        console.log('redirecting ' + resourceURL.href);

        return windowAny._fetch(resource, {
          proxy: 'http://localhost:22500'
        });
      };

      // Add ruffle to header
      const elem = document.createElement('script');
      elem.setAttribute('src', ruffleJsUrl);
      elem.onload = () => {
        console.log('js script loaded');
        if (containerRef.current && (window as any).RufflePlayer) {
          try {
            const ruffle = (window as any).RufflePlayer.newest();
            const player = ruffle.createPlayer();
            containerRef.current.appendChild(player);

            player.load(props.activeData?.launchCommand);
            console.log('Ruffle player created and loaded with:', props.activeData?.launchCommand);
          } catch (err) {
            console.error('Failed to create Ruffle player:', err);
          }
        }
      };

      document.head.append(elem);
      console.log('patched ruffle');
    } else if (containerRef.current && (window as any).RufflePlayer) {
      try {
        // Clear any existing content
        containerRef.current.innerHTML = '';

        const ruffle = (window as any).RufflePlayer.newest();
        const player = ruffle.createPlayer();
        containerRef.current.appendChild(player);
        player.load(props.activeData?.launchCommand);
        console.log('Ruffle player created and loaded with:', props.activeData?.launchCommand);
      } catch (err) {
        console.error('Failed to create Ruffle player:', err);
      }
    }
  });

  const onBack = () => {
    navigate(-1);
  };

  return <div className='ng-ruffle-page'>
    <button className='simple-button' onClick={onBack}>Back</button>
    <div className='ng-ruffle-wrapper'>
      <div className='ng-ruffle-title'>{props.game.title}</div>
      <div className='ng-ruffle-container' ref={containerRef}></div>
    </div>
  </div>;
}
