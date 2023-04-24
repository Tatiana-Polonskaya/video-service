import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DiaryPage from "./pages/DiaryPage";
import ImprovisationPage from "./pages/ImprovisationPage";
import LearningPage from "./pages/LearningPage";
import RepetitionPage from "./pages/RepetitionPage";
import SettingsPage from "./pages/SettingsPage";
import EntryPage from "./pages/EntryPage";

export default function App() {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/" element={<EntryPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/improvisation" element={<ImprovisationPage />} />
                <Route path="/learning" element={<LearningPage />} />
                <Route path="/repetition" element={<RepetitionPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </div>
    );
}
