// 創建一個新的Peer對象
const peer = new Peer();

// 監聽Peer連接成功的事件
peer.on('open', (id) => {
  console.log('My peer ID is: ' + id);
});

// 建立連接的函數
function connectToPeer() {
  const peerId = document.getElementById('peer-id').value;
  const conn = peer.connect(peerId);

  // 監聽連接成功的事件
  conn.on('open', () => {
    console.log('Connection established with peer: ' + conn.peer);

    // 顯示對方的Peer ID
    const peerIdElement = document.getElementById('peer-id-display');
    peerIdElement.textContent = 'Connected with: ' + conn.peer;

    // 監聽接收到消息的事件
    conn.on('data', (data) => {
      showMessage(data, 'received');
    });
  });
}

// 發送消息的函數
function sendMessage() {
  const message = document.getElementById('input-box').value;
  showMessage(message, 'sent');

  // 獲取所有已建立連接的Peers
  const peers = peer.connections;
  for (let i = 0; i < peers.length; i++) {
    const conn = peers[i][0];
    conn.send(message);
  }

  // 清空輸入框
  document.getElementById('input-box').value = '';
}

// 顯示消息的函數
function showMessage(message, type) {
  const messagesDiv = document.getElementById('messages');
  const messageP = document.createElement('p');
  messageP.textContent = message;
  messageP.classList.add(type);
  messagesDiv.appendChild(messageP);

  // 自動滾動到最新消息
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


// 監聽Peer連接成功的事件
peer.on('open', (id) => {
  console.log('My peer ID is: ' + id);
  const myPeerIdElement = document.getElementById('my-peer-id');
  myPeerIdElement.textContent = 'My Peer ID: ' + id;
});
