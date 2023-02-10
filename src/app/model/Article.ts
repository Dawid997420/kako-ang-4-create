import { UserE } from "./UserE";
import { ParagraphDto} from "./ParagraphDto"
import { Comment } from "./Comment";

export class Article {

  constructor(public topic:string,public created:Date ) {}

  id? : string ;

  paragraphs! : ParagraphDto[]
 
  comments? : Comment[];
  userId! : string;
  categories! : string[]; 


}
