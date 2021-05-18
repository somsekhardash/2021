import * as express from "express";
import * as path from "path";
import {
  getTournaments,
  tournamentRegister,
  tournamentDelete,
  updateTournamentUser,
  createMatch,
  updateMatch,
  deleteMatch,
  voteMatch,
} from "../controllers/DataController";
import { userLogin, userLogout } from "../controllers/AuthController";
import {
  createUser,
  updateUser,
  getUsers,
  UserDelete,
} from "../controllers/UserController";

const { Router } = express;
const DIST_DIR = path.join(__dirname, "./");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const router = Router();

router.get("/", (_req, res) => {
  res.send("Hello");
});

router.get("/get-tournaments", getTournaments);
router.post("/tournament-register", tournamentRegister);
router.delete("/delete-tournament", tournamentDelete);
router.post("/update-tournament-user", updateTournamentUser);

router.post("/create-match", createMatch);
router.post("/update-match", updateMatch);
router.post("/vote-match", voteMatch);
router.delete("/delete-match", deleteMatch);

router.post("/create-user", createUser);
router.post("/update-user", updateUser);
router.get("/get-users", getUsers);
router.delete("/delete-user", UserDelete);

router.post("/login-user", userLogin);
router.post("/logout-user", userLogout);

export default router;
