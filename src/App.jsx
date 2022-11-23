import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Forum from "./pages/Forum";
import ForumAskQuestion from "./pages/ForumAskQuestion";
import ForumMyQuestions from "./pages/ForumMyQuestions";
import ForumQuestionDetail from "./pages/ForumQuestionDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Material from "./pages/Material";
import MaterialDetail from "./pages/MaterialDetail";
import PersonalConsultation from "./pages/PersonalConsultation";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import QuizInfo from "./pages/QuizInfo";
import QuizResult from "./pages/QuizResult";
import Register from "./pages/Register";
import Topic from "./pages/Topic";
import AdminRoute from "./routes/AdminRoute";
import PsikologDiscussion from "./pages/PsikologDiscussion";
import PsikologRoute from "./routes/PsikologRoute";
import PsikologQuestionDetail from "./pages/PsikologQuestionDetail";
import PsikologProfile from "./pages/PsikologProfile";
import PsikologPersonalChat from "./pages/PsikologPersonalChat";
import PsikologPersonalChatDetail from "./pages/PsikologPersonalChatDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Box minH="calc(100vh - 140px)">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/topic/:topicId/material" element={<Material />} />
          <Route path="/material/:materialId" element={<MaterialDetail />} />
          <Route
            path="/material/:materialId/quiz-info"
            element={<QuizInfo />}
          />
          <Route path="/material/:materialId/quiz" element={<Quiz />} />
          <Route path="/quiz-result/:attemptId" element={<QuizResult />} />
          <Route path="/forum" element={<Forum />} />
          <Route
            path="/forum/questions/:questionId"
            element={<ForumQuestionDetail />}
          />
          <Route path="/forum/ask" element={<ForumAskQuestion />} />
          <Route path="/forum/my-questions" element={<ForumMyQuestions />} />
          <Route
            path="/personal-consultation"
            element={<PersonalConsultation />}
          />
          <Route
            path="/personal-consultation/:roomId"
            element={<PersonalConsultation />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route element={<PsikologRoute />}>
            <Route
              path="/psikolog/discussion"
              element={<PsikologDiscussion />}
            />
            <Route
              path="/psikolog/discussion/:questionId"
              element={<PsikologQuestionDetail />}
            />
            <Route
              path="/psikolog/discussion/:questionId"
              element={<PsikologQuestionDetail />}
            />
            <Route
              path="/psikolog/personal-chat"
              element={<PsikologPersonalChat />}
            />
            <Route
              path="/psikolog/personal-chat/:roomId"
              element={<PsikologPersonalChatDetail />}
            />
            <Route
              path="/psikolog/profile"
              element={<PsikologProfile />}
            />
          </Route>
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
