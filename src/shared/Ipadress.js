export default function IPadress() {
  const env = process.env.NODE_ENV;
  // 추후 백엔드 서버 https 설정 후 도메인으로 변경
  // 종욱
  // const devTarget = env === 'development' ? 'http://13.124.242.158' : 'https://sixzombies.shop';
  // 영철;
//   const devTarget = env === 'development' ? 'https://sixzombies.shop' : 'https://sixzombies.shop';
  //  무중단 배포
  const devTarget = env === 'development' ? 'http://13.125.248.25' : 'https://sixzombies.shop';

  return devTarget;
}
