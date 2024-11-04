type Message = {
  content?: string;
  img?: string;
  createdAt: string;
};

type User = {
  id: number;
  userName: string;
  profilePhoto: string;
};

type ChatRoom = {
  chatRoomId: number;
  otherUser: User;
  lastMessage: Message | null;
  readed: boolean;
};
