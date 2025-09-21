import { Injectable } from '@nestjs/common';

@Injectable()
export class FonnteService {
  async sendMessage(to: string, message: string) {
    const response = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': process.env.FONTE_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: to,
        message,
      }),
    });
    return response.json();
  }
}