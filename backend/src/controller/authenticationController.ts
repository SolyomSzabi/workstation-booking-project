/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { sign } from 'jsonwebtoken';

import config from '../config';
import { User } from 'db';
import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../middlewares';
import { IUsersService } from '../service';

export class AuthenticationController {
  private readonly _router: Router = Router();

  constructor(
    private userService: IUsersService,
    private authMiddleware: AuthMiddleware
  ) {
    this._router.post(
      '/registration',
      this.authMiddleware.checkSignUp,
      async (req, res) => {
        const user: User = req.body as User;
        res.json(await this.userService.createUser(user));
      }
    );

    this._router.post(
      '/login',
      this.authMiddleware.checkUserAndPassword,
      async (req, res) => {
        const token = sign({ id: req.user.userID! }, config.jwt.secret!, {
          expiresIn: config.jwt.expiryTime,
        });

        res.json({
          auth_token: token,
          user: req.user,
        });
      }
    );

    const securedByAdmin = [
      this.authMiddleware.authenticateJWT,
      this.authMiddleware.isUserAdmin,
    ];

    this._router.get(
      '/admin-view',
      securedByAdmin,
      async (req: Request, res: Response) => {
        res.json({ message: 'OK', isAdmin: req.admin });
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}
