import { Floor } from 'db';
import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../middlewares';
import { IFloorService } from '../service';

export class FloorController {
  private readonly _router: Router = Router();

  constructor(
    private floorService: IFloorService,
    private authMiddleware: AuthMiddleware
  ) {
    const securedByAdmin = [
      this.authMiddleware.authenticateJWT,
      this.authMiddleware.isUserAdmin,
    ];

    this._router.get('/floors', async (req, res) => {
      res.json(await this.floorService.getFloors());
    });

    this._router.post('/floors', async (req, res) => {
      const floor: Floor = req.body as Floor;
      res.json(await this.floorService.createFloor(floor));
    });
    this._router.put('/floors', async (req, res) => {
      const floor: Floor = req.body as Floor;
      const message = await this.floorService.updateFloor(floor);
      res.status(message.status === 'OK' ? 200 : 404).json(message.message);
    });

    this._router.delete(
      '/floors/:floorID', securedByAdmin,
      async (req: Request, res: Response) => {
        const floorID = Number(req.params.floorID);
        const message = await this.floorService.deleteFloorById(floorID);
        res.status(message.status === 'OK' ? 200 : 404).json(message.message);
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}
