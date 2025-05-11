import { ApiTags } from "@nestjs/swagger";

export class CreateChoiceDto {
  text: string;
  nextScene: number;
  access: boolean;
  storyId: number;
  sceneId: number;
}
