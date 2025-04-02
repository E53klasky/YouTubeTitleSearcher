// VideoStats class to store video information
export default class VideoStats {
    constructor(title, likes, comments, views) {
        this.title = title;
        this.likes = likes;
        this.comments = comments;
        this.views = views;
        this.dateOfPublication = 0;
    }
}
