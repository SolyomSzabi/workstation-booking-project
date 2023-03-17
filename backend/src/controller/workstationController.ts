import { Workstation } from 'db';
import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../middlewares';
import { IWorkstationService } from '../service';

export class WorkstationController {
  private readonly _router: Router = Router();

  constructor(
    private workstationService: IWorkstationService,
    private authMiddleware: AuthMiddleware
  ) {
    const securedByAdmin = [
      this.authMiddleware.authenticateJWT,
      this.authMiddleware.isUserAdmin,
    ];

    this._router.get('/workstations', async (req, res) => {
      const floorIDQuery = req.query.floorID;
      const date = req.query.date;
      if (floorIDQuery === undefined && date === undefined) {
        res.json(await this.workstationService.getWorkstations());
      } else {
        const floorID = Number.parseInt(floorIDQuery as string, 10);
        res.json(
          await this.workstationService.findWorkstationsOnAFloor(
            floorID,
            date as string
          )
        );
      }
    });

    this._router.post('/workstations', securedByAdmin, async (req: Request, res: Response) => {
      const workstation: Workstation = req.body as Workstation;
      res.json(await this.workstationService.createWorkstation(workstation));
    });

    this._router.put('/workstations', securedByAdmin, async (req: Request, res: Response) => {
      const workstation: Workstation = req.body as Workstation;
      const message = await this.workstationService.updateWorkstation(
        workstation
      );
      res.status(message.status === 'OK' ? 200 : 404).json(message.message);
    });

    this._router.delete('/workstations/:workstationID', async (req, res) => {
      const workstationID= Number(req.params.workstationID);
      const message = await this.workstationService.deleteWorkstation(
        workstationID
      );
      res.status(message.status === 'OK' ? 200 : 404).json(message.message);
    });
  }

  get router(): Router {
    return this._router;
  }
}
