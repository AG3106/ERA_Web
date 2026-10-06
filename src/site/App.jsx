import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'motion/react';

import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ResearchPage from './pages/ResearchPage';
import TeamPage from './pages/TeamPage';
import LearningPage from './pages/LearningPage';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/research" element={<PageTransition><ResearchPage /></PageTransition>} />
        <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
        <Route path="/learning" element={<PageTransition><LearningPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><Home /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <SmoothScroll>
        <div className="grain relative min-h-screen overflow-x-clip">
          <ScrollProgress />
          <Navbar />
          <AnimatedRoutes />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  </MotionConfig>
);

export default App;
