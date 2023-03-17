import { Booking } from 'db';
import { Router, Request, Response } from 'express';
import { IBookingsService } from '../service';
import { AuthMiddleware } from '../middlewares';

export class BookingsController {
  private readonly _router: Router = Router();

  constructor(
    private bookingsService: IBookingsService,
    private authMiddleware: AuthMiddleware
    ) {
    const securedByToken = [
      this.authMiddleware.authenticateJWT
    ];

    this._router.get('/bookings', async (req, res) => {
      const userIDQuery = req.query.userID;
      if (userIDQuery === undefined) {
        res.json(await this.bookingsService.getBookings());
      } else {
        const userID = Number.parseInt(userIDQuery as string, 10);
        res.json(await this.bookingsService.findAllBookingsForAUser(userID));
      }
    });

    this._router.post('/bookings', securedByToken, async (req: Request, res: Response) => {
      const booking: Booking = req.body as Booking;
      res.json(await this.bookingsService.createBooking(booking));
    });

    this._router.put('/bookings', securedByToken, async (req: Request, res: Response) => {
      const booking: Booking = req.body as Booking;
      const message = await this.bookingsService.updateBooking(booking);
      res.status(message.status === 'OK' ? 200 : 404).json(message.message);
    });

    this._router.delete('/bookings/:bookingID', securedByToken, async (req: Request, res: Response) => {
      const bookingID = Number(req.params.bookingID);
      const message = await this.bookingsService.deleteBookingById(bookingID);
      res.status(message.status === 'OK' ? 200 : 404).json(message.message);
    });
  }

  get router(): Router {
    return this._router;
  }
}
