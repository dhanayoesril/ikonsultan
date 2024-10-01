import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Card, Modal } from 'react-bootstrap';
import './App.css';

function App() {
  const [masterData, setMasterData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [detail, setDetail] = useState({});
  const [showModal, setShowModal] = useState(false);

  const getData = () => {
    Axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        const data = res.data;
        setPosts(data);
        setMasterData(data);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onClickCard = (data) => {
    setDetail(data);
    setShowModal(true);
  };

  const handleSearchTitle = (e) => {
    const input = e.target.value;
    if (input?.length > 0) {
      const filteredData = masterData.filter((item) =>
        item.title.includes(input)
      );
      setPosts(filteredData);
    } else {
      setPosts(masterData);
    }
  };

  return (
    <div className="App p-2">
      <div className="mb-2">
        <input
          className="form-control"
          placeholder="Search title"
          onChange={handleSearchTitle}
        />
      </div>
      <div>
        {posts.map((item, idx) => (
          <Card
            className="p-2 mb-2 card-item"
            key={idx}
            onClick={() => onClickCard(item)}
          >
            <div>UserId: {item?.userId}</div>
            <div>Title: {item?.title}</div>
          </Card>
        ))}
      </div>
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <div className="p-4">UserId: {detail?.userId}</div>
        <div className="p-4">Id:{detail?.id} </div>
        <div className="p-4">Title: {detail?.title}</div>
        <div className="p-4">Body: {detail?.body}</div>
      </Modal>
    </div>
  );
}

export default App;
