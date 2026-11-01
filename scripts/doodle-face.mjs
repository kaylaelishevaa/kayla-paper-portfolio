const expressions = {
  smile: {eyes:'<path d="M31 44q5-5 11 0M55 44q5-5 11 0"/><ellipse cx="37" cy="45" rx="2.1" ry="3" fill="currentColor"/><ellipse cx="60" cy="45" rx="2.1" ry="3" fill="currentColor"/>',mouth:'M42 62q7 6 14-1'},
  curious: {eyes:'<path d="M31 44q5-5 11 0M55 43q5-5 11 0M31 35l10-2M55 34q5-3 10-1"/><ellipse cx="38" cy="43" rx="2" ry="3" fill="currentColor"/><ellipse cx="61" cy="42" rx="2" ry="3" fill="currentColor"/>',mouth:'M45 63q4-3 8 0'},
  confident: {eyes:'<path d="M31 44q5-4 11 0M55 44q5-4 11 0M32 37l9-1M56 36l9 1"/><path d="M36 44v3M60 44v3" stroke-width="3"/>',mouth:'M41 62q7 5 15-2'},
  focused: {eyes:'<path d="M31 43q5-3 11 1M55 44q5-4 11-1M32 35l9 2M56 37l9-2"/><path d="M37 43v4M60 43v4" stroke-width="3"/>',mouth:'M44 63q5 2 10 0'},
  wink: {eyes:'<path d="M31 44q5-5 11 0M55 46q5-6 11-1"/><ellipse cx="37" cy="45" rx="2" ry="3" fill="currentColor"/><path d="m66 45 3-2"/>',mouth:'M41 61q8 9 16-1'},
  dreamy: {eyes:'<path d="M31 44q5 6 11 0M55 44q5 6 11 0M31 44l-2-1M66 44l2-1"/>',mouth:'M43 62q6 4 12 0'},
  bright: {eyes:'<ellipse cx="37" cy="44" rx="2.5" ry="3.6" fill="currentColor"/><ellipse cx="60" cy="44" rx="2.5" ry="3.6" fill="currentColor"/><path d="M32 35q5-3 10-1M55 34q5-2 10 1"/>',mouth:'M42 60q7 3 14 0q-2 12-7 9q-5-1-7-9'},
  grin: {eyes:'<path d="M31 45q5-7 11 0M55 45q5-7 11 0"/>',mouth:'M41 60q8 4 16 0q-2 11-8 9q-6-1-8-9'},
  hearts: {eyes:'<path d="M37 49c-12-7-6-13 0-8c6-6 12 2 0 8ZM60 49c-12-7-6-13 0-8c6-6 12 2 0 8Z" fill="#c8909c" stroke="#b9808c" stroke-width="1.3"/>',mouth:'M42 61q7 7 14 0'},
  thoughtful: {eyes:'<path d="M31 44q5-4 11 0M55 44q5-4 11 0"/><ellipse cx="34.5" cy="44" rx="2" ry="3" fill="currentColor"/><ellipse cx="58" cy="44" rx="2" ry="3" fill="currentColor"/>',mouth:'M44 64q6-3 11-1'}
};
const chapterMoods = {contact:'grin',cover:'smile',education:'curious',experience:'confident',projects:'focused',play:'wink',blog:'dreamy',about:'bright'};
const projectMoods = {'Property platform':'focused','Chat → CRM':'curious',Pulse:'bright','MCP connectors':'confident',EarlyEye:'thoughtful',COUPI:'hearts',SupplySwipe:'grin',RecapAI:'dreamy',Latchkey:'wink',Auctra:'curious'};
export function doodleFace(page='cover', title='') {
  const mood = (page==='case' ? projectMoods[title] : chapterMoods[page]) || 'smile';
  const face = expressions[mood];
  return `<svg xmlns="http://www.w3.org/2000/svg" class="kayla-doodle" data-expression="${mood}" viewBox="0 0 96 96" fill="none" aria-hidden="true">
    <g stroke="#4e4744" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 84C9 77 12 66 14 47C12 23 25 9 46 9C68 5 85 22 82 45C83 62 89 74 78 85Q63 91 49 86Q31 91 18 84Z" fill="#514844"/>
      <path d="M25 40Q25 21 48 19Q71 21 72 40L69 57Q67 74 49 79Q30 75 27 58Z" fill="#fae9d8"/>
      <path d="M48 12C46 29 34 31 24 45Q25 62 19 76C17 52 18 26 29 18Q39 11 48 12Z" fill="#514844"/>
      <path d="M49 12C55 30 65 31 74 46Q73 64 79 77C81 51 80 29 68 18Q58 11 49 12Z" fill="#514844"/>
      <path d="M44 15Q25 23 22 48M54 15Q74 27 76 48M19 57q1 15-2 20M76 61q-1 14 3 20" stroke="#86766b" stroke-width="1.1"/>
      <path d="M47 16q1-4 2-4" stroke="#e4c7b3" stroke-width="1.5"/>
      <ellipse cx="32" cy="56" rx="5" ry="2.7" fill="#e9b7b4" stroke="none" opacity=".65"/>
      <ellipse cx="65" cy="56" rx="5" ry="2.7" fill="#e9b7b4" stroke="none" opacity=".65"/>
      <g color="#51433d" stroke="#51433d" stroke-width="1.8">${face.eyes}</g>
      <path d="m49 49-2 7 3 1" stroke="#c29c88" stroke-width="1.2"/>
      <path d="${face.mouth}" stroke="#aa7377" stroke-width="1.9"/>
      <path d="M35 78q-5 4-9 6M62 79l8 5" stroke="#a38b80" stroke-width="1.2"/>
    </g>
  </svg>`;
}
