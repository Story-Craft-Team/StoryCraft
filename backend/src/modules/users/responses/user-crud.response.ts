import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class DeleteResponse {
  @ApiProperty({
    description: 'Status code',
    example: 200,
  })
  status: number;

  @ApiProperty({
    description: 'Message',
    example: 'User removed successfully',
  })
  message: string;
}

export class UpdateResponse {
  @ApiProperty({
    description: 'User information without password',
    example: {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@example.com',
      displayName: 'John Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
      createdAt: '2025-05-21T22:20:36.000Z',
      updatedAt: '2025-05-21T22:20:36.000Z',
      settings: {
        theme: 'dark',
        language: 'ru',
      },
    },
  })
  user: Omit<User, 'password'>;
}

export class FindOneResponse {
  @ApiProperty({
    description: 'User information without password',
    example: {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@example.com',
      displayName: 'John Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
      createdAt: '2025-05-21T22:20:36.000Z',
      updatedAt: '2025-05-21T22:20:36.000Z',
      settings: {
        theme: 'dark',
        language: 'ru',
      },
    },
  })
  user: Omit<User, 'password'>;
}

export class FindAllResponse {
  @ApiProperty({
    description: 'User information without password',
    example: [
      {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
        displayName: 'John Doe',
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: '2025-05-21T22:20:36.000Z',
        updatedAt: '2025-05-21T22:20:36.000Z',
        settings: {
          theme: 'dark',
          language: 'ru',
        },
      },
      {
        id: 2,
        username: 'john_doe',
        email: 'john.doe@example.com',
        displayName: 'John Doe',
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: '2025-05-21T22:20:36.000Z',
        updatedAt: '2025-05-21T22:20:36.000Z',
        settings: {
          theme: 'dark',
          language: 'ru',
        },
      },
    ],
  })
  users: Omit<User, 'password'>[];
}
