import { User } from 'db';
import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../middlewares';
import { IUsersService } from '../service';

export class UserController {
  private readonly _router: Router = Router();

  constructor(
    private userService: IUsersService,
    private authMiddleware: AuthMiddleware
  ) {
    const securedByAdmin = [
      this.authMiddleware.authenticateJWT,
      this.authMiddleware.isUserAdmin,
    ];

    this._router.get('/users', async (req, res) => {
      res.json(await this.userService.getUsers());
    });

    this._router.put('/users', securedByAdmin, async (req: Request, res: Response) => {
      const user: User = req.body as User;
      const message = await this.userService.updateUser(user);
      res.status(message.status === 'OK' ? 200 : 404).json(message.message);
    });

    this._router.delete('/users', securedByAdmin, async (req: Request, res: Response) => {
      const user: User = req.body as User;
      const message = await this.userService.deleteUser(user);
      res.status(message.status === 'OK' ? 200 : 404).json(message.message);
    });
  }

  get router(): Router {
    return this._router;
  }
}
