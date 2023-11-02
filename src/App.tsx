import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";

import UserProfile from "./pages/UserProfile";
import ChatRoom from "./pages/ChatRoom";
import FriendsList from "./pages/FriendsList";
import { Friend } from './pages/FriendsList';
import ChatList from "./pages/ChatList";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<FriendsListWithNavigation />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/chatlist' element={<ChatList />} />
        <Route path='/friends' element={<FriendsListWithNavigation />} />
        <Route path='/chat/:friendId' element={<ChatRoom />} />
        
      </Routes>
    </Router>
  );
}


function FriendsListWithNavigation() {
  const navigate = useNavigate();

  const handleSelectFriend = (friend: Friend) => {

    navigate(`/chat/${friend.id}`);
  };

  return <FriendsList onSelectFriend={handleSelectFriend} />;
}

export default App;
