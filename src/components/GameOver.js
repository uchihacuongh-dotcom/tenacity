import rover from '../assets/rover.svg';

const GameOver = () => {
  return (<div style={{ maxWidth: '500px' }}>
    <img src={rover} alt='Tenacity' style={{ width: 150 }} />
    <h1>Chúc mừng bạn!</h1>
    <div>
      Bạn đã điều khiển xe tự hành Tenacity
      hoàn thành tất cả nhiệm vụ. Cảm ơn bạn đã chơi!
    </div>
    <br/>
    <h2>Về trò chơi Tenacity</h2>
    <div>
      Tenacity do Brian Yu phát triển trong một dự án tại Trường Giáo dục
      sau đại học của Harvard. Bản tiếng Việt này là bản Việt hóa từ mã nguồn mở gốc
      (tenacity.brianyu.me). Liên hệ tác giả gốc: <a style={{color: 'white'}} href="mailto:brian@brianyu.me">brian@brianyu.me</a>.
    </div>
  </div>);
}

export default GameOver;