import { useState, useEffect, useRef } from 'react';
function ChatModal() {
    const inputRef = useRef()
  const [sendMessage, setSendMessage] = useState('');
  const [receiveMessage, setReceiveMessage] = useState([]);
  // WebSocket 연결 생성
  const socket = new WebSocket('ws://localhost:4000');
  socket.addEventListener('open', function (e) {
    console.log('============ 서버가 연결되었습니다 =============');
  });

  useEffect(() => {
    // 메시지 수신
    socket.addEventListener('message', function (e) {
      console.log('Message from server ', e.data);
      console.dir(e.data)
      setReceiveMessage([...receiveMessage, {
        sender: 'server',
        msg : e.data
      }]);
    });
  }, []);
  const handleChange = (e) => {
    setSendMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.send(sendMessage);
    setSendMessage('')
    inputRef.current.focus()
  };
  return (
    <>
      <div className="chat fixed right-0 h-1.5 w-xs z-10 bottom-1/2">
        <header className="bg-indigo-700 py-5">실시간 채팅</header>
        <div className="bg-black p-5" overflow-y-scroll min-h-60>
          {/* chat body start */}
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
          {/* chat body end*/}
        </div>
        <div>
          <footer className="bg-gray-600 py-5">
            <div>
              <form onSubmit={handleSubmit}>
                <fieldset className="flex justify-between px-5">
                    <input
                      type="text"
                      className="bg-gray-50 text-black indent-3"
                      value={sendMessage}
                      ref={inputRef}
                      onChange={handleChange}
                    />
                    <input
                      type="submit"
                      className="btn btn-soft btn-warning"
                      value="전송"
                    />
                </fieldset>
              </form>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default ChatModal;
