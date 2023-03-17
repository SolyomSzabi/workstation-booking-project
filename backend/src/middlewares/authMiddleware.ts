/* eslint-disable @typescript-eslint/no-namespace */
import { compareSync } from 'bcrypt';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import config from '../config';

import { NextFunction, Request, Response } from 'express';
import { IUsersService } from '../service';
import { User } from '../db';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user: User;
      id: number;
      admin: boolean;
    }
  }
}

interface JwtPayload {
  id: string;
}

export class AuthMiddleware {
  constructor(private userService: IUsersService) {}

  checkSignUp = async (req: Request, res: Response, next: NextFunction) => {
    if (!(req.body.email && req.body.password && req.body.userName)) {
      res.status(400).json({
        error: 'Something went wrong!',
      });
      return;
    }

    const emailCheck = await this.userService.isEmailRegistered(req.body.email);
    const userNameCheck = await this.userService.isUserNameRegistered(
      req.body.userName
    );

    if (emailCheck && userNameCheck) {
      res.json({
        status: 'Error',
        message: [
          `Username ${req.body.userName} and Email ${req.body.email} are already in use!`,
          `Please try again with different username and email!`,
        ],
      });
      return;
    } else if (userNameCheck) {
      res.json({
        status: 'Error',
        message: [`Username ${req.body.userName} is already in use!`],
      });
      return;
    } else if (emailCheck) {
      res.json({
        status: 'Error',
        message: [`Email ${req.body.email} is already in use!`],
      });
      return;
    }

    next();
  };

  checkUserAndPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (await this.userService.findUserByEmail(req.body.email))[0];

    if (user === undefined) {
      res.status(200).json({
        error: 'Provided credentials are not valid!',
      });
      return;
    }

    const isValidPassword = compareSync(req.body.password, user.password!);

    if (!isValidPassword) {
      res.status(200).json({
        error: 'Provided credentials are not valid!',
      });
      return;
    }

    req.user = user;
    next();
  };

  authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader === undefined) {
      res.status(401).json({
        error: 'Only accessible by registered users!',
      });
      return;
    }

    if (authHeader?.split(' ')[0] != 'Bearer') {
      res.status(401).json({
        error: 'Token is not valid',
      });
      return;
    }

    const token = authHeader?.split(' ')[1];

    try {
      const decoded = verify(token, config.jwt.secret!) as JwtPayload;
      req.id = Number.parseInt(decoded.id, 10);
    } catch (err) {
      res.status(401).json({
        error: 'Token is not valid',
      });
      return;
    }

    next();
  };

  isUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = (await this.userService.findUserById(req.id))[0];

    if (user === undefined) {
      res.status(401).json({
        error: 'Invalid user',
      });
      return;
    }

    if (!user.admin) {
      res.status(401).json({
        error: 'Only accessible by admin',
      });
      return;
    }

    req.admin = user.admin;

    next();
  };

  isUserActive = async (req: Request, res: Response, next: NextFunction) => {
    const user = (await this.userService.findUserById(req.id))[0];

    if (user === undefined) {
      res.status(401).json({
        error: 'Invalid user',
      });
      return;
    }

    if (!user.active) {
      res.status(401).json({
        error: 'The account is not active.',
      });
      return;
    }

    next();
  };
}
