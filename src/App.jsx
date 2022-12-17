import { Box, Flex, Image, Text } from "@chakra-ui/react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
import RoleBasedRoute from "./routes/RoleBasedRoute";
import PsikologDiscussion from "./pages/PsikologDiscussion";
import PsikologQuestionDetail from "./pages/PsikologQuestionDetail";
import PsikologProfile from "./pages/PsikologProfile";
import PsikologPersonalChat from "./pages/PsikologPersonalChat";
import PsikologPersonalChatDetail from "./pages/PsikologPersonalChatDetail";
import AdminMaterialManagement from "./pages/AdminMaterialManagement";
import AdminPsikologManagement from "./pages/AdminPsikologManagement";
import AdminPsikologForm from "./pages/AdminPsikologForm";
import AdminMaterialForm from "./pages/AdminMaterialForm";
import AuthRoute from "./routes/AuthRoute";
import PublicRoute from "./routes/PublicRoute";
import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import offlinePic from "./assets/offline.svg";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
    onOfflineReady() {
      console.log("offline ready");
    },
  });

  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const handleConnectionChange = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Flex flexDirection="column" minH="100vh">
        <Navbar />
        <Box
          display={online ? "block" : "flex"}
          flexDir="column"
          flex="auto"
          id="main"
          pt={20}
        >
          {online ? (
            <Routes>
              <Route
                path="/admin"
                element={<Navigate to="/admin/material-management" />}
              />
              <Route
                path="/psikolog"
                element={<Navigate to="/psikolog/discussion" />}
              />
              <Route element={<AuthRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<PublicRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route element={<RoleBasedRoute role="user" />}>
                <Route path="/topic" element={<Topic />} />
                <Route path="/topic/:topicId/material" element={<Material />} />
                <Route
                  path="/material/:materialId"
                  element={<MaterialDetail />}
                />
                <Route path="/quiz/:quizId/quiz-info" element={<QuizInfo />} />
                <Route path="/quiz/:quizId/do" element={<Quiz />} />
                <Route
                  path="/quiz/:attemptId/result"
                  element={<QuizResult />}
                />
                <Route path="/forum" element={<Forum />} />
                <Route
                  path="/forum/questions/:questionId"
                  element={<ForumQuestionDetail />}
                />
                <Route path="/forum/ask" element={<ForumAskQuestion />} />
                <Route
                  path="/forum/my-questions"
                  element={<ForumMyQuestions />}
                />
                <Route
                  path="/personal-consultation"
                  element={<PersonalConsultation />}
                />
                <Route
                  path="/personal-consultation/:roomId"
                  element={<PersonalConsultation />}
                />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route element={<RoleBasedRoute role="psikolog" />}>
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
                <Route path="/psikolog/profile" element={<PsikologProfile />} />
              </Route>
              <Route element={<RoleBasedRoute role="admin" />}>
                <Route
                  path="/admin/material-management"
                  element={<AdminMaterialManagement />}
                />
                <Route
                  path="/admin/material-management/add"
                  element={<AdminMaterialForm />}
                />
                <Route
                  path="/admin/material-management/:materialId/edit"
                  element={<AdminMaterialForm />}
                />
                <Route
                  path="/admin/psikolog-management"
                  element={<AdminPsikologManagement />}
                />
                <Route
                  path="/admin/psikolog-management/new-psikolog"
                  element={<AdminPsikologForm />}
                />
              </Route>
            </Routes>
          ) : (
            <Box py={20} mx="auto">
              <Image src={offlinePic} alt="offline" w={80} h={80} />
              <Text
                color="blue.400"
                textAlign="center"
                fontWeight="semibold"
                fontSize="xl"
              >
                Koneksi kamu terputus
              </Text>
            </Box>
          )}
        </Box>
        <Footer />
      </Flex>
    </BrowserRouter>
  );
}

export default App;
