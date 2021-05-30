import { Like } from "./Like";

let likeButton = new Like(500);

likeButton.click();
console.log("Number of Likes ", likeButton.numberOfLikes);
console.log("Selected State ", likeButton.selected);

likeButton.click();
console.log("Number of Likes ", likeButton.numberOfLikes);
console.log("Selected State ", likeButton.selected);
