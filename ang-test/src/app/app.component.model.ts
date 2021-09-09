export class UserModel {
  UserId: number = 0
  UserName: string = ''
  UserEmail: string = ''
  UserPhone: string = ''
}

export class MessageModel {
  Id: number = 0
  UserId: string = ''
  TopicId: string = ''
  MessageValue: string = ''
}

export class TopicsModel {
  topicId: number = 1
  topicName: string = ''
  topicValue: string = ''
}

export class formDataModel {
  name: string = ''
  email: string = ''
  phone: string = ''
  disc: string = ''
}
