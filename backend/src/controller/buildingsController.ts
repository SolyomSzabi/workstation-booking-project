import { Building, Floor } from 'db';
import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../middlewares';
import { IBuildingsService } from '../service';

export class BuildingsController {
  private readonly _router: Router = Router();

  constructor(
    private buildingsService: IBuildingsService,
    private authMiddleware: AuthMiddleware
  ) {
    const securedByAdmin = [
      this.authMiddleware.authenticateJWT,
      this.authMiddleware.isUserAdmin,
    ];

    this._router.get('/buildings', async (req, res) => {
      res.json(await this.buildingsService.getBuildings());
    });

    this._router.post(
      '/buildings',
      securedByAdmin,
      async (req: Request, res: Response) => {
        const building: Building = req.body as Building;
        res.json(await this.buildingsService.createBuilding(building));
      }
    );

    this._router.put(
      '/buildings',
      securedByAdmin,
      async (req: Request, res: Response) => {
        const building: Building = req.body as Building;
        const message = await this.buildingsService.updateBuilding(building);
        res.status(message.status === 'OK' ? 200 : 404).json(message.message);
      }
    );

    this._router.delete(
      '/buildings/:buildingID',
      securedByAdmin,
      async (req: Request, res: Response) => {
        const buildingID = Number(req.params.buildingID);
        const message = await this.buildingsService.deleteBuildingById(
          buildingID
        );
        res.status(message.status === 'OK' ? 200 : 404).json(message.message);
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}
