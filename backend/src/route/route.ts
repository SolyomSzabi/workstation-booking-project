import { Router } from 'express';

import { BookingsController } from '../controller';
import { BookingsRepository } from '../repository';
import { BookingsService } from '../service';

import { FloorController } from '../controller';
import { FloorRepository } from '../repository';
import { FloorService } from '../service';

import { WorkstationController } from '../controller';
import { WorkstationRepository } from '../repository';
import { WorkstationService } from '../service';

import { BuildingsController } from '../controller';
import { BuildingsRepository } from '../repository';
import { BuildingsService } from '../service';

import { UserController } from '../controller';
import { UserRepository } from '../repository';
import { UserService } from '../service';
import { AuthenticationController } from '../controller';
import { AuthMiddleware } from '../middlewares';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authMiddleware = new AuthMiddleware(userService);
const userController = new UserController(userService, authMiddleware);

router.use('/api', userController.router);


const authenticationController = new AuthenticationController(
  userService,
  authMiddleware
);

router.use('/auth', authenticationController.router);

const bookingsRepository = new BookingsRepository();
const bookingsService = new BookingsService(bookingsRepository);
const bookingsController = new BookingsController(
  bookingsService,
  authMiddleware
);

router.use('/api', bookingsController.router);

const workstationRepository = new WorkstationRepository();
const workstationService = new WorkstationService(workstationRepository);
const workstationController = new WorkstationController(workstationService, authMiddleware);

router.use('/api', workstationController.router);

const floorRepository = new FloorRepository();
const floorService = new FloorService(floorRepository, workstationRepository);
const floorController = new FloorController(floorService, authMiddleware);

router.use('/api', floorController.router);

const buildingsRepository = new BuildingsRepository();
const buildingsService = new BuildingsService(buildingsRepository);
const buildingsController = new BuildingsController(
  buildingsService,
  authMiddleware
);

router.use('/api', buildingsController.router);

export { router };
