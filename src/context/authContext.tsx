import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signOut, 
  type User, 
  type UserCredential,
  signInWithPopup, // Add this
  GoogleAuthProvider, // Add this
  setPersistence, // Add this for automatic login
  browserLocalPersistence // Add this for automatic login
} from 'firebase/auth';
import { auth } from '../firebase/firebaseAuth';

interface LinkForm {
  id: number;
  platform: string;
  url: string;
  saved: boolean;
}

interface ProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>; // Add this
  logOut: () => Promise<void>;
  userInfo: React.MutableRefObject<any>;
  linkForms: LinkForm[];
  setLinkForms: React.Dispatch<React.SetStateAction<LinkForm[]>>;
  profileInfo: ProfileInfo;
  setProfileInfo: React.Dispatch<React.SetStateAction<ProfileInfo>>;
  savedLinks: LinkForm[];
  setSavedLinks: React.Dispatch<React.SetStateAction<LinkForm[]>>;
  saveLink: (id: number) => void;
  updateLinkForm: (id: number, field: 'platform' | 'url', value: string) => void;
  removeLinkForm: (id: number) => void;
  addNewLinkForm: () => void;
  saveAllLinks: () => void;
  loading: boolean; // Add loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const userInfo = useRef<any>(null);

  const [linkForms, setLinkForms] = useState<LinkForm[]>([]);
  const [savedLinks, setSavedLinks] = useState<LinkForm[]>([]);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: null,
  });
  const [nextId, setNextId] = useState(1);

  // Set persistence for automatic login
  useEffect(() => {
    const setAuthPersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error('Error setting auth persistence:', error);
      }
    };
    
    setAuthPersistence();
  }, []);

  async function signUp(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error in signUp:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to sign up: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred during sign up");
      }
    }
  }

  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Add Google sign-in function
  async function signInWithGoogle(): Promise<UserCredential> {
    try {
      const provider = new GoogleAuthProvider();
      // Add optional scopes if needed
      provider.addScope('profile');
      provider.addScope('email');
      
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Error in Google sign-in:", error);
      throw error;
    }
  }

  function logOut(): Promise<void> {
    return signOut(auth);
  }

  const validateUrl = (url: string, platform: string) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[\da-z\.-]+\.[a-z\.]{2,6}([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      return false;
    }

    const platformDomains: { [key: string]: string } = {
      Github: 'github.com',
      Youtube: 'youtube.com',
      Twitter: 'twitter.com',
      Linkedin: 'linkedin.com',
      Twitch: 'twitch.tv',
      Facebook: 'facebook.com',
      Stackoverflow: 'stackoverflow.com',
      Codewars: 'codewars.com',
      Hashnode: 'hashnode.com',
      Freecodecamp: 'freecodecamp.org'
    };

    const domain = platformDomains[platform];
    const cleanUrl = url.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanUrl.startsWith(domain.toLowerCase());
  };

  const saveLink = (id: number) => {
  const linkForm = linkForms.find(form => form.id === id);
  if (linkForm && validateUrl(linkForm.url, linkForm.platform)) {
    // Clean the URL by removing localhost prefix and ensuring https://
    const cleanedUrl = linkForm.url.startsWith('http://localhost:5173/')
      ? `https://${linkForm.url.replace('http://localhost:5173/', '')}`
      : linkForm.url.startsWith('http://') || linkForm.url.startsWith('https://')
        ? linkForm.url
        : `https://${linkForm.url}`; // Add https:// if no protocol is present

    const updatedLinkForm = { ...linkForm, url: cleanedUrl, saved: true };
    setLinkForms(prevForms =>
      prevForms.map(form => (form.id === id ? updatedLinkForm : form))
    );
    setSavedLinks(prevLinks => [
      ...prevLinks.filter(link => link.id !== id),
      updatedLinkForm,
    ]);
  }
};

const saveAllLinks = () => {
  const cleanedLinks = linkForms.map(form => ({
    ...form,
    url: form.url.startsWith('http://localhost:5173/')
      ? `https://${form.url.replace('http://localhost:5173/', '')}`
      : form.url.startsWith('http://') || form.url.startsWith('https://')
        ? form.url
        : `https://${form.url}`, // Add https:// if no protocol is present
    saved: true,
  }));
  setSavedLinks(cleanedLinks);
};

  const updateLinkForm = (id: number, field: 'platform' | 'url', value: string) => {
    setLinkForms(prevForms => 
      prevForms.map(form => 
        form.id === id ? { ...form, [field]: value, saved: false } : form
      )
    );
  };

  const removeLinkForm = (id: number) => {
    setLinkForms(prevForms => prevForms.filter(form => form.id !== id));
    setSavedLinks(prevLinks => prevLinks.filter(link => link.id !== id));
  };

  const addNewLinkForm = () => {
    setLinkForms(prevForms => [...prevForms, { id: nextId, platform: 'Github', url: '', saved: false }]);
    setNextId(prevId => prevId + 1);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      // Update profile info if user exists
      if (user) {
        setProfileInfo(prev => ({
          ...prev,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ')[1] || '',
          email: user.email || '',
          profileImage: user.photoURL
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    currentUser,
    signUp,
    signIn,
    signInWithGoogle, // Add to context value
    logOut,
    userInfo,
    linkForms,
    setLinkForms,
    profileInfo,
    setProfileInfo,
    savedLinks,
    setSavedLinks,
    saveLink,
    updateLinkForm,
    removeLinkForm,
    addNewLinkForm,
    saveAllLinks,
    loading // Add loading to context
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};