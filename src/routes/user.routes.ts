import { Router, type NextFunction, type Request, type Response } from "express";

// Typeorm
import { User } from "../models/typeorm/User";
import { AppDataSource } from "../databases/typeorm-datasource";
import { type Repository } from "typeorm";
// import { Team } from "../models/typeorm/Team";

const userRepository: Repository<User> = AppDataSource.getRepository(User);
// const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);

// Router
export const userRouter = Router();

// CRUD: READ
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: User[] = await userRepository.find({ relations: ["team"] });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idReceivedInParams = parseInt(req.params.id);

    const user = await userRepository.findOne({
      where: {
        id: idReceivedInParams,
      },
      relations: ["team"],
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// CRUD: CREATE
userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Construimos user
    const newUser = new User();

    let teamOfUser;

    if (req.body.teamId) {
      teamOfUser = await teamRepository.findOne({
        where: {
          id: req.body.teamId,
        },
      });

      if (!teamOfUser) {
        res.status(404).json({ error: "Team not found" });
        return;
      }
    }

    // Asignamos valores
    Object.assign(newUser, {
      ...req.body,
      team: teamOfUser,
    });

    const userSaved = await userRepository.save(newUser;

    res.status(201).json(userSaved);
  } catch (error) {
    next(error);
  }
});

// CRUD: DELETE
userRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idReceivedInParams = parseInt(req.params.id);

    const userToRemove = await userRepository.findOneBy({
      id: idReceivedInParams,
    });

    if (!userToRemove) {
      res.status(404).json({ error: "user not found" });
    } else {
      await userRepository.remove(userToRemove);
      res.json(userToRemove);
    }
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idReceivedInParams = parseInt(req.params.id);

    const userToUpdate = await userRepository.findOneBy({
      id: idReceivedInParams,
    });

    if (!userToUpdate) {
      res.status(404).json({ error: "user not found" });
    } else {
      let teamOfPlayer;

      if (req.body.teamId) {
        teamOfPlayer = await teamRepository.findOne({
          where: {
            id: req.body.teamId,
          },
        });

        if (!teamOfPlayer) {
          res.status(404).json({ error: "Team not found" });
          return;
        }
      }

      // Asignamos valores
      Object.assign(userToUpdate, {
        ...req.body,
        team: teamOfPlayer,
      });

      const updatedPlayer = await userRepository.save(userToUpdate);
      res.json(updatedPlayer);
    }
  } catch (error) {
    next(error);
  }
});
