import { doc, updateDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';

import AppRouter from './components/AppRouter';
import { Context } from './context';
import './App.scss';
import { db } from './firebase';

function App() {
  const [currentUserData, setCurrentUserData] = useState()
  const [currentCompany, setCurrentCompany] = useState()
  const [settingsPopup, setSettingsPopup] = useState(false)

  const updateCompany = async () => {
    const userDoc = doc(db, "aboutUser", currentUserData.id)
    await updateDoc(userDoc, {
      company: currentCompany
    })
    const companyDoc = doc(db, "company", currentUserData.company.name)
    await updateDoc(companyDoc, currentCompany)
  }

  useEffect(() => {
    if (currentCompany && currentUserData) {
      updateCompany()
    }
  }, [currentCompany, currentUserData])

  return <Context.Provider value={{
    currentUserData, setCurrentUserData, currentCompany, setCurrentCompany, settingsPopup, setSettingsPopup
  }}>
    <AppRouter />
  </Context.Provider>
}

export default App;
