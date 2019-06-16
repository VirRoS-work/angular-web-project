export class StatisticVacancy {

  views: number;
  bookmarks: number;
  notifications: number;
  notificationsToday: number;

  constructor(views: number, bookmarks: number, notifications: number, notificationsToday: number) {
    this.views = views;
    this.bookmarks = bookmarks;
    this.notifications = notifications;
    this.notificationsToday = notificationsToday;
  }

}
