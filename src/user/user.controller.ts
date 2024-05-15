import { Controller, Get, Res } from '@nestjs/common';

@Controller('user')
export class UsersController {
  /**
   * 테스트
   */

  @Get('test')
  async hello(@Res() res) {
    return res.status(200).json({ result: 'hi' });
  }
}
