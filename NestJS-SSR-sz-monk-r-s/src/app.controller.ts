import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getForm() {
    return {};
  }

  @Post('book')
  async bookTicket(@Body() booking: any, @Res() res: Response) {
    const errors: string[] = [];

    if (!booking.name) {
      errors.push('A név megadása kötelező');
    }
    if (!booking.email || !booking.email.match(/^.+@.+\..+$/)) {
      errors.push('Érvényes email cím megadása kötelező');
    }
    if (!booking.date || new Date(booking.date) < new Date()) {
      errors.push('Érvényes jövőbeli dátum megadása kötelező');
    }
    if (!booking.viewers || booking.viewers < 1 || booking.viewers > 10) {
      errors.push('A nézők számának 1 és 10 között kell lennie');
    }

    if (errors.length > 0) {
      return res.status(400).render('index', { errors, formData: booking });
    }

    await this.appService.saveBooking(booking);

    return res.redirect('/success');
  }

  @Get('success')
  @Render('success')
  getSuccess() {
    return {};
  }
}
