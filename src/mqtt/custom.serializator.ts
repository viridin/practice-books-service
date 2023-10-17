import { Serializer, OutgoingResponse } from '@nestjs/microservices';

export class CustomSerializer implements Serializer {
    serialize(value: any): OutgoingResponse {
      return value.data;
    }
}