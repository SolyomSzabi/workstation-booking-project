import { appDataSource } from '../db';
import { Booking } from '../db';

export interface IBookingsRepository {
  findAllBookings(): Promise<Booking[]>;
  saveBooking(bookings: Booking): Promise<Booking>;
  updateBooking(bookings: Booking): Promise<Booking | null>;
  deleteBookingById(bookingID: number): Promise<boolean>;
  findAllBookingsForAUser(userID: number): Promise<Booking[]>;
}

export class BookingsRepository implements IBookingsRepository {
  async findAllBookings(): Promise<Booking[]> {
    return appDataSource
      .getRepository(Booking)
      .find({
        relations: { workstation: { floor: { building: true } }, user: true },
      });
  }

  saveBooking(booking: Booking): Promise<Booking> {
    const bookingToSave = new Booking();
    bookingToSave.user = booking.user;
    bookingToSave.date = booking.date;
    bookingToSave.workstation = booking.workstation;

    return appDataSource.getRepository(Booking).save(bookingToSave);
  }

  findBooking(bookings: Booking): Promise<Booking | null> {
    return appDataSource
      .getRepository(Booking)
      .findOne({ where: { bookingID: bookings.bookingID } });
  }

  findBookingById(bookingID: number): Promise<Booking | null> {
    return appDataSource
      .getRepository(Booking)
      .findOne({ where: { bookingID: bookingID } });
  }

  async updateBooking(booking: Booking): Promise<Booking | null> {
    if ((await this.findBooking(booking)) === null) return null;
    appDataSource
      .createQueryBuilder()
      .update(Booking)
      .set({
        user: booking.user,
        date: booking.date,
        workstation: booking.workstation,
      })
      .where('bookingId=:id', { id: booking.bookingID })
      .execute();
    const updatedBooking = this.findBooking(booking);
    return updatedBooking;
  }

  async deleteBookingById(bookingID: number): Promise<boolean> {
    if ((await this.findBookingById(bookingID)) === null) return false;

    await appDataSource
      .createQueryBuilder()
      .delete()
      .from(Booking)
      .where('bookingID = :id', { id: bookingID })
      .execute();

    if ((await this.findBookingById(bookingID)) === null) {
      return true;
    } else {
      return false;
    }
  }

  findAllBookingsForAUser(userID: number): Promise<Booking[]> {
    return appDataSource
      .getRepository(Booking)
      .find({ where: { user: { userID: userID } } });
  }
}
