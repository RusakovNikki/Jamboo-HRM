import { doc, updateDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';

import AppRouter from './components/AppRouter';
import { Context } from './context';
import './App.scss';
import { db } from './firebase';

function App() {
  const [currentUserData, setCurrentUserData] = useState()
  const [currentCompany, setCurrentCompany] = useState()

  const updateCompanyInUser = async () => {
    const userDoc = doc(db, "aboutUser", currentUserData.id)
    await updateDoc(userDoc, {
      company: currentCompany
    })
  }

  useEffect(() => {
    if (currentCompany && currentUserData) {
      updateCompanyInUser()
    }
  }, [currentCompany, currentUserData])

  return <Context.Provider value={{
    currentUserData, setCurrentUserData, currentCompany, setCurrentCompany
  }}>
    <AppRouter />
  </Context.Provider>
}

export default App;
