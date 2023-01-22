import { Box, Flex, Image, Text } from "@chakra-ui/react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import loadable from "@loadable/component";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Forum = loadable(() => import("./pages/Forum"));
const ForumAskQuestion = loadable(() => import("./pages/ForumAskQuestion"));
const ForumMyQuestions = loadable(() => import("./pages/ForumMyQuestions"));
const ForumQuestionDetail = loadable(() =>
  import("./pages/ForumQuestionDetail")
);
const Home = loadable(() => import("./pages/Home"));
const Login = loadable(() => import("./pages/Login"));
const Material = loadable(() => import("./pages/Material"));
const MaterialDetail = loadable(() => import("./pages/MaterialDetail"));
const PersonalConsultation = loadable(() =>
  import("./pages/PersonalConsultation")
);
const Profile = loadable(() => import("./pages/Profile"));
const Quiz = loadable(() => import("./pages/Quiz"));
const QuizInfo = loadable(() => import("./pages/QuizInfo"));
const QuizResult = loadable(() => import("./pages/QuizResult"));
const Register = loadable(() => import("./pages/Register"));
const Topic = loadable(() => import("./pages/Topic"));
const RoleBasedRoute = loadable(() => import("./routes/RoleBasedRoute"));
const PsikologDiscussion = loadable(() => import("./pages/PsikologDiscussion"));
const PsikologQuestionDetail = loadable(() =>
  import("./pages/PsikologQuestionDetail")
);
const PsikologProfile = loadable(() => import("./pages/PsikologProfile"));
const PsikologPersonalChat = loadable(() =>
  import("./pages/PsikologPersonalChat")
);
const PsikologPersonalChatDetail = loadable(() =>
  import("./pages/PsikologPersonalChatDetail")
);
const AdminMaterialManagement = loadable(() =>
  import("./pages/AdminMaterialManagement")
);
const AdminPsikologManagement = loadable(() =>
  import("./pages/AdminPsikologManagement")
);
const AdminPsikologForm = loadable(() => import("./pages/AdminPsikologForm"));
const AdminMaterialForm = loadable(() => import("./pages/AdminMaterialForm"));
const AuthRoute = loadable(() => import("./routes/AuthRoute"));
const PublicRoute = loadable(() => import("./routes/PublicRoute"));

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
