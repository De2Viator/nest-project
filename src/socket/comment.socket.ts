import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AddCommentDto, DeleteCommentDto, EditCommentDto } from "../comment/dto/comment.dto";
import { UseGuards } from '@nestjs/common';
import { CommentGuard } from '../shared/guards/comment/comment.guard';
import { Server, Socket } from 'socket.io';
import { CommentService } from '../comment/services/comment.service';

@WebSocketGateway()
export class CommentGateway implements OnGatewayConnection {
  constructor(private readonly commentService: CommentService) {}
  @WebSocketServer() server: Server;

  @UseGuards(CommentGuard)
  @SubscribeMessage('addComment')
  async addComment(client: Socket, comment: AddCommentDto) {
    const response = await this.commentService.addComment(comment, 9);
    this.server.to(String(comment.newsId)).emit('addedComment', response);
  }

  @UseGuards(CommentGuard)
  @SubscribeMessage('deleteComment')
  async deleteComment(client: Socket, message: DeleteCommentDto) {
    await this.commentService.deleteComment(+message.id);
    client.emit('deletedComment', message);
  }

  //@UseGuards(CommentGuard)
  @SubscribeMessage('changeComment')
  async changeComment(client: Socket, comment: EditCommentDto) {
    console.log(comment);
    await this.commentService.updateComment(comment.id, comment);
    client.emit('changedComment', comment);
  }

  handleConnection(client: Socket) {
    const newsId = client.handshake.query.newsId;
    client.join(newsId);
  }
}
