import { UserE } from "./UserE";
import { ParagraphDto} from "./ParagraphDto"

export class Article {

  id? : string ;
  topic! : string ;
  paragraphs! : ParagraphDto[]
  created! : Date ;
  comments? : Comment[];
  author! : UserE;
  categories! : string[]; 


}
