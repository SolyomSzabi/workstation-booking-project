import { Booking } from '../../db';
import { IBookingsRepository } from '../../repository';
import { bookingsSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

export interface IBookingsService {
  getBookings(): Promise<Booking[]>;
  createBooking(
    bookings: Booking
  ): Promise<{ status: string; message: string[] }>;
  updateBooking(
    bookings: Booking
  ): Promise<{ status: string; message: string[] }>;
  deleteBookingById(
    bookingID: number
  ): Promise<{ status: string; message: string[] }>;
  findAllBookingsForAUser(userID: number): Promise<Booking[]>;
}

export class BookingsService implements IBookingsService {
  constructor(private bookingsRepository: IBookingsRepository) {}

  async getBookings(): Promise<Booking[]> {
    return await this.bookingsRepository.findAllBookings();
  }

  async createBooking(
    bookings: Booking
  ): Promise<{ status: string; message: string[] }> {
    try {
      const value = await bookingsSchema.validateAsync(bookings);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const newBooking = await this.bookingsRepository.saveBooking(bookings);

    return {
      status: 'OK',
      message: [
        `Booking is succesfully saved with bookingID: ${newBooking.bookingID}`,
      ],
    };
  }

  async updateBooking(
    bookings: Booking
  ): Promise<{ status: string; message: string[] }> {
    const updatedBooking: boolean =
      (await this.bookingsRepository.updateBooking(bookings)) !== null;

    return {
      status: updatedBooking ? 'OK' : 'Error',
      message: updatedBooking
        ? [`Booking with ID ${bookings.bookingID} has been updated!`]
        : ['Something went wrong!'],
    };
  }

  async deleteBookingById(
    bookingID: number
  ): Promise<{ status: string; message: string[] }> {
    const deleteBooking: boolean =
      (await this.bookingsRepository.deleteBookingById(bookingID)) === !null;
    return {
      status: deleteBooking ? 'OK' : 'Error',
      message: deleteBooking
        ? [`Booking succesfully deleted with ID ${bookingID}!`]
        : [`Booking with ID ${bookingID} not found!`],
    };
  }

  async findAllBookingsForAUser(userID: number): Promise<Booking[]> {
    return this.bookingsRepository.findAllBookingsForAUser(userID);
  }
}
