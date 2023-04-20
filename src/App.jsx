import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useRegisterSW } from "virtual:pwa-register/react";

import offlinePic from "./assets/offline.svg";

import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";

const Forum = lazy(() => import("./pages/Forum"));
const ForumAskQuestion = lazy(() => import("./pages/ForumAskQuestion"));
const ForumMyQuestions = lazy(() => import("./pages/ForumMyQuestions"));
const ForumQuestionDetail = lazy(() => import("./pages/ForumQuestionDetail"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Material = lazy(() => import("./pages/Material"));
const MaterialDetail = lazy(() => import("./pages/MaterialDetail"));
const PersonalConsultation = lazy(() => import("./pages/PersonalConsultation"));
const Profile = lazy(() => import("./pages/Profile"));
const Quiz = lazy(() => import("./pages/Quiz"));
const QuizInfo = lazy(() => import("./pages/QuizInfo"));
const QuizResult = lazy(() => import("./pages/QuizResult"));
const Register = lazy(() => import("./pages/Register"));
const Topic = lazy(() => import("./pages/Topic"));
const RoleBasedRoute = lazy(() => import("./routes/RoleBasedRoute"));
const PsikologDiscussion = lazy(() => import("./pages/PsikologDiscussion"));
const PsikologQuestionDetail = lazy(() =>
  import("./pages/PsikologQuestionDetail")
);
const PsikologProfile = lazy(() => import("./pages/PsikologProfile"));
const PsikologPersonalChat = lazy(() => import("./pages/PsikologPersonalChat"));
const PsikologPersonalChatDetail = lazy(() =>
  import("./pages/PsikologPersonalChatDetail")
);
const AdminMaterialManagement = lazy(() =>
  import("./pages/AdminMaterialManagement")
);
const AdminPsikologManagement = lazy(() =>
  import("./pages/AdminPsikologManagement")
);
const AdminPsikologForm = lazy(() => import("./pages/AdminPsikologForm"));
const AdminMaterialForm = lazy(() => import("./pages/AdminMaterialForm"));
const AuthRoute = lazy(() => import("./routes/AuthRoute"));
const PublicRoute = lazy(() => import("./routes/PublicRoute"));

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
        <Flex flexDir="column" flex="auto" id="main" pt={20}>
          {online ? (
            <Suspense fallback={<LoadingScreen />}>
              <Box>
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
                    <Route
                      path="/topic/:topicId/material"
                      element={<Material />}
                    />
                    <Route
                      path="/material/:materialId"
                      element={<MaterialDetail />}
                    />
                    <Route
                      path="/quiz/:quizId/quiz-info"
                      element={<QuizInfo />}
                    />
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
                    <Route
                      path="/psikolog/profile"
                      element={<PsikologProfile />}
                    />
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
              </Box>
            </Suspense>
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
        </Flex>
        <Footer />
      </Flex>
    </BrowserRouter>
  );
}

export default App;
