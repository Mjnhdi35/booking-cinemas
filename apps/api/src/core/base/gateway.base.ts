import { Socket } from 'socket.io'

export class AppGateway {
  handleHanshake(socket: Socket): boolean | Promise<boolean> {
    return false
  }
}
