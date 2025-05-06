import { GameLaunchInfo } from 'flashpoint-launcher';
import React from 'react';

export default function LauncherEmbedPage(props: GameLaunchInfo) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = window.ext.hooks.useNavigate();
  const ruffleJsUrl = React.useMemo(() => `${window.ext.utils.getFileServerURL()}/ruffle/webhosted/latest/ruffle.js`, []);

  React.useEffect(() => {
    // useEffect calls on a ref change as well, even with no deps
    if (!(window as any).RufflePatched) {
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
      console.log('Patched in Ruffle');
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

  return <div className='ruffle-page'>
    <div className='ruffle-wrapper'>
      <div className='ruffle-title'>{props.game.title}</div>
      <div className='ruffle-container' ref={containerRef}></div>
    </div>
    <button className='simple-button' onClick={onBack}>Back</button>
  </div>;
}
