import React, { useContext } from 'react';
import { AuthContext } from '../utils/authContext'; // Update the path if needed

function Home() {
  const { user, selectedCharacter } = useContext(AuthContext);
  console.log(selectedCharacter)
  const renderContent = () => {
    if (!user) {
      return <p>Please log in or sign up to continue.</p>;
    }

    if (!selectedCharacter) {
      return <p>Please select a character before continuing.</p>;
    }

    return <h1>Welcome, {user.username}!</h1>; // Or any other content you'd like to show
  };

  return (
    <div>
      <h1>Home Page</h1>
      {renderContent()}
    </div>
  );
}

export default Home;






