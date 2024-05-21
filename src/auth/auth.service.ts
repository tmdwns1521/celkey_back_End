import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  async validateOAuthLogin(profile: any): Promise<any> {
    const user = await this.userService.findOrCreate(profile.user);
    console.log('user ::: ', user);

    const payload = { id: user.id, email: user.email };
    console.log('payload ::: ', payload);

    const accessToken = this.jwtService.sign(payload);
    console.log('accessToken ::: ', accessToken);

    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    console.log('refreshToken ::: ', refreshToken);

    await this.userService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      console.log('Decoded refresh token:', decoded);

      // Find the user by decoded token id
      const user = await this.userRepository.findById(decoded.id);
      console.log('user ::: ', user);

      // Verify that the stored refresh token matches the provided one
      if (user && user.refreshToken === refreshToken) {
        // Generate a new access token
        const payload = { id: user.id, email: user.email };
        return this.jwtService.sign(payload, { expiresIn: '1h' });
      } else {
        throw new Error('Invalid refresh token');
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw new Error('Could not refresh access token');
    }
  }

  async getRefreshToken(userId: any): Promise<string> {
    return this.userService.getRefreshToken(userId);
  }
}
