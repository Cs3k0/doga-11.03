import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class AppService {
  private readonly bookingsFile = 'bookings.csv';

  getHello(): string {
    return 'Mozi foglalás';
  }

  async saveBooking(booking: any): Promise<void> {
    const csvLine = `${booking.name},${booking.email},${booking.date},${booking.viewers}\n`;
    
    try {
      await fs.appendFile(this.bookingsFile, csvLine, 'utf-8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        const headers = 'name,email,date,viewers\n';
        await fs.writeFile(this.bookingsFile, headers + csvLine, 'utf-8');
      } else {
        throw error;
      }
    }
  }
}
